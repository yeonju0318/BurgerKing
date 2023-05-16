import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams, Link, } from "react-router-dom";
import { getBurger } from '../api/posts';
import { useCookies } from "react-cookie";


function Home() {
  //==== ID값
  const { id } = useParams()
  const [selectedItem, setSelectedItem] = useState("스페셜&할인팩");
  const test = ["스페셜&할인팩", "신제품(NEW)", "프리미엄", "와퍼&주니어", "치킨&슈림프버거", "올데이킹&킹모닝", "사이드", "음료&디저트"]

  //=============================================

  const itemClickHandler = (category) => {
    setSelectedItem(category);
  };
  // ===============리액트 쿼리 관련 코드=========================

  const [cookies] = useCookies("userAuth");
  const token = cookies.userAuth;
  // console.log("token = ",token)

  const { isLoading, isError, data, enabled } = useQuery(["burgers", selectedItem], () => getBurger(selectedItem), {
    enabled: !!selectedItem
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }
 const burgers = data.menuList

  const burger = burgers?.filter((item) => item.category == selectedItem)
// console.log("burger = ",burger)
console.log("data = ", burger)
  return (
    <>
      <Header />
      <Stnavbars>
        <Stnavbar>Home 메뉴소개 </Stnavbar>
      </Stnavbars>
      <StLayout>
        <StMenuLayouy>
          <StNavMenuList>
            <StMenu>메뉴소개</StMenu>
            <StMenuList>
              {test.map((item) => {
                return (
                  <StBurgers key={item} onClick={() => itemClickHandler(item)}>{item}</StBurgers>
                )
              })}

            </StMenuList>
          </StNavMenuList>
          <StBurgerList>

            {burger?.map((item) => {
              return (
                <div key={item.menuId}>
                  <Link to={`/api/menus/${item.menuId}`} key={item.menuId}>
                    <div>
                      <StImg src={item.imageUrl
                      } />
                    </div>
                    <StImgTitle>{item.menuName}</StImgTitle>
                  </Link>
                </div>
              );
            })}
          </StBurgerList>
        </StMenuLayouy>
      </StLayout>
    </>
  );
}

export default Home;

const StLayout = styled.div`
  border: 2px solid pink;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0px auto;
`;
const StMenuLayouy = styled.div`
  padding: 20px;
`;

const Stnavbars = styled.div`
  background-color: black;
`;
const Stnavbar = styled.div`
  color: white;
  font-size: 16px;
  height: 38px;
  width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 20px;
`;
const StNavMenuList = styled.div`
  display: flex;
  padding: 50px 0 45px;
`;
const StMenuList = styled.div`
  display: flex;
  color: #b8b8b8;
  gap: 12px;
  font-weight: 1000;
`;
const StMenu = styled.div`
  font-size: 2.5em;
  font-weight: 1000;
`;
const StImg = styled.img`
  display: flex;
  width: 240px;

  height: 180px;
`

const StImgTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 1000;
  color: black;
  text-decoration: none;
`;
const StBurgerList = styled.div`
  display: flex;
  gap: 66px;
  flex-wrap: wrap;
  
`

const StBurgers = styled.div`
  border-width: 0px 0px 3px 0;
  /* margin-left: 10px; */
  &:hover {
    color: black;
  }

`

const StBurgers2 = styled.div`
  border: 1px solid pink;
  color: pink;
  border-width: 0px 0px 3px 0;
`;
