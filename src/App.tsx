import { Route, Routes } from "react-router";
import MainLayout from "./shared/layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import MainPage from "./pages/Main/MainPage";
import BuyProductPage from "./pages/Main/BuyProductPage";
import OrdersPage from "./pages/Main/OrdersPage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<MainPage />} />
            <Route index path="/buy/:id" element={<BuyProductPage />} />
            <Route index path="/orders/" element={<OrdersPage />} />
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
