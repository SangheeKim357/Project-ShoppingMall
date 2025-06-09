"use client"

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import "../App.css"

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(user)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    // Log the logout
    if (currentUser) {
      const logs = JSON.parse(localStorage.getItem("userLogs") || "[]")
      logs.push({
        action: "logout",
        userId: currentUser.id,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("userLogs", JSON.stringify(logs))
    }

    // Remove current user from localStorage
    localStorage.removeItem("currentUser")
    setIsLoggedIn(false)
    setCurrentUser(null)
    window.location.reload()
    navigate("/")
  }

  const location = useLocation();

  return (
    <>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
          <li><Link to="/">Main</Link></li>
          {!isLoggedIn && (
            <li><Link to="/SignUp">회원 가입</Link></li>)}
          <li><Link to="/Cart">장바구니</Link></li>
          {isLoggedIn ? (<> <li><Link to="/EditProfile">회원정보 수정</Link></li> <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li></>) : (<li><Link to="/LogIn">로그인</Link></li>)}
          <li><Link to="/Board">자유 게시판</Link></li>
          <li><Link to="/QnA">Q&A</Link></li>
          <li><Link to="/Product">전체 상품</Link></li>
        </ul>
        
          {location.pathname === "/" && (
                <div>
                    <img src="/home/14.png" alt="메인 이미지" style={{ width: "100%", maxHeight: "800px", objectFit: "cover" }} />
                </div>
                )}
        
      </nav>
      <Outlet context={{ isLoggedIn, currentUser }} />
    </>
  )
}

export default Main

