import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup.string().required("Tên người dùng là bắt buộc"),
  email: yup.string().email("Định dạng email không hợp lệ").required("Email là bắt buộc"),
  password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
});
