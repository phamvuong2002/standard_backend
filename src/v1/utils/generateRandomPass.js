const generateRandomPassword = (length = 12) => {
  // Các ký tự có thể sử dụng trong mật khẩu
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";

  for (let i = 0; i < length; i++) {
    // Lấy ngẫu nhiên một ký tự từ chuỗi characters
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

module.exports = {
  generateRandomPassword,
};
