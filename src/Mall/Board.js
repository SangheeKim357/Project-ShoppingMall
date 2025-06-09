"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "../App.css"

function Board() {
  const [posts, setPosts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();

  // 게시물 로드
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]")
    if (storedPosts.length > 0) {
      setPosts(storedPosts)
    } else {
      // localStorage에 게시물이 없으면 fetch로 가져오기
      fetch("/board.json")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data)
          localStorage.setItem("boardPosts", JSON.stringify(data))
        })
        .catch((error) => console.error("Error loading posts:", error))
    }

      const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
          setIsLoggedIn(true);
        }
    }, []);

    const handleAddPost = () => {
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        navigate("/LogIn", { state: { from: location } });  // 로그인 페이지로 이동
        return;
      }
      navigate("/AddPost");  // 글 작성 페이지로 이동
    };

  const viewPostDetails = (post) => {
    // 조회수 증가
    const updatedPosts = posts.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    setPosts(updatedPosts)
    localStorage.setItem("boardPosts", JSON.stringify(updatedPosts))

    // 업데이트된 조회수로 선택된 게시물 설정
    setSelectedPost({ ...post, views: post.views + 1 })
  }

  const closePostDetails = () => {
    setSelectedPost(null)
  }

  return (
    <div className="board-container">
      <h2>자유 게시판</h2>
      <div className="board-actions">
        <button onClick={handleAddPost}>새 게시물 작성</button>
      </div>

      {selectedPost && (
        <div className="post-details-modal">
          <div className="post-details-content">
            <h3>{selectedPost.title}</h3>
            <p>
              작성자: {selectedPost.authorName} | 작성일: {selectedPost.date} | 조회수: {selectedPost.views}
            </p>
            <div className="post-content">
              <p>{selectedPost.content || "이 게시물에는 내용이 없습니다."}</p>
            </div>
            <button onClick={closePostDetails}>닫기</button>
          </div>
        </div>
      )}
      
      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>작성자 ID</th>
              <th>제목</th>
              <th>작성자 이름</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} onClick={() => viewPostDetails(post)} className="post-row">
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.authorName}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Board;

