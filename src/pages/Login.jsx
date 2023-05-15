import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar message="로그인" />
      <div className="border-red-200">
        <div>
          <div className="container mx-auto py-8">
            <div>
              <p className="text-red-600 font-bold text-3xl">YOUR WAY</p>
              <p className="font-bold text-3xl">어서오세요! 버거킹입니다.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center py-8">
          <div>
            <p className="mt-4 text-2xl font-bold">일반 로그인</p>
            <div className="flex flex-col items-center mt-6">
              <Logininput
                type="email"
                // value={Email}
                // onChange={onEmailHandler}
                placeholder="아이디(이메일)"
                className="w-96 px-4 py-2 border-2 border-gray-400 rounded-lg mb-4"
              />
              <Logininput
                type="password"
                // value={Password}
                // onChange={onPasswordHandler}
                placeholder="비밀번호"
                className="w-96 px-4 py-2 border-2 border-gray-400 rounded-lg mb-4"
              />
              <div className="flex w-96 gap-2 ">
                <ButtonLogin>로그인</ButtonLogin>
                <ButtonSignup
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  회원가입
                </ButtonSignup>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-10 text-2xl font-bold">간편 로그인</p>
            <div className="flex flex-col items-center mt-6">
              <div className="flex items-center justify-between w-96 px-4 py-2 border-2 border-gray-400 rounded-lg mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="data:image/gif;base64,R0lGODlhHgAeANUAAGDYSzPNGC7MEmTZT1TVPbXtq/7//lnWQ63roiHJA/v++ozjfeX54anqnun65k3TNc3zxr/vt/T887ftrV7YSSvLD9332KHolDDMFC/ME+r65zXOGifKCjjOHj7QJPD77m3bWkbSLXjeZlPVPP///x7IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTEzRjE5OTJEOTgxMUU5OTJCREI1RUZCODU3NkNDQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTEzRjE5QTJEOTgxMUU5OTJCREI1RUZCODU3NkNDQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxMTNGMTk3MkQ5ODExRTk5MkJEQjVFRkI4NTc2Q0NDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxMTNGMTk4MkQ5ODExRTk5MkJEQjVFRkI4NTc2Q0NDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAB4AHgAABrLAknBILBqPyKRyyWw6n0OBaEoVDYyBKjVgDJG+YJLhUByFwaPuGcyoEM3rdNG7/jbedTmRXiddhXBnekN8dRoYgHlqfV8FiXGLjCQgJYFhg0KFfR8blmiRkhEEinOSYQike3UFpp+lawATrSSYJZpfABkOrbW3JAAlFAamvXXAJRfEoGDHHBaSxbBDDwqM0WfHQgvWy7hECRB912HZQh4SqVFaUx1GBOsiXFDz9PX290tBADs="
                    alt="naver"
                  />
                  <span>네이버 로그인</span>
                </div>
                <button className="bg-gray-300 text-gray-700 font-bold rounded-lg">
                  로그인
                </button>
              </div>
              <div className="flex items-center justify-between w-96 px-4 py-2 border-2 border-gray-400 rounded-lg mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="data:image/gif;base64,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"
                    alt="kakao"
                  />
                  <span>카카오톡 로그인</span>
                </div>
                <button className="bg-gray-300 text-gray-700 font-bold rounded-lg">
                  로그인
                </button>
              </div>
              <div className="flex items-center justify-between w-96 px-4 py-2 border-2 border-gray-400 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src="data:image/gif;base64,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"
                    alt="apple"
                  />
                  <span>애플 로그인</span>
                </div>
                <button className="bg-gray-300 text-gray-700 font-bold rounded-lg">
                  로그인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

export const Logininput = styled.input`
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAAAGCAYAAADOmuQCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjkxNkYwQUUwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjkxNkYwQUYwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTE2RjBBQzAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTE2RjBBRDAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp+EA9sAAAsISURBVHja7JoLcFTl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");
  border: none;
  background-repeat: repeat-x;
  background-position: 0 100%;
  width: 100%;
`;

const ButtonLogin = styled.div`
  background: #d72300;
  border: 1px solid #d72300;
  width: 300px;
  height: 68px;
  font-weight: bold;
  font-size: large;
  color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  border-radius: 10px;
`;

const ButtonSignup = styled.div`
  background: #512314;
  border: 1px solid #512314;
  width: 300px;
  height: 68px;
  font-weight: bold;
  font-size: large;
  color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  border-radius: 10px;
`;
