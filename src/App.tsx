import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {
    HomePage,
    ExplorePage,
    LoginPage,
    MessagesPage,
    Notifications,
    ProfilePage,
    RegisterPage,
} from "./pages";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<div>Auth page</div>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/message" element={<MessagesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
