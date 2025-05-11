import { Spin } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

// Doing lazy loading here
const HomePage = React.lazy(async () => ({
  default: (await import("../pages/homePage")).HomePage,
}));

const AboutPage = React.lazy(async () => ({
  default: (await import("../pages/aboutPage")).AboutPage,
}));

const AdminDashboardPage = React.lazy(async () => ({
  default: (await import("../pages/adminDashboard")).AdminDashboardPage,
}));

export const AppRoutesPaths = {
  home: "/",
  about: "/about",
  adminDashboard: "/admin_dashboard",
};

const CenteredSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <Spin size="large" />
  </div>
);

export function AppRoute() {
  return (
    <React.Suspense fallback={<CenteredSpinner />}>
      <Routes>
        <Route path={AppRoutesPaths.home} element={<HomePage />} />
        <Route path={AppRoutesPaths.about} element={<AboutPage />} />
        <Route path={AppRoutesPaths.adminDashboard} element={<AdminDashboardPage />} />
      </Routes>
    </React.Suspense>
  );
}
