import React from "react";
import { useState, useEffect } from "react";
import instance from "../axios/instance";
import { useParams, useNavigate } from "react-router-dom/";
import { styled } from "styled-components";
import axios from "axios";

function DetaliBurger() {
  // 파람스
  const { id } = useParams();
  // 네비게이터
  const navigate = useNavigate();
  //db를 버거스에 담아둠
  const [burgers, setBurgers] = useState(null);
  // 업데이트 데이터 인풋값
  const [updateList, setUpdateList] = useState({
    category: "",
    menuname: "",
    image:
      "https://d1cua0vf0mkpiy.cloudfront.net/images/menu/normal/e626ab96-102e-4a1d-9770-cb3a7116877a.png",
  });
  // 수정모달
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // 삭제모달
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // 비동기 함수 : 서버(json-server)에 inputValue를 요청하는 함수
  const fetchTodos = async () => {
    const { data } = await instance.get("/burgers");
    setBurgers(data);
  };

  useEffect(() => {
    //db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);
  const burger = burgers?.find((item) => item.id == id);
  console.log(burger);
  // 수정모달창 오픈
  const updateShowModal = () => {
    setUpdateModalOpen(!updateModalOpen);
  };
  // 수정 핸들러
  const updateHandler = (e) => {
    const { name, value } = e.target;
    return setUpdateList({ ...updateList, [name]: value });
  };
  // 수정버튼 핸들러
  const updateButtonHandler = async () => {
    await instance.patch(`/burgers/${id}`, {
      category: updateList.category,
      menuname: updateList.menuname,
      image:
        "https://d1cua0vf0mkpiy.cloudfront.net/images/menu/normal/e626ab96-102e-4a1d-9770-cb3a7116877a.png",
    });
    setUpdateList({
      category: "",
      menuname: "",
    });
    fetchTodos(); // 이건 서버열리면 바뀔듯
    setUpdateModalOpen(!updateModalOpen);
  };
  // 삭제모달창 오픈
  const deleteShowModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  // 삭제버튼 핸들러
  const deleteHandler = async (id) => {
    await instance.delete(`/burgers/${id}`);
  };
  return (
    <>
      <div>id: {burger?.id}</div>
      <StDetailContent>
        <StFlex>
          <StAddImg>image: {burger?.image}</StAddImg>
          <StAddInputForms>
            <div>
              카테고리:
              <br /> {burger?.category}
            </div>
            <br />
            <div>
              menuname:
              <br /> {burger?.menuname}
            </div>
            <br />
            {updateModalOpen && (
              <div>
                카테고리 선택
                <StInput
                  name="category"
                  value={updateList.category}
                  onChange={updateHandler}
                />
                <br />
                <br />
                메뉴이름 입력
                <StInput
                  name="menuname"
                  value={updateList.menuname}
                  onChange={updateHandler}
                />
                <button onClick={updateButtonHandler}>수정하기</button>
              </div>
            )}
          </StAddInputForms>
        </StFlex>
        <div>
          <button onClick={updateShowModal}>
            {updateModalOpen ? "취소" : "수정"}
          </button>
          <button onClick={deleteShowModal}>삭제</button>
          <button onClick={() => navigate("/")}>확인</button>
        </div>
      </StDetailContent>
      {/* 삭제 모달창 */}
      {deleteModalOpen && (
        <ModalOverlay onClick={deleteShowModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p style={{ marginBottom: "10px" }}>삭제 하시겠습니까</p>
            <ModalButton>
              <button
                size="var(--size-small)"
                fontSize="var(--font-regular)"
                padding="8px"
                onClick={deleteShowModal}
              >
                취소
              </button>
              <button
                size="var(--size-small)"
                fontSize="var(--font-regular)"
                padding="8px"
                onClick={() => {
                  deleteHandler(id);
                  setTimeout(() => {
                    navigate("/");
                  });
                }}
              >
                삭제
              </button>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default DetaliBurger;

export const StDetailContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 700px;
  height: 500px;
  margin: 100px auto;
`;
const StFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StAddImg = styled.div`
  width: 400px;
  height: 400px;
  border: 2px solid pink;
`;
export const StAddInputForms = styled.div`
  /* border: 1px solid black; */
  /* margin-top: 20px; */
  padding-top: 10px;
  width: 250px;
  font-size: 20px;
  font-weight: 1000;
`;

export const StInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAAAGCAYAAADOmuQCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjkxNkYwQUUwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjkxNkYwQUYwM0ZGMTFFOThFNThDQzJDRUI5NTVBM0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTE2RjBBQzAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTE2RjBBRDAzRkYxMUU5OEU1OENDMkNFQjk1NUEzQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp+EA9sAAAsISURBVHja7JoLcFTl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");

  border: none;
  background-repeat: repeat-x;
  background-position: 0 100%;
`;
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
  width: 300px;
  height: 200px;
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
