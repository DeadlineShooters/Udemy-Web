import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const userData = localStorage.getItem("user");
	return userData ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;