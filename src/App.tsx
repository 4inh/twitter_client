import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Sửa lại import

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<div>Auth page</div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/home"
                    element={
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
