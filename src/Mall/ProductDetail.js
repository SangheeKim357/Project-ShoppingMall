import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "../App.css";

function ProductDetail() {
  const { Add } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    if (!productId) {
      navigate("/Product");
      return;
    }

    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.id === Number(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate("/Product");
        }
      })
      .catch((error) => {
        console.error("상품 정보를 불러오는 중 오류 발생:", error);
        navigate("/Product");
      });
  }, [location, navigate]);

  const getProductSizes = (product) => {
    if (!product) return [];
  
    const title = product.title.toLowerCase();
    if (title.includes("신발") || title.includes("스니커즈") || title.includes("러닝화")) {
      return ["220", "230", "240", "250", "260", "270", "280", "290"];
    } else if (title.includes("티셔츠") || title.includes("자켓") || title.includes("후드")) {
      return ["S", "M", "L", "XL", "XXL"];
    } else if (title.includes("바지") || title.includes("청바지") || title.includes("팬츠")) {
      return ["S", "M", "L"];
    } else {
      return ["Free"];
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && getProductSizes(product).length > 1) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const productWithSize = {
      ...product,
      selectedSize: selectedSize || getProductSizes(product)[0],
    };

    Add(productWithSize);
    alert("장바구니에 추가되었습니다.");
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  if (!product) return <div className="loading">로딩 중...</div>;

  const sizes = getProductSizes(product);

  return (
    <section className="product-detail">
      {/* 이미지 & 정보 */}
      <article className="product-info">
        <img className="product-image" src={product.image || "/placeholder.svg"} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p className="product-price">{product.price.toLocaleString()}원</p>
        </div>
      </article>

      {/* 상세 정보 */}
      <article className="product-details">
        <p>{product.description || "상품 설명이 없습니다."}</p>

        {/* 사이즈 선택 */}
        <div className="size-selector">
          <p>사이즈:</p>
          {sizes.map((size, index) => {
          // 줄바꿈 문자 처리
           if (size === "br") {
             return <br key={index} />;
           }
            return (
             <button
                key={size}
                className={`size-button ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleSizeChange(size)}
            >
        {size}
      </button>
    );
  })}
        </div>

        {/* 버튼들 */}
        <div className="actions">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            장바구니에 추가
          </button>
          <button className="back-button" onClick={() => navigate("/Product")} >
            상품 목록으로 돌아가기
          </button>
        </div>
      </article>
    </section>
  );
}

export default ProductDetail;
