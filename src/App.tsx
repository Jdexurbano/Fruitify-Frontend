import { Route, Routes } from "react-router";
import MainLayout from "./shared/layouts/MainLayout";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import MainPage from "./pages/Main/MainPage";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<MainPage />} />
      </Route>

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
