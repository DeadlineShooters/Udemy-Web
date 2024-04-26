import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoutes = () => {
	const userData = secureLocalStorage.getItem("user");
	return userData ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;