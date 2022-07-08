import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext,useEffect,useState } from "react";

import UserContext from "../Context/userContext";

export default function Cart(){
    const{ token,username } = useContext(UserContext);

    const navigate = useNavigate();

    const [menu,setMenu] = useState(false);
    const [products, setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    try{
        useEffect(() => {
            const promise = axios.get(process.env.REACT_APP_LINK_BACKEND+"/cart", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            promise.then((response) => {setProducts(response.data.products);setTotal(response.data.total)} );
        }, [])
    }catch(error){
        console.log(error);
    }    
    return(
        <Container>
            <Header>
                <div onClick={()=>navigate(-1)}><ion-icon name="arrow-back-outline"></ion-icon></div>
                <Link to="/"><h1>BookStore</h1></Link>
                <User username={username} token={token} setMenu={setMenu} menu={menu}/>              
                <MenuUser menu={menu} setMenu={setMenu}/>
            </Header>
            <Content>
                    {
                        username ? <p>Aqui está seu carrinho, {username}</p> : <p>Faça login para ver seu carrinho!</p>
                    }
                    <Products>
                        {
                            products.length === 0 
                                ?
                                <div style={{textAlign:"center",fontSize:20, color:"#7c6a0a", fontWeight:700,marginTop:100}}>
                                    <p>Seu carrinho está vazio!</p>
                                    <Link to="/"><p style={{color:"#7c6a0a",marginTop:175}}>Voltar para a home!</p></Link>
                                </div>
                                :
                                products.map((value,index)=><Product value={value} key={index}/>)
                        }
                    </Products>
            </Content>
            
        </Container>
    )
}

function User({username,token,setMenu,menu}){
    return(
        <>
        {
            !token ? <Link to="/login"><p style={{color:"#ffffff",fontSize:"12px",fontWeight:700,textShadow:"1px 1px 2px #7C6A0A", textAlign:"center"}}>Clique aqui e<br/> faça seu Login!</p></Link> 
            :
            <UserArea>
                <p style={{color:"#ffffff",fontSize:"18px",fontWeight:700,marginRight:10}}>Olá {username}</p>
                {
                    menu ? <></> : <div onClick={()=> {setMenu(true)}}><ion-icon name="caret-down-outline"></ion-icon></div>
                }
            </UserArea>
        }
        </>
    )
    }

function MenuUser({menu,setMenu}){
    return(
        <>
        {
            menu ?  <PopUp>
                        <Link to="/"><p>Voltar para a página inicial!</p></Link>
                        <div onClick={()=>alert("Não foi implementado ainda!")}><p>Sair</p></div>
                        <div onClick={()=>{setMenu(false)}}><ion-icon name="caret-up-outline"></ion-icon></div>
                    </PopUp>
                    :
                    <></>
        }
        </>
    )
}

function Product({value}){
    return(
        <CartProd>
            <img src={value.imageUrl} />
            <div>
                <p style={{fontSize:18, color:"black", fontWeight:700}}>{value.name}</p>
                <p>{value.price}</p>
            </div>
        </CartProd>
    )
}

const CartProd = styled.div`
display: flex;

margin: 20px 20px;
border-bottom: 2px solid #7c6a0a;
    img{
        width: 80px;
        margin-right: 30%;
    }
`

const PopUp = styled.div`
position: fixed;
right: 1.5%;
top: 60px;

width: 165px;
height: fit-content;

border-radius: 7px;
background-color: #BABD8D;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;

    p{
        font-size: 14px;
        color: #ffffff;
    }

`

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

h1{
    font-family: 'Josefin Sans', sans-serif;
    font-size: 46px; 
    color: #FFFFFF;
    text-shadow: 1px 1px 2px #7C6A0A;   
}
`

const Header = styled.div`
    width: 100%;
    height: 60px;

    position: fixed;
    top: 0;

    background-color: #BABD8D;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 5%;
    padding-right: 5%;

    box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.2);

    h1{
        font-family:'Josefin Sans', sans-serif;
        font-size: 24px;
        color: #FFFFFF;
        text-shadow: 1px 1px 2px #7C6A0A;  
        padding-left: 30%;
    }
    ion-icon{
        font-size: 20px;
        color: #FFFFFF;
    }
`
const UserArea = styled.div`
display: flex;
align-items: center;
`

const Content = styled.div`
width: 80%;
height: 80%;

display: flex;
flex-direction: column;
align-items: center;
    >p{
        font-size: 20px;
        color: #7c6a0a;
        font-weight: 700;
    }
`
const Products = styled.div`
width: 70%;
min-height: 70%;

margin-top: 30px;
border: 3px solid #7c6a0a;
border-radius: 8px;
    >p{
        margin-top: 100px;
    }
`
