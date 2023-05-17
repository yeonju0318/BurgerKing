import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { styled } from "styled-components";
import "../App.css"

function Store() {
  
  const new_script = src => { 
    return new Promise((resolve, reject) => { 
      const script = document.createElement('script'); 
      script.src = src; 
      script.addEventListener('load', () => { 
        resolve(); 
      }); 
      script.addEventListener('error', e => { 
        reject(e); 
      }); 
      document.head.appendChild(script); 
    }); 
  };
  useEffect(() => { 
    //카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=595018d6bab7f70a6edd2a3ff77d999c');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      console.log('script loaded!!!');  
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
          level: 3 
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
      });   
    }); 
  }, []);

  return (<>
  
  <Navbar message="매장 찾기" />
      <StMap id="map"/>
  
  </>)
}

export default Store;
const StMap = styled.div`
  width: 100%;
  height: 600px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: medium;
  border-color: #D8D8D8;
`