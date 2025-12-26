// src/utils/initScaleSocket.js
// Chỉ làm đúng nhiệm vụ: quản lý 1 WebSocket chính và BroadcastChannel để gửi weight cho các tab khác.
// Không thay đổi logic xử lý ở các component khác.
export default function initScaleSocket(setWeight, setStatus) {
    if (typeof window === 'undefined') return () => { }; // SSR safety

    const CHANNEL_NAME = 'scale_channel_v1'; // đổi tên nếu cần để tránh xung đột
    const LOCK_KEY = 'scale_main_v1';         // key lock trong localStorage
    const WS_URL = 'ws://localhost:8080';
    const channel = new BroadcastChannel(CHANNEL_NAME);
    let ws = null;
    let isMainTab = false;
    let beforeUnloadHandler = null;
    let storageHandler = null;

    // Hỗ trợ set trạng thái an toàn
    const safeSetWeight = (w) => {
        try { setWeight(w); } catch (e) { console.error(e); }
    };
    const safeSetStatus = (s) => {
        try { setStatus(s); } catch (e) { console.error(e); }
    };

    // Kiểm tra và cố gắng trở thành tab chính
    const tryBecomeMain = () => {
        const existing = localStorage.getItem(LOCK_KEY);
        if (!existing) {
            localStorage.setItem(LOCK_KEY, Date.now().toString());
            isMainTab = true;

            // Khi đóng tab chính thì giải phóng khóa
            beforeUnloadHandler = () => {
                try { localStorage.removeItem(LOCK_KEY); } catch (e) { }
            };
            window.addEventListener('beforeunload', beforeUnloadHandler);
        } else {
            isMainTab = false;
        }
    };

    // Nếu tab chính, mở WebSocket; nếu tab phụ, lắng nghe BroadcastChannel
    tryBecomeMain();

    if (isMainTab) {
        safeSetStatus('Đã kết nối (tab chính)');
        try {
            ws = new WebSocket(WS_URL);

            ws.onopen = () => {
                safeSetStatus('Đã kết nối');
                // không bật Notification ở đây để tránh đổi logic
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.weight !== undefined) {
                        const weightText = data.unit ? `${data.weight} ${data.unit}` : data.weight;
                        // Cập nhật UI tab chính
                        safeSetWeight(weightText);
                        // Broadcast cho các tab khác
                        channel.postMessage({ weight: weightText });
                    } else if (data.error) {
                        // Nếu có error field, có thể muốn hiển thị (component hiện xử lý Notification)
                        channel.postMessage({ error: data.error });
                    }
                } catch (err) {
                    console.error('Lỗi parse WS message:', err);
                }
            };

            ws.onclose = () => {
                safeSetStatus('Ngắt kết nối');
            };

            ws.onerror = (err) => {
                console.error('WS error:', err);
                safeSetStatus('Lỗi');
            };
        } catch (err) {
            console.error('Không thể mở WebSocket:', err);
            safeSetStatus('Lỗi');
        }

        // Nếu khóa bị xoá (tab chính đóng), các tab khác có thể reload để trở thành main
        storageHandler = (e) => {
            if (e.key === LOCK_KEY && e.newValue === null) {
                // Một tab khác vừa giải phóng khóa -> tự reload để tranh quyền (tùy chọn)
                // Không tự reload nếu bạn không muốn; ở đây chỉ đưa comment.
                // window.location.reload();
            }
        };
        window.addEventListener('storage', storageHandler);
    } else {
        safeSetStatus('Nhận từ tab chính');
        channel.onmessage = (event) => {
            try {
                if (event.data?.weight !== undefined) {
                    safeSetWeight(event.data.weight);
                } else if (event.data?.error) {
                    // Không tự show Notification ở đây để không đổi logic
                    console.error('Lỗi từ server (tab phụ):', event.data.error);
                }
            } catch (err) {
                console.error('Lỗi BroadcastChannel message:', err);
            }
        };
    }

    // Trả về hàm cleanup để component gọi khi unmount
    return () => {
        try {
            channel.close();
        } catch (e) { }
        if (ws) {
            try { ws.close(); } catch (e) { }
            ws = null;
        }
        if (beforeUnloadHandler) {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            try { localStorage.removeItem(LOCK_KEY); } catch (e) { }
        }
        if (storageHandler) {
            window.removeEventListener('storage', storageHandler);
        }
    };
}
