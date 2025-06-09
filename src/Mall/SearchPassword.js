"use client"

import { useNavigate } from "react-router-dom"
import "../App.css"

function SearchPassword() {
  const navigate = useNavigate()

  const storedId = "user1" //임의 아이디
  const storedNumber = "12345678" //임의 전화번호

  const CheckInfo = () => {
    const enterneedid = document.getElementById("NeedId").value
    const enterneednumber = document.getElementById("NeedNumber").value

    if (enterneedid === storedId && enterneednumber === storedNumber) {
      alert("SMS로 비밀번호가 발송되었습니다.") //비밀번호 변경하는 기능 추가할까?
    } else {
      alert("일치하는 아이디 또는 전화번호가 없습니다.")
    }
  }

  const handleGoLogin = () => {
    navigate("/Login")
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan="2">
            <h3>비밀번호 찾기</h3>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>아이디 입력</td>
          <td>
            <input type="text" id="NeedId" />
          </td>
        </tr>
        <tr>
          <td>전화번호 입력</td>
          <td>
            <input type="number" id="NeedNumber" />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <input type="button" id="GoodSearch" value="확인" onClick={CheckInfo} />
            <input type="button" id="GoLogin" value="로그인페이지" onClick={handleGoLogin} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default SearchPassword

