"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function EditProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ id: "", name: "", mobile: "", gender: "", region: "", interest: [] })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"))
    if (storedUser) {
      setUser(storedUser)
    } else {
      alert("로그인이 필요합니다!")
      navigate("/LogIn")
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === "checkbox") {
      // 체크박스의 값이 selected되면 배열에 추가, 아니면 제거
      setUser((prevUser) => {
        const newInterest = Array.isArray(prevUser.interest) 
          ? checked
            ? [...prevUser.interest, value]  // 체크된 값 추가
            : prevUser.interest.filter((item) => item !== value)  // 체크 해제 시 값 제거
          : [value] // interest가 배열이 아닐 경우 새로운 배열을 만듬

        return { ...prevUser, interest: newInterest }
      })
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("currentUser", JSON.stringify(user))
    alert("회원정보가 수정되었습니다.")
    navigate("/")
  }

  return (
    <div>
      <header className="h">
        <h1>회원정보 수정</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td style={{ width: 150 }}>아이디</td>
              <td>
                <input type="text" name="id" style={{ width: 150 }} value={user.id} onChange={handleChange} readOnly />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>비밀번호</td>
              <td>
                <input type="password" name="pw" style={{ width: 150 }} value={user.pw || ""} onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>비밀번호 확인</td>
              <td className="check">
                <input type="password" name="pwCheck" style={{ width: 150 }} value={user.pwCheck || ""} onChange={handleChange} />
                <br />
                <input type="button" className="button" value="확인" />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>이름</td>
              <td>
                <input type="text" name="name" style={{ width: 150 }} value={user.name} onChange={handleChange} />
              </td>
            </tr>

            <tr className="gender">
              <td style={{ width: 150 }}>성별</td>
              <td className="gender">
                <input type="radio" name="gender" value="male" checked={user.gender === "male"} onChange={handleChange} />{" "} 남성 <br />
                <input type="radio" name="gender" value="female" checked={user.gender === "female"} onChange={handleChange} />{" "} 여성
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>모바일번호</td>
              <td>
                <input type="text" name="mobile" style={{ width: 150 }} value={user.mobile} onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ width: 150 }}>거주지역</td>
              <td>
                <select name="region" value={user.region || ""} onChange={handleChange}>
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
                  <label><input type="checkbox" name="interest" value="정치" checked={user.interest?.includes("정치")} onChange={handleChange} />{" "} 정치</label>
                  <label><input type="checkbox" name="interest" value="경제" checked={user.interest?.includes("경제")} onChange={handleChange} />{" "} 경제</label>
                  <label><input type="checkbox" name="interest" value="문화" checked={user.interest?.includes("문화")} onChange={handleChange} />{" "} 문화</label>
                  <label><input type="checkbox" name="interest" value="음악" checked={user.interest?.includes("음악")} onChange={handleChange} />{" "} 음악</label>
                  <label><input type="checkbox" name="interest" value="게임" checked={user.interest?.includes("게임")} onChange={handleChange} />{" "} 게임</label>
                  <label><input type="checkbox" name="interest" value="K-POP" checked={user.interest?.includes("K-POP")} onChange={handleChange} />{" "} K-POP</label>
                  <label><input type="checkbox" name="interest" value="여행" checked={user.interest?.includes("여행")} onChange={handleChange} />{" "} 여행</label>
                  <label><input type="checkbox" name="interest" value="맛집" checked={user.interest?.includes("맛집")} onChange={handleChange} />{" "} 맛집</label>
                  <label><input type="checkbox" name="interest" value="독서" checked={user.interest?.includes("독서")} onChange={handleChange} />{" "} 독서</label>
                </div>
              </td>
            </tr>

            <tr className="btn">
              <td colSpan="2" rowSpan="2">
                <input type="submit" className="button" value="수정" />
                <input type="reset" className="button" value="취소" />
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default EditProfile;
