import React from 'react'

function Header() {
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
                <div>
                  <div onClick={() => setCategoryOpen(!categoryOpen)}>{selectedItem}</div>
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
                <StAddInputForm>
                  카테고리: <StInput
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  /></StAddInputForm>
                <StAddInputForm>
                  메뉴이름: <StInput
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
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