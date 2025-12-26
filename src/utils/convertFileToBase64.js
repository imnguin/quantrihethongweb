export const convertFileToBase64 = async (files) => {
    let result = [];
    if (files && files.length > 0) {
        const promises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve({
                        name: file.name,
                        base64: e.target.result,
                    });
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        });

        result = await Promise.all(promises);
    }

    return result.map((item) => item);
};