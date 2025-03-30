// Tên đăng nhập: ít nhất 6 ký tự, chỉ chữ cái và số
export const regexUsername = /^[a-zA-Z0-9]{6,}$/;

// Mật khẩu: ít nhất 6 ký tự, ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt
export const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

// Email
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Số điện thoại Việt Nam (bắt đầu bằng 0, 10–11 số)
export const regexPhone = /^0[0-9]{9,10}$/;
