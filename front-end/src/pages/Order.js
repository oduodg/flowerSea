import React from 'react'
import './Order.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react'
import axios from 'axios';
import Cart from './Cart';

export default function Order(props) {
    const location = useLocation();
	const navigate = useNavigate();

    const domain = "http://127.0.0.1:8000/";
    const domain2 = "http://3.38.97.195/"
    const [carts, setCarts] = useState(null);
    const [userinfo, setUserinfo] = useState(null);

    const userData = {
		username: localStorage.getItem("userName"),
        token : localStorage.getItem("userToken")
	}
    console.log(localStorage.userToken);
    const fetchCarts = async () => {
        const headers = {
            'Authorization': localStorage.getItem("userToken")
        }
        const response = await axios.get(domain + "api/cart/");
        setCarts(response.data);

        // const user = await axios.get(domain + "api/userinfo/");
        const user = await axios.get(domain2 + "api/userinfo/", {"headers": headers});
        // const user = await axios.get(domain2 + "api/userinfo/");
        setUserinfo(user.data);
        console.log(userinfo);
    }
    console.log(carts);
    useEffect(() => {
        fetchCarts();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <div>
            <div className="flex flex-row border-b-2 mb-16 pt-16 ml-8 mr-8">
                <div className="ml-8"><img src="./images/flower_temp.png" alt="" width="60" /></div>
                <div className="f text-3xl pt-6 ml-2">주문하기</div>
                {/* <div>{props.carts.totalprice}</div> */}
            </div>
            <div className='flex flex-col mx-16'>
                <div className='f text-2xl pl-8 mb-4 ml-48 mr-40 border-b-2 border-flower-blue pb-2'>구매자 정보</div>
                <div className='flex flex-row ml-48 mr-'>
                    <div className='flex flex-col w-1/4'>
                        <div className='border-2 border-flower-blue py-2 text-center'>이름</div>
                        <div className='border-x-2 border-b-2 border-flower-blue py-2 text-center'>휴대폰 번호</div>
                        <div className='border-x-2 border-b-2 border-flower-blue py-2 text-center'>이메일</div>
                    </div> 
                    <div className='flex flex-col w-3/4'>
                        <div className='border-2 border-flower-blue py-2 w-5/6 pl-4'>이름ddfdfdfdf</div>
                        <div className='border-x-2 border-b-2 border-flower-blue py-2 w-5/6 pl-4'>휴대폰 번호</div>
                        <div className='border-x-2 border-b-2 border-flower-blue py-2 w-5/6 pl-4'>이메일</div>
                    </div> 
                </div>
            </div>
        </div>
    )
  
  }