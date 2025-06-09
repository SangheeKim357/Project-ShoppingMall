"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "../App.css"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginError, setLoginError] = useState("")

  const handleLoginBtngoClick = () => {
    const enteredId = document.getElementById("LoginId").value
    const enteredPassword = document.getElementById("LoginPassword").value

    // localStorage 에서 사용자 불러오기
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.id === enteredId && u.pw === enteredPassword)

    if (user) {
      // localStorage에 현재 사용자 저장
      localStorage.setItem("currentUser", JSON.stringify(user))

      const logs = JSON.parse(localStorage.getItem("userLogs") || "[]")
      logs.push({
        action: "login",
        userId: user.id,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("userLogs", JSON.stringify(logs))

      alert(`${user.name}님, 환영합니다!`)

      const from = location.state?.from?.pathname || "/"
      navigate(from)
      window.location.reload()
    } else {
      setLoginError("잘못된 아이디 또는 비밀번호입니다.")
      alert("잘못된 아이디 또는 비밀번호입니다.")
    }
  }

  const handleSearchIdClick = () => {
    navigate("/SearchId")
  }

  const handleSearchPasswordClick = () => {
    navigate("/SearchPassword")
  }

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {loginError && <p className="error-message">{loginError}</p>}
      <table>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>
              <input type="text" id="LoginId" />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" id="LoginPassword" />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <input type="button" className="button" id="LoginBtnGo" value="확인" onClick={handleLoginBtngoClick} />
              <input type="button" className="button" id="MoveSearchIdBtnGo" value="아이디찾기" onClick={handleSearchIdClick} />
              <input type="button" className="button" id="MoveSearchPasswordBtnGo" value="비밀번호 찾기" onClick={handleSearchPasswordClick} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Login

