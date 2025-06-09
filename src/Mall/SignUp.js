"use client"

import "../App.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
  const [Info, setInfo] = useState({})
  const [Submit, setSubmit] = useState({})
  const [pwError, setPwError] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setInfo((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...(prev[name] || []), value]
            : prev[name]?.filter((item) => item !== value)
          : value,
    }))

    if (name === "pwCheck") {
      setPwError(value !== Info.pw)
    }
  }
  const handlePwCheck = (e) => {
    e.preventDefault()
    if (Info.pw !== Info.pwCheck) {
      alert("비밀번호가 일치하지 않습니다!")
      return
    } else {
      alert("비밀번호가 일치합니다.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Info.pw !== Info.pwCheck) {
      alert("비밀번호가 일치하지 않습니다!")
      return
    }

    // Create a user object with all the information
    const user = {
      ...Info,
      userId: Info.id, // Add userId field for consistency with Board/QnA
      registrationDate: new Date().toISOString().split("T")[0],
    }

    // Store user in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    existingUsers.push(user)
    localStorage.setItem("users", JSON.stringify(existingUsers))

    // Log the registration
    const logs = JSON.parse(localStorage.getItem("userLogs") || "[]")
    logs.push({
      action: "signup",
      userId: user.id,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("userLogs", JSON.stringify(logs))

    setSubmit(Info)
    alert(`${Info.name}님, 회원가입이 완료되었습니다!`)
  }
  const navigate = useNavigate()
  const handleBtnClick = () => {
    navigate("/Login")
  }

  return (
    <div>
      <header className="h">
        <h1>회원가입</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td style={{ width: 150 }}>아이디</td>
              <td>
                <input type="text" name="id" style={{ width: 150 }} value={Info.id} onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>비밀번호</td>
              <td>
                <input type="password" name="pw" style={{ width: 150 }} value={Info.pw} onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>비밀번호 확인</td>
              <td className="check">
                <input type="password" name="pwCheck" style={{ width: 150 }}value={Info.pwCheck} onChange={handleChange}/>
                <br></br>
                <input type="button" className="button" onClick={handlePwCheck} value="확인" />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>이름</td>
              <td>
                <input type="text" name="name" style={{ width: 150 }} value={Info.name} onChange={handleChange} />
              </td>
            </tr>

            <tr className="gender">
              <td style={{ width: 150 }}>성별</td>
              <td className="gender">
                <input type="radio" name="gender" value="male" checked={Info.gender === "male"} onChange={handleChange} />{" "} 남성 <br />
                <input type="radio" name="gender" value="female" checked={Info.gender === "female"} onChange={handleChange} />{" "} 여성
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>모바일번호</td>
              <td>
                <input type="text" name="mobile" style={{ width: 150 }} value={Info.mobile} onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>거주지역</td>
              <td>
                <select name="region" value={Info.region || ""} onChange={handleChange}>
                  <option value="">선택하세요</option>
                  <option value="서울">서울</option>
                  <option value="경기">경기</option>
                  <option value="강원도">강원도</option>
                  <option value="충북">충북</option>
                  <option value="충남">충남</option>
                  <option value="경북">경북</option>
                  <option value="경남">경남</option>
                  <option value="전북">전북</option>
                  <option value="전남">전남</option>
                  <option value="제주도">제주도</option>
                </select>
              </td>
            </tr>

            <tr className="interest">
              <td style={{ width: 150 }}>관심분야</td>
              <td>
                <div className="interest-container">
                  <label><input type="checkbox" name="interest" value="정치" checked={Info.interest?.includes("정치")} onChange={handleChange} />{" "} 정치</label>
                  <label><input type="checkbox" name="interest" value="경제" checked={Info.interest?.includes("경제")} onChange={handleChange} />{" "} 경제</label>
                  <label><input type="checkbox" name="interest" value="문화" checked={Info.interest?.includes("문화")} onChange={handleChange} />{" "} 문화</label>
                  <label><input type="checkbox" name="interest" value="음악" checked={Info.interest?.includes("음악")} onChange={handleChange} />{" "} 음악</label>
                  <label><input type="checkbox" name="interest" value="게임" checked={Info.interest?.includes("게임")} onChange={handleChange} />{" "} 게임</label>
                  <label><input type="checkbox" name="interest" value="K-POP" checked={Info.interest?.includes("K-POP")} onChange={handleChange} />{" "} K-POP</label>
                  <label><input type="checkbox" name="interest" value="여행" checked={Info.interest?.includes("여행")} onChange={handleChange} />{" "} 여행</label>
                  <label><input type="checkbox" name="interest" value="맛집" checked={Info.interest?.includes("맛집")} onChange={handleChange} />{" "} 맛집</label>
                  <label><input type="checkbox" name="interest" value="독서" checked={Info.interest?.includes("독서")} onChange={handleChange} />{" "} 독서</label>
                </div>
              </td>
            </tr>

            <tr className="btn">
              <td colSpan="2" rowSpan="2">
                <input type="submit" className="button" value="가입" />
                <input type="reset" className="button" value="취소" />
                <br></br>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {Submit && (
        <div className="submit-box">
          <h2>가입 정보</h2>
          <p><strong>아이디:</strong> {Submit.id}</p>
          <p><strong>비밀번호:</strong> {Submit.pw}</p>
          <p><strong>이름:</strong> {Submit.name}</p>
          <p><strong>성별:</strong> {Submit.gender === "male" ? "남성" : "여성"}</p>
          <p><strong>모바일번호:</strong> {Submit.mobile}</p>
          <p><strong>거주지역:</strong> {Submit.region || "선택 안 함"}</p>
          <p><strong>관심분야:</strong> {Submit.interest?.join(", ") || "없음"}</p>
          <input type="button" className="Btn" value="로그인 페이지" onClick={handleBtnClick} />
        </div>
      )}
    </div>
  )
}

export default Signup

