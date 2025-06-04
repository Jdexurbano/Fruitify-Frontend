import { Route, Routes } from "react-router";
import MainLayout from "./shared/layouts/MainLayout";
import LoginPage from "./pages/Auth/LoginPage";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}></Route>

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
