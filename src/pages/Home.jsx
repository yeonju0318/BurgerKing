import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import instance from "../axios/api";
import { useQuery } from "react-query";
import { useParams, Link, } from "react-router-dom";


function Home() {

  // const getPosts = async () => {
  //   console.log()
  //   try {
  //     const response = await instance.get(
  //       `/burgers`,
  //     );
  //     console.log(response)
  //     return response.data
  //   } catch (err) {
  //     console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
  //   }
  // };

  const { id } = useParams
  const [burgers, setBurgers] = useState(null);
  // 비동기 함수 : 서버(json-server)에 inputValue를 요청하는 함수
  const fetchTodos = async () => {
    const { data } = await instance.get(
      "/burgers"
    );
    setBurgers(data)
  }

  useEffect(() => {
    //db로부터 값을 가져올 것이다.
    fetchTodos();
  }, [])
  // console.log(burgers)
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
              <div>신제품&할인팩</div>
              <div>신제품(NEW)</div>
              <div>프리미엄</div>
              <div>와퍼&주니어</div>
              <div>치킨&슈림프버거</div>
              <div>올데이킹&킹모닝</div>
              <div>사이드</div>
              <div>음료&디저트</div>
            </StMenuList>
          </StNavMenuList>
          <StBurgerList>
            <div>
              <div>
                <StImg src="https://d1cua0vf0mkpiy.cloudfront.net/images/menu/normal/e626ab96-102e-4a1d-9770-cb3a7116877a.png" />
              </div>
              <StImgTitle>스모키 바비큐 와퍼 팩1</StImgTitle>
            </div>
            {burgers?.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/menus/${item.id}`} key={item.id}>
                    <div>
                      <StImg src="https://d1cua0vf0mkpiy.cloudfront.net/images/menu/normal/e626ab96-102e-4a1d-9770-cb3a7116877a.png" />
                    </div>
                    <StImgTitle>{item.menuname}</StImgTitle>
                  </Link>
                </div>
              )
            })}
          </StBurgerList>
        </StMenuLayouy>
      </StLayout>
    </>
  )
}

export default Home;

const StLayout = styled.div`
border: 2px solid pink;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0px auto;
`
const StMenuLayouy = styled.div`
  padding: 20px;
`

const Stnavbars = styled.div`
  background-color: black;
`
const Stnavbar = styled.div`
  color: white;
  font-size: 16px;
  height: 38px;
  width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  padding-left: 20px;
`
const StNavMenuList = styled.div`
  display: flex;
  padding: 50px 0 45px;
`
const StMenuList = styled.div`
  display: flex;
  color: #b8b8b8;
  gap: 12px;
      font-weight: 1000;

`
const StMenu = styled.div`
    font-size: 2.5em;
      font-weight: 1000;
`
const StImg = styled.img`
  display: flex;
  width: 240px;
`
const StImgTitle = styled.div`
  font-size: 1.25rem;
      font-weight: 1000;
      color: black;
    text-decoration: none;
`
const StBurgerList = styled.div`
  display: flex;
  gap: 66px;
  flex-wrap: wrap
  
`