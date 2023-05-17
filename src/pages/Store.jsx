import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { styled } from "styled-components";
import { getBurgerKing } from "../api/posts";
import { useQuery } from "react-query";
import { useState } from "react";

function Store() {

  const [selected_Si, setSelected_Si] = useState("서울특별시");
  const [selected_Gu, setSelected_Gu] = useState("강남구");
  const [searchOpen, setSearchOpen] = useState(false)
  const [siOpen, setSiOpen] = useState(false)
  const [guOpen, setGuOpen] = useState(false)
  const searchDropdown = () => {
    setSearchOpen(!searchOpen)
  }
  const siDropdown = () => {
    setSiOpen(!siOpen)
    setGuOpen(false)

  }
  const guDropdown = () => {
    setGuOpen(!guOpen)
    setSiOpen(false)
  }
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

  const search_Si = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도",
    "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도",
  ];
  const search_Gu = [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ]
  const si_ClickHandler = (item) => {
    setSelected_Si(item);
  };
  const gu_ClickHandler = (item) => {
    setSelected_Gu(item);
  };
  const { isLoading, isError, data, enabled } = useQuery(
    ["si", selected_Si, "gu", selected_Gu],
    () => getBurgerKing(selected_Si, selected_Gu),
    {
      enabled: !!selected_Gu,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }

  return (<>

    <Navbar message="매장 찾기" />
    <StContainer>
      <StMap id="map" />
      <StButton>

        <StSideDropdown onClick={searchDropdown}>112312323</StSideDropdown>
      </StButton>
      {searchOpen &&
        <StSearchBar>

          <Stasd>
            지역검색
          </Stasd>
            <StSearch>
              <div onClick={siDropdown}>
                <StCategory>
                  {selected_Si}
                </StCategory>
                <StdropdownLists>

                  {siOpen &&
                    search_Si.map((item) => {
                      return (
                        <StdropdownList key={item} onClick={() => si_ClickHandler(item)}>
                          {item}
                        </StdropdownList>
                      );
                    })
                  }
                </StdropdownLists>

              </div>
              <div onClick={guDropdown}>
                <StCategory>
                  {selected_Gu}
                </StCategory>
                <StdropdownLists>

                  {guOpen &&
                    search_Gu.map((item) => {
                      return (
                        <StdropdownList key={item} onClick={() => gu_ClickHandler(item)}>
                          {item}
                        </StdropdownList>
                      );
                    })
                  }
                </StdropdownLists>

              </div>
            </StSearch>

          <StSearchLists>
            <div>  의 검색결과가 있습니다</div>
            <StSearchList>
              <div>매장이름:</div>
              <div>매장주소:</div>
              <div>매장번호:</div>
            </StSearchList>
          </StSearchLists>
        </StSearchBar>}
    </StContainer>
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
const StContainer = styled.div`
  display: flex;
`
const StSearchBar = styled.div`
  width: 400px;
    color: #000;
    background: #f2ebe6;
`

const Stasd = styled.div`
background: white;
height: 50px;
font-weight: 1000;
padding: 10px;

`
const StSearch = styled.div`
display: flex;
background: white;

`
const StSearchLists = styled.div`
display: block;
padding: 10px;
`
const StSearchList = styled.div`
border: 2px solid black;
display: block;
padding: 10px;
`
const StCategory = styled.div`
  height: 50px;
  padding: 10px;
  font-weight: 1000;
  margin-bottom: 20px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAAAGCAYAAADOmuQCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjkxNkYwQUUwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjkxNkYwQUYwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTE2RjBBQzAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTE2RjBBRDAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp+EA9sAAAsISURBVHja7JoLcFTl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");

  border: none;
  background-repeat: repeat-x;
  background-position: 0 100%;
  width: 150px;
  /* position: absolute; */
`
const StdropdownLists = styled.div`
background-color: white;
  /* border: 2px solid black; */
  position: absolute;
  width: 150px;
  
`
const StdropdownList = styled.div`
  &:hover{
    background-color: #4fa4ff;
  }
`
const StSideDropdown = styled.button`
    /* position: absolute; */
    left: -24px;
    top: 50%;
    width: 25px;
    height: 64px;
    margin-top: 150px;
    text-indent: -9999em;
    /* background: #f8f8f8; */
    border: 1px solid #2e2e2e;
    border-right-color: #f8f8f8;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.48);
    box-shadow: 0 2px 4px rgba(0,0,0,.48);
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPCAYAAAA2yOUNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REI4RjQ3ODYwRkUwMTFFOTk3OUFBREMwNTFDNjYxNTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REI4RjQ3ODcwRkUwMTFFOTk3OUFBREMwNTFDNjYxNTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQjhGNDc4NDBGRTAxMUU5OTc5QUFEQzA1MUM2NjE1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQjhGNDc4NTBGRTAxMUU5OTc5QUFEQzA1MUM2NjE1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvKqyMsAAADPSURBVHjabNG/DgFBEMfxvaOn0V0jkYjmvAUqb4HQiaidWkQjCh7AC9CgoNEqVVQ6lULpz3eS3WSyuUk+xWx+t7c7G8RxHBljdjijg4/xKosNKtbXBn86FOKl+ham/k4SauKi1vpI0naq46rWRxjokNQTNdxVcIK2O7irhw0eITcOsMA79M54s2dylcHcD5UwU73MrKdDbqiR7WVWXaxdqIADiuojud3K3S6HPcoqkOjfSmiLqgrIxMf+MPOqX2KY9sANO5uT3MR/XKm/AAMAIGQl3wmAyekAAAAASUVORK5CYII=") no-repeat 50%;
    `
const StButton = styled.div`
          content: "";
    /* position: absolute; */
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    background-color: transparent;
    `
    