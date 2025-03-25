import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from "./pages/forgot-password";
import LaptopPage from "./pages/laptop";
import { siteConfig } from "./config/site";
import PhonePage from "./pages/phone";
import AccessoriesPage from "./pages/accessories";
import CartPage from "./pages/cart";
import ProfilePage from "./pages/profile";
import HistoryPage from "./pages/history";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path={siteConfig.route.home} />
      <Route element={<LoginPage />} path={siteConfig.route.login} />
      <Route element={<RegisterPage />} path={siteConfig.route.register} />
      <Route
        element={<ForgotPasswordPage />}
        path={siteConfig.route.forgotPassword}
      />
      <Route element={<PhonePage />} path={siteConfig.route.phone} />
      <Route element={<LaptopPage />} path={siteConfig.route.laptop} />
      <Route
        element={<AccessoriesPage />}
        path={siteConfig.route.accessories}
      />
      <Route element={<CartPage />} path={siteConfig.route.cart} />
      <Route element={<ProfilePage />} path={siteConfig.route.profile} />
      <Route element={<HistoryPage />} path={siteConfig.route.history} />
    </Routes>
  );
}

export default App;
