import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Signin from "./pages/SigninPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Sửa lại import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mặc định vào trang Login */}
        <Route index element={<Login />} />

        {/* Route Trang chủ */}
        <Route path="/home" element={<HomePage />} />

        {/* Route với Layout */}
        <Route
          path="about"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* Các route auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
