import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from './GlobalStyle.js';
import Home from './Home.js';
import Login from './Login.js';
import SignUp from './Signup.js';
import Cart from './Cart.js';
import Product from './Product.js'
import Checkout from './Checkout.js';
import Header from './Header.js';

import UserContext from "../Context/userContext.js";
import ProductContext from "../Context/productContext";

export default function App(){

    const [token,setToken] = useState(null);
    const [username,setUsername] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [menu, setMenu] = useState(false);

    return(

        <UserContext.Provider value={{token,setToken,username,setUsername,products,setProducts,selectedProducts,setSelectedProducts,total,setTotal, menu, setMenu}}>
            <GlobalStyle />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/carrinho" element={<Cart />} />
                    <Route path="/produto/:productID" element={<Product />} />
                    <Route path="/finalizar" element={<Checkout />} />
                </Routes>
            </BrowserRouter>         
        </UserContext.Provider>
    )
}