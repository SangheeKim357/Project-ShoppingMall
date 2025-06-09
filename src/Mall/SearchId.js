"use client"

import { useNavigate } from "react-router-dom"
import "../App.css"

function SearchId() {
  const navigate = useNavigate()

  // 전화번호 입력 후, 저장된 전화번호와 비교하고 아이디를 바로 표시하는 함수
  const CheckInfo = () => {
    const enternumber = document.getElementById("SearchNumber").value

    // localStorage에서 사용자 정보를 가져옴
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    
    // 입력한 전화번호와 일치하는 사용자를 찾음
    const user = users.find(user => user.mobile === enternumber)

    if (user) {
      alert(`회원님의 아이디는 ${user.userId}입니다.`)  // 아이디를 바로 보여줌
    } else {
      alert("일치하는 전화번호가 없습니다.")
    }
  }

  // 로그인 페이지로 이동하는 함수
  const handleClickMoveLoginBtnGo = () => {
    navigate("/Login")
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan="2">
            <h3>아이디 찾기</h3>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>전화번호 입력</td>
          <td>
            <input type="number" id="SearchNumber" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="button" id="SearchSubmit" value="확인" onClick={CheckInfo} />
            <input type="button" id="MoveLoginBtnGo" value="로그인페이지" onClick={handleClickMoveLoginBtnGo} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default SearchId
