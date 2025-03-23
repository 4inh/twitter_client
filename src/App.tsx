import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Signin from "./pages/SigninPage";
import ExplorePage from "./pages/ExplorePage";
import Notifications from "./pages/Notifications";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./ProfilePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mặc định vào trang Login */}
        <Route index element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/message" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>


        {/* <Route
          path="about"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />  */}


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
