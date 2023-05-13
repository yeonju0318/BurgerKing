import React from "react";
import Logo from "./Logo";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <div class="bg-red-600 text-white py-14">
        <div class="container mx-auto flex justify-between items-center">
          <div class="mx-3 flex items-center justify-center">
            <Logo />
            <h2 class="text-3xl font-bold mx-4">버거킹</h2>
          </div>
          <JoinButton
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </JoinButton>
        </div>
      </div>
      <nav class="bg-gray-900">
        <div class="container mx-auto px-4 py-2">
          <div class="flex justify-between items-center">
            <div class="flex text-white font-bold text-lg">
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </button>
              <p className="mx-2">▶ {props.message}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

const JoinButton = styled.div`
  background-color: #512314;
  width: 168px;
  height: 50px;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;
