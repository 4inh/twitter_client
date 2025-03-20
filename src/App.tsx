import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<MainLayout>
          <HomePage />
        </MainLayout>} />
      </Routes>
    </BrowserRouter>

  );
}
