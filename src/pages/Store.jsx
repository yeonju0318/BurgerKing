import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { styled } from "styled-components";
import { getBurgerKing } from "../api/posts";
import { useQuery } from "react-query";
import { useState } from "react";

function Store() {

  const [selectedSi, setSelectedSi] = useState("서울특별시");
  const [selectedGu, setSelectedGu] = useState("강남구");
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
  const searchSi = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도",
    "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도",
  ];
  const searchGu = {
    "서울특별시": [
      "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
    ],
    "부산광역시": [
      "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
    ],
    "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
    ],
    "인천광역시": ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"
    ]
  }
  const siClickHandler = (item) => {
    setSelectedSi(item);
  };
  const guClickHandler = (item) => {
    setSelectedGu(item);
  };
  //=========================================
  const { isLoading, isError, data, enabled } = useQuery(
    ["si", selectedSi, "gu", selectedGu],
    () => getBurgerKing(selectedSi, selectedGu),
    {
      enabled: !!selectedGu,
    }
  );
  const store = data?.documents
  const filterStore = store?.filter((item)=>item.category_group_name!=="주차장")
  const findStore = filterStore?.find((item) => item.x[0])
  //=================================맵카카오
  const { kakao } = window;
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    var mapContainer = document.getElementById('map');
    //처음 화면에 보여지는 지도
    var mapOptions = {
      center: new kakao.maps.LatLng(findStore?.y, findStore?.x),
      level: 6
    };

    var map = new kakao.maps.Map(mapContainer, mapOptions);

    //각 버거킹 지점들
    const positions = filterStore?.map((item) => {
      return (
        {
          title: item.place_name,
          latlng: new kakao.maps.LatLng(item.y, item.x)
        }
      )
    })
    
  console.log(positions)
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "data:image/png;base64,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";

    for (var i = 0; i < positions?.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(58, 80);
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        clickable: true,
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        // title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
      });
      // 마커에 표시할 인포윈도우를 생성합니다 
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].title.split(" ")[1] // 인포윈도우에 표시할 내용
      });
 // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      (function(marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
        });

        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
    })(marker, infowindow);
    }

  }, [filterStore])



  //===========================================
  return (
    <>
      <Navbar message="매장 찾기" />
      <StContainer>
        <StMap id="map"></StMap>
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
                  {selectedSi}
                </StCategory>
                <StdropdownLists>

                  {siOpen &&
                    searchSi.map((item) => {
                      return (
                        <StdropdownList key={item} onClick={() => siClickHandler(item)}>
                          {item}
                        </StdropdownList>
                      );
                    })
                  }
                </StdropdownLists>

              </div>
              <div onClick={guDropdown}>
                <StCategory>
                  {selectedGu}
                </StCategory>
                <StdropdownLists>

                  {guOpen &&
                    searchGu[selectedSi]?.map((item) => {
                      return (
                        <StdropdownList key={item} onClick={() => guClickHandler(item)}>
                          {item}
                        </StdropdownList>
                      );
                    })
                  }
                </StdropdownLists>

              </div>
            </StSearch>

            <StSearchLists>
              <div>  {filterStore?.length}의 검색결과가 있습니다</div>
              {filterStore?.map((item) => {
                return (
                  <StSearchList>
                    <div>매장이름:{item.place_name}</div>
                    <div>매장주소:{item.address_name}</div>
                    <div>매장번호:{item.phone}</div>
                  </StSearchList>
                )
              })}
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
margin: 10px;
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
