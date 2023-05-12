import React from 'react'
import { useState, useEffect } from "react";
import instance from "../axios/api";
import { useParams, Link, } from "react-router-dom/";

function DetaliBurger() {
  
  const { id } = useParams()

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
  const burger = burgers?.find((item)=>item.id==id)
  console.log(burger)
  // console.log(id)
  return (
    <>
    <div>id: {burger?.id}</div>
    <div>category: {burger?.category}</div>
    <div>menuname: {burger?.menuname}</div>
    <div>image: {burger?.image}</div>
    </>
  )
}

export default DetaliBurger