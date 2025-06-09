"use client";

import { useCart } from "./CartContext";
import "../App.css";

function Cart() {
  const { cart, Add, Delete } = useCart();

  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold">장바구니</h2>

      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        cart.map((item) => (
          <article
            key={`${item.id}-${item.selectedSize}`}
            className="border p-4 rounded-lg shadow-md my-2 flex items-center"
          >
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-16 h-16 object-contain mr-4" />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">
                {item.price.toLocaleString()}원 x {item.quantity}{" "}
                {item.selectedSize && `(사이즈: ${item.selectedSize})`}
              </p>
              <div className="flex mt-2">
                <button onClick={() => Add(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  +
                </button>
                <button
                  onClick={() => Delete(item.id, item.selectedSize)}
                  className="bg-red-500 text-white px-3 py-1 ml-2 rounded"
                >
                  -
                </button>
              </div>
            </div>
          </article>
        ))
      )}

      {cart.length > 0 && (
        <button onClick={() => Delete(null)} className="bg-gray-500 text-white px-4 py-2 mt-4 rounded">
          장바구니 비우기
        </button>
      )}
    </section>
  );
}

export default Cart;
