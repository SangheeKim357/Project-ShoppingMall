import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css"
import Main from "./Mall/Main"
import SignUp from "./Mall/SignUp"
import Cart from "./Mall/Cart"
import LogIn from "./Mall/LogIn"
import Board from "./Mall/Board"
import QnA from "./Mall/QnA"
import Product from "./Mall/Product"
import { CartProvider } from "./Mall/CartContext"
import ProductDetail from "./Mall/ProductDetail"
import SearchId from "./Mall/SearchId"
import SearchPassword from "./Mall/SearchPassword"
import EditProfile from "./Mall/EditProfile"
import NewQnA from "./Mall/NewQnA";
import AddPost from "./Mall/AddPost";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Board" element={<Board />} />
            <Route path="AddPost" element={<AddPost />} />
            <Route path="QnA" element={<QnA />} />
            <Route path="NewQnA" element={<NewQnA />} />
            <Route path="Product" element={<Product />} />
            <Route path="ProductDetail" element={<ProductDetail />} />
            <Route path="LogIn" element={<LogIn />} />
            <Route path="SearchId" element={<SearchId />} />
            <Route path="SearchPassword" element={<SearchPassword />} />
            <Route path="EditProfile" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App

