export const toUTCFromLocal = (dateStr) => {
    const localDate = new Date(dateStr);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
}

export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export const genFileName = (date = new Date()) => {
    const year = date.getFullYear().toString().slice(-2); // Lấy 2 chữ số cuối của năm
    const month = date.getMonth() + 1; // getMonth() trả về 0-11, cộng 1 để được 1-12
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // Định dạng thành 2 chữ số
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');

    // Ghép chuỗi
    return `${year}${formattedMonth}${formattedHour}${formattedMinute}${formattedSecond}`;
};