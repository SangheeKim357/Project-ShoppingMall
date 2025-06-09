"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

function Product() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

    // products.json 파일에서 상품 데이터 가져오기
  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  const handleProductClick = (productId) => {
    // 선택한 상품을 localStorage에 저장
    const selectedProduct = products.find((product) => product.id === productId)
    if (selectedProduct) {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct))
      navigate(`/ProductDetail?id=${productId}`)
    }
  }

  return (
    <div className="products-container">
      <h2>전체 상품</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
            <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
