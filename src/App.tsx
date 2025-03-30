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
    NotFoundPage,
    AuthPage,
} from "./pages";
import PostDetailPage from "./pages/Posts/PostDetailPage";
import EditPostPage from "./pages/Posts/EditPostPage";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<AuthPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/message" element={<MessagesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/posts/:id/edit" element={<EditPostPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
