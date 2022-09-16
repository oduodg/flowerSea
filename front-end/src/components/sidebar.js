import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./sidebar.css";
import Sidebar_top from './sidebar_top';
import axios from 'axios';

export default function Sidebar({shopname, setShopname}) {
	const [shopinfo, setShopinfo] = useState(null);
	const [change, setChange] = useState(null);
	const [mains, setMains] = useState(
		{
			enlightened: "full bloom",
			floriography: "순수",
			flowerName: "분홍 수국",
			flowerPhoto: "/media/https%3A/www.simpol.co.kr/data/shopimages/product/302421116/202202/005002000000272562.jpg",
			idx: 581,
			oneFlowerPrice: 4000,
			quantity: 16,
			shop: 171
		}
	);
	const cart = {
		user : "",
		shopname : "",
		mainFlower1_ID : "",
		mainFlower1_name : "",
		mainFlower1_amount : 0,
		mainFlower1_price : "",
		mainFlower2_ID : "",
		mainFlower2_name : "",
		mainFlower2_amount : "",
		mainFlower2_price : "",
		mainFlower3_ID : "",
		mainFlower3_name : "",
		mainFlower3_amount : "",
		mainFlower3_price : "",
		subFlower1_ID : "",
		subFlower1_name : "",
		subFlower1_amount : "",
		subFlower1_price : "",
		subFlower2_ID : "",
		subFlower2_name : "",
		subFlower2_amount : "",
		subFlower2_price : "",
		subFlower3_ID : "",
		subFlower3_name : "",
		subFlower3_amount : "",
		subFlower3_price : "",
		bunchOfFlowers1_ID : "",
		bunchOfFlowers1_name : "",
		bunchOfFlowers1_amount : "",
		bunchOfFlowers1_price : "",
		bunchOfFlowers2_ID : "",
		bunchOfFlowers2_name : "",
		bunchOfFlowers2_amount : "",
		bunchOfFlowers2_price : ""
	}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
	const [maincart, setMaincart] = useState([]);
	const [now, setNow] = useState(0);
	const [number, dispatch] = useReducer(reducer, maincart);
	
	function reducer(state, action) {
		// i=0;
		switch (action.type) {
		  case "INCREMENT":
			setMaincart(maincart);
			console.log(maincart);
			return maincart[now].flower_amount;
		  case "DECREMENT": 
			setMaincart(maincart);
			console.log(maincart);
			return maincart[now].flower_amount;
		  default:
        	return 0;
		}
	  }

	// const domain = "http://3.38.97.195/";
	const domain = "http://127.0.0.1:8000/";
	const navigate = useNavigate();
	const onClickDeliverBtn = () => {
		alert("배달 서비스는 준비중입니다 :)")
	}
	const onClickPickup = () => {
		if(!localStorage.getItem("userToken")){
			alert("로그인을 해주세요 ㅎㅎ")
			return navigate("/login");
		}
		else{
			return navigate("/address");
		}
	}
	const Main = ({ main }) => {
		main.flowerPhoto = main.flowerPhoto.substr(16);
		if(maincart.length < mains.length){
			const maintmp = {
				flower_id: main.idx,
				flower_amount : 0,
			}
			maincart.push(maintmp);
		}
		return (
		  <div className='flex flex-row my-8 border-b-2 border-pickupbt'>
			{/* <img src={"http://"+mains.flowerPhoto} alt="" width="100" /> */}
			<div className='flex flex-col text-lg mr-28'>
				<div>{main.flowerName}</div>
				<div>{main.oneFlowerPrice}/1송이</div>
			</div>
			<div className='flex flex-row'>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					if(maincart[main.idx - maincart[0].flower_id].flower_amount>0){
						maincart[main.idx - maincart[0].flower_id].flower_amount--;
						setNow(main.idx - maincart[0].flower_id);
						// console.log(maincart[mains.idx - maincart[0].flower_id]);
						dispatch({ type: "DECREMENT"});
					}
					
				  }}
				>-</button>
				<div>{maincart[main.idx - maincart[0].flower_id].flower_amount}</div>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					var count = 0;
					for (let i = 0; i < maincart.length; i++) {
						if(maincart[i].flower_amount != 0){
							count++;
						}
					}
					console.log(count);
					if(count<3){
						maincart[main.idx - maincart[0].flower_id].flower_amount++;
						setNow(main.idx - maincart[0].flower_id);
						dispatch({ type: "INCREMENT"});
					}
					else{
						alert("3 종류 까지 고를 수 있습니다~!");
						console.log(maincart);
					}
				  }}
				>+</button>
			</div>
		  </div>
		);
	  }
	const fetchCarts = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // setShops(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
			console.log("shopname is", shopname);
			let shops = await axios.get(domain + 'api/flowershop/');
			shops = JSON.stringify(shops.data);
			// shop에는 현재 click한 꽃집 기본 정보가 들어가 있음
			const shop = JSON.parse(shops).filter(function(element){
				// console.log("json parse 안에서의 shopname ", shopname);
				return element.shopName === shopname;
			}); 
			
			console.log(shop[0]);
			setShopinfo(shop[0]);
			// console.log("fetchCarts 안에서의 shopinfo", shopinfo);
			
			let response = await axios.get(domain + 'api/mainflower/' + shop[0].idx);
			// console.log(mainflower.data);
			setMains(response.data);
			// console.log(mainflower.data.length);

			// for (let i = 0; i < mainflower.data.length; i++) {
			// 	// console.log(mainflower.data[i].idx);
			// 	const maintmp = {
			// 		flower_id: mainflower.data[i].idx,
			// 		flower_amount : 0,
			// 	}
			// 	maincart.push(maintmp);
			// }
			// console.log(maincart);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};
		// console.log("fetchCarts 밖에서의 shopinfo", shopinfo)
	
	

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;
	if (change != shopname){

		console.log("now shopname is", shopname);
		fetchCarts();
		setChange(shopname);
	}
	// fetchCarts();
	return (
		<>
			<div className='absolute z-10 h-full overflow-auto text-2xl font-normal bg-white '>
				<Sidebar_top />

				<div className='flowerbuy mt-14'>꽃 구매, 어떤 방식을 원하세요?</div>
				<div className='flex mt-24'>
					<button className='deliverbutton' onClick={onClickDeliverBtn}>배달</button>
					<button className='pickupbutton' onClick={onClickPickup}>픽업</button>
				</div>
				<div className='border-y-2 text-center text-sm font-bold mt-20 py-4'>당신의 주변, 이렇게 많은 꽃집이 있답니다!</div>
				<div className='flex flex-col mt-4'>
					{
						shopinfo
						?<div>
							<div className='f text-center mb-4'>{shopinfo.shopName}</div>
							<div className='f text-center text-sm '>{shopinfo.location}</div>
							<div className='f text-center text-sm'>{shopinfo.openHours}</div>
							<div className='f text-center text-sm'>{shopinfo.phoneNum}</div>
							<div className="f mx-40 text-sm my-2 text-center rounded-full bg-pickupbt">픽업</div>

							<div className='border-y-2 border-flower-blue text-center'>판매 목록</div>
							{
								mains.map(main => (<Main main={main} />))
							}
						</div>
						:null
					}
				</div>
			</div>
		</>
	)
}