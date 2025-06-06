import { Route, Routes } from "react-router";
import MainLayout from "./shared/layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import MainPage from "./pages/Main/MainPage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<MainPage />} />
          </Route>
        </Route>
        {/* public routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
