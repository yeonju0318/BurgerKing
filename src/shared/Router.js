import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import DetaliBurger from "../pages/DetaliBurger";
import Store from "../pages/Store";
import Redirection from "../pages/Redirection";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/header" element={<Header />} />
        <Route path="/api/menus/:id" element={<DetaliBurger />} />
        <Route path="/store" element={<Store />} />
        <Route path="/api/kakao" element={<Redirection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
