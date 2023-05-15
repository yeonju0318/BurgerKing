
import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom/dist";
import { useState, useEffect } from 'react';
import axios from 'axios';
import instance from "../axios/api";
function Header() {

  const nav = useNavigate()
  //들어갈 카테고리, 메뉴이름, URL
  const [addList, setAddList] = useState({
    category: "",
    menuname: "",
    image: "https://d1cua0vf0mkpiy.cloudfront.net/images/menu/normal/e626ab96-102e-4a1d-9770-cb3a7116877a.png"
  })
  //들어갈 카테고리, 메뉴이름, URL 핸들러
  const addListHandler = (e) => {
    const { name, value } = e.target
    setAddList({ ...addList, [name]: value })
  }
  //메뉴 등록창 모달 
  const [addModalOpen, setAddModalOpen] = useState(false);
  //메뉴 등록창 모달 온오프
  const showAddModal = () => {
    setAddModalOpen(!addModalOpen)
  }

  //카테고리 드롭다운
  const [categoryOpen, setCategoryOpen] = useState(false);
  //카테고리 드롭다운 온오프
  const [selectedItem, setSelectedItem] = useState("카테고리");

  //드롭다운 카테고리 클릭시 카테고리 변경
  const itemClickHandler = (item) => {
    setAddList({
      category: item
    });
    setCategoryOpen(false);
  };
  //버거 등록 핸들러
  const addHandler = async () => {
    await instance.post("/burgers", addList)
    // fetchTodos()
    alert("버거등록!")
    setAddList({
      category: "",
      menuname: "",
      image: ""
    })
    setAddModalOpen(!addModalOpen)
  }
  // console.log(addList)

  return (
    <StLayout>
      <StHeaders>
        <StHeader>
          <div onClick={() => nav("/")} style={{ display: "flex", alignSelf: "center" }}>
            <StImg src="https://blog.kakaocdn.net/dn/K9xlJ/btq6gLcC7Tz/KKEl6uQEKpD6sB5uCiTzPK/img.jpg" />
          </div>
          <h2>메뉴 소개</h2>
        </StHeader>
        <StHeader>
          <h2 onClick={showAddModal}>메뉴 등록</h2>
          <h2 onClick={() => nav("/login")}>로그인</h2>
        </StHeader>
      </StHeaders>

      {/* 추가 모달창 */}
      {addModalOpen && (
        <ModalOverlay onClick={showAddModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p style={{ marginBottom: "10px" }}></p>
            <ModalButton>
              <button onClick={showAddModal}
              >취소
              </button>
              <button
                onClick={() => {
                  addHandler();
                }}
              >
                등록
              </button>
            </ModalButton>
            <StAddForm>
              <div>
                <StAddImg>이미지</StAddImg>
              </div>

              {/* 카테고리 드롭다운 */}
              <StAddInputForms>
                <StAddInputForm>
                  <div>
                    <button
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >{selectedItem}
                    </button>
                    {categoryOpen && (
                      <DropdownList>
                        <Stbutton123
                          onClick={() => itemClickHandler("스페셜&할인팩")}
                        >스페셜&할인팩
                        </Stbutton123>
                        <Stbutton123
                          onClick={() => itemClickHandler("신제품(NEW)")}
                        > 신제품(NEW)
                        </Stbutton123>
                        <Stbutton123 onClick={() => itemClickHandler("프리미엄")}>
                          프리미엄
                        </Stbutton123>
                        <Stbutton123
                          onClick={() => itemClickHandler("와퍼&주니어")}
                        >와퍼&주니어
                        </Stbutton123>
                        <Stbutton123 onClick={() => itemClickHandler("치킨&슈림프버거")}>
                          치킨&슈림프버거
                        </Stbutton123>
                        <Stbutton123 onClick={() => itemClickHandler("올데이킹&킹모닝")}>
                          올데이킹&킹모닝
                        </Stbutton123>
                        <Stbutton123 onClick={() => itemClickHandler("사이드")}>
                          사이드
                        </Stbutton123>
                        <Stbutton123 onClick={() => itemClickHandler("음료&디저트")}>
                          음료&디저트
                        </Stbutton123>
                      </DropdownList>
                    )}
                  </div>
                  <StInput
                    name='category'
                    value={addList.category}
                    onChange={addListHandler}
                  /></StAddInputForm>
                <StAddInputForm>
                  메뉴이름: <StInput
                    name='menuname'
                    value={addList.menuname}
                    onChange={addListHandler}
                  /></StAddInputForm>
              </StAddInputForms>
            </StAddForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </StLayout>
  )
}

export default Header

const StLayout = styled.div`
margin: 0px auto;
`
const StHeaders = styled.div`
display: flex;
padding: 10px;
gap: 10px;
justify-content: space-between;
height: 100px;
max-width: 1200px;
margin: 0px auto;
`
const StHeader = styled.div`
display: flex;
padding: 10px;
gap: 20px;
cursor: pointer;
`
const StImg = styled.img`
  display: flex;
  width: 90px;
`

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  //수직센터
  /* align-items: center; */
  //가로센터
  justify-content: center;
  z-index: 100;
`;
//모달창
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 700px;
  height: 500px;
  margin: 100px;
`;
export const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  /* flex-direction: row-reverse;  */
  gap: 12px;
  /* padding: 20px; */
`;
export const StAddImg = styled.div`
  width: 400px;
  height: 400px;
  border: 2px solid pink;
`
export const StAddForm = styled.div`
  display: flex;
  gap: 20px;
`
export const StAddInputForms = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  padding-top: 10px;
`
export const StAddInputForm = styled.div`
  display: block;
  border: 1px solid red;
  /* margin-left: 10px; */
  margin-bottom: 20px;
  margin-right: 10px;
  font-size: 20px;
`
export const StInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
`
export const DropdownList = styled.div`
display: flex;
flex-direction: column;  
position: absolute;
 /* left: 800px; */
//props.absolute 값이 true일 때만 DropdownList 컴포넌트에 position: absolute;와 left: 10px; 스타일 속성이 적용
`

export const Stbutton123 = styled.div`
border: 2px solid rgb(238, 238, 238);
margin: 5px;
padding: 5px 10px;
font-size: 14px;
color: rgb(0, 0, 0);
line-height: 1.5;
    background-color: #ffffff;
    border-radius: 10px;
    font-size: 16px;
    &:hover{
    filter: brightness(90%)
}
`


