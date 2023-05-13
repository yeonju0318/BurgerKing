import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      alt="Logo"
      className="cursor-pointer"
      src="https://www.burgerking.co.kr/dist/img/logo_delivery.26d1d682.png"
    />
  );
}

export default Logo;
