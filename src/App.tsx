import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {
    HomePage,
    ExplorePage,
    Notifications,
    ProfilePage,
    NotFoundPage,
    AuthPage,
} from "./pages";
import PostDetailPage from "./pages/Posts/PostDetailPage";
import EditPostPage from "./pages/Posts/EditPostPage";

import { AuthProvider } from "./context/auth/AuthProvider";
import { ChatProvider } from "./context/chat/ChatProvider";
import ChatPage from "./pages/ChatPage";
import SocketTest from "./pages/SocketTest";

import Tos from "./components/policy/tos";
import Privacy from "./components/policy/Privacy";
import Cookie from "./components/policy/Cookie";


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<AuthPage />} />

                    <Route path="/terms-of-service" element={<Tos />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<Cookie />} />

                    <Route path="/" element={<MainLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        />
                        <Route
                            path="/message"
                            element={
                                <ChatProvider>
                                    <ChatPage />
                                </ChatProvider>
                            }
                        />

                        <Route path="/profile" element={<ProfilePage />} />
                        <Route
                            path="/profile/:username"
                            element={<ProfilePage />}
                        />
                        <Route path="/posts/:id" element={<PostDetailPage />} />
                        <Route
                            path="/posts/:id/edit"
                            element={<EditPostPage />}
                        />
                    </Route>
                    <Route path="/test" element={<SocketTest />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>


    );
}
