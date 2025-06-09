import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const Add = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const Delete = (id, size) => {
    if (id === null) {
      setCart([]); // 장바구니 비우기
      return;
    }

    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // 개수가 0이 되면 삭제
    );
  };

  return <CartContext.Provider value={{ cart, Add, Delete }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
