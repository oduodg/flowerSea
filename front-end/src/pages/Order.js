import React from 'react'
import './Order.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react'
import axios from 'axios';

export default function Order() {
    // const location = useLocation();
	// const navigate = useNavigate();

    // const domain = "http://127.0.0.1:8000/";
    const domain = "http://3.38.97.195/"

    const [carts, setCarts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userinfo, setUserinfo] = useState(null);
    const [req, setReq] = useState("");
    const [pay, setPay] = useState([]);

    const handleReq = (e) => {
		setReq(e.target.value);
	};
    const HandleClickRadioButton = (e) => {
        console.log(e.target.value)
        setPay(e.target.value)
    }

    const requirement = {
		requirement : req
	}
    const fetchCarts = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setCarts(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            // const headers = {
            //     'Authorization': localStorage.getItem("userToken")
            // }
            const accessToken = localStorage.getItem("userToken");
            const response = await axios.get(domain + "api/cart/",{
                        headers: {
                        Authorization: `token ${accessToken}`
                        }
                    });

            console.log("-------------", response.data);
            setCarts(response.data);
            console.log(carts);

            const user = await axios.get(domain + "/api/userinfo/", {
                headers: {
                  Authorization: `token ${accessToken}`
              }
            });
            // const user = await axios.get(domain2 + "api/userinfo/", {"headers": headers});
            // const user = await axios.get(domain2 + "api/userinfo/");
            setUserinfo(user.data);
            console.log(user.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };
    
    const onSubmit = async () => {
        const accessToken = localStorage.getItem("userToken");
        const res = await axios.post(domain + "api/ordertable/", JSON.stringify(requirement), {
				headers: {
					Authorization: `token ${accessToken}`,
					"Content-Type": "application/json",
				}
			});
        const del = await axios.delete(domain + "api/cart", {
            headers: {
                Authorization: `token ${accessToken}`
            }
        });
        console.log(del.data)
    }
    useEffect(() => {
        console.log("useeffect")
        fetchCarts();
    }, []);
    // fetchCarts();
    console.log(carts);

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

        // 아직 users가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
    if (!carts) return <div>cart가 없어요~~~!</div>;
    return (
        <div>
            <div className="flex flex-row border-b-2 border-flower-pink mb-16 pt-16 ml-8 mr-8">
                <div className="ml-8"><img src="./images/flower_temp.png" alt="" width="60" /></div>
                <div className="f text-3xl pt-6 ml-2">주문하기</div>
                {/* <div>{carts.totalprice}</div> */}
            </div>
            <div className='border-2 border-flower-pink mx-16 py-8'>  {/* 큰 border */}
                <div className="flex flex-row ml-60 mb-8">
                    <h1 className="f text-2xl px-4 m-4 border-b-4 ">{carts.shopname}</h1>
                    <div className="f px-4 p-4 my-4 ml-2 rounded bg-cyan-200">픽업</div>
                </div>
                <div className='flex flex-col mx-16'>
                    <div className='f text-2xl pl-8 mb-4 ml-48 mr-40 border-b-2 border-flower-blue pb-2'>구매자 정보</div>
                    <div className='flex flex-row ml-48 mr-'>
                        <div className='flex flex-col w-1/4'>
                            <div className='border-2 border-flower-pink py-2 text-center'>이름</div>
                            <div className='border-x-2 border-b-2 border-flower-pink py-2 text-center'>휴대폰 번호</div>
                            <div className='border-x-2 border-b-2 border-flower-pink py-2 text-center'>이메일</div>
                        </div> 
                        <div className='flex flex-col w-3/4'>
                            <div className='border-2 border-flower-pink py-2 w-5/6 pl-4'>{userinfo.name}</div>
                            <div className='border-x-2 border-b-2 border-flower-pink py-2 w-5/6 pl-4'>{userinfo.phoneNum}</div>
                            <div className='border-x-2 border-b-2 border-flower-pink py-2 w-5/6 pl-4'>{userinfo.email}</div>
                        </div> 
                    </div>
                    <div className='f text-2xl pl-8 mb-4 ml-48 mr-40 border-b-2 border-flower-blue pb-2 mt-16'>요청사항</div>
                    <div className='f ml-48 mr-40'>
                        <input className="w-full border-2 border-flower-pink py-2" type='text' id='req' name='req' maxLength='30' value={req} onChange={handleReq} placeholder ="요구사항을 입력해주세요."/>
                    </div>
                    <div className='f text-2xl pl-8 mb-4 ml-48 mr-40 border-b-2 border-flower-blue pb-2 mt-16'>결제수단</div>
                    <div className='f flex flex-row ml-48 mr-40'>
                        <span className="mr-4">신용카드</span>
                            <input
                            className="mr-16"
                            type="radio"
                            value="1"
                            checked={pay === "1"}
                            onChange={HandleClickRadioButton}
                            />
                        <span className="mr-4">계좌이체</span>
                            <input
                            className="mr-16"
                            type="radio"
                            value="2"
                            checked={pay === "2"}
                            onChange={HandleClickRadioButton}
                            />
                        <span className="mr-4">현장결제 - 카드</span>
                            <input
                            className="mr-16"
                            type="radio"
                            value="3"
                            checked={pay === "3"}
                            onChange={HandleClickRadioButton}
                            />
                        <span className="mr-4">현장결제 - 현금</span>
                            <input
                            className="mr-16"
                            type="radio"
                            value="4"
                            checked={pay === "4"}
                            onChange={HandleClickRadioButton}
                            />
                    </div>
                    <div className='f text-2xl pl-8 mb-4 ml-48 mr-40 border-b-2 border-flower-blue pb-2 mt-16'>총 결제금액</div>
                    <div className='f flex flex-row-reverse text-2xl pl-8 mb-4 ml-48 mr-48 pb-2'>{carts.totalPrice}원</div>
                </div>
                
            </div>{/* 큰 border */}
            <div className='lgbt'>
                <Link to='/payed'>
                    {/* <button className="text-2xl border-2 border-flower-blue rounded px-16 py-4 mb-4" */}
                    <button className="button" type='submit' onClick={onSubmit}
                        >결제하기</button>
                </Link>
            </div>
        </div>
    )
  
  }