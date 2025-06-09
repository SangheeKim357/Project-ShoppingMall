"use client"

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function NewQnA() {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태 확인
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else { // 로그인 안 되어 있으면 로그인 페이지로 리디렉션, 현재 경로를 state로 저장
      navigate("/LogIn", { state: { from: location } });
    }
  }, [navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const submitPost = (e) => {
    e.preventDefault();

    if (!newPost.title) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 새 게시물 생성
    const newPostData = {
      id: Date.now(), // 고유 ID 생성
      userId: currentUser.id,
      title: newPost.title,
      authorName: currentUser.name,
      content: newPost.content,
      date: new Date().toISOString().split("T")[0],
      views: 0,
    };

    // 게시물 상태 및 localStorage 업데이트
    const storedPosts = JSON.parse(localStorage.getItem("qnaPosts") || "[]");
    const updatedPosts = [newPostData, ...storedPosts];
    localStorage.setItem("qnaPosts", JSON.stringify(updatedPosts));

    // 폼 초기화
    setNewPost({ title: "", content: "" });

    alert("문의글이 등록되었습니다.");
    navigate("/QnA"); // 게시글 작성 후 목록 페이지로 이동
  };

  return (
    <div className="board-container">
      <h2>새 문의글 작성</h2>
      <form onSubmit={submitPost}>
        <div className="form-group">
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="문의 제목을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>내용:</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
            placeholder="문의 내용을 상세히 입력해주세요"
            rows="5"
          />
        </div>
        <button type="submit">문의글 등록</button>
      </form>
    </div>
  );
}

export default NewQnA;
