import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Signin from "./pages/SigninPage";
import ExplorePage from "./pages/ExplorePage";
import Notifications from "./pages/Notifications";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<div>Auth page</div>} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<RegisterPage />} /> */}

                <Route path="/" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/message" element={<MessagesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>
    );
}
