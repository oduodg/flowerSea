import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./sidebar.css";
import Sidebar_top from './sidebar_top';
import axios from 'axios';

export default function Sidebar({shopname, setShopname}) {
	
	const [shopinfo, setShopinfo] = useState(null);
	const [change, setChange] = useState(null);
	const [mains, setMains] = useState(null);
	const [subs, setSubs] = useState(null);
	const [bunchs, setBunchs] = useState(null);
	const [pickup, setPickup] = useState(0);
	const [cart, setCart] = useState({
		mainFlower1_ID : 1,
		mainFlower1_amount : null,
		mainFlower2_ID : null,
		mainFlower2_amount : null,
		mainFlower3_ID : null,
		mainFlower3_amount : null,
		subFlower1_ID : null,
		subFlower1_amount : null,
		subFlower2_ID : null,
		subFlower2_amount : null,
		subFlower3_ID : null,
		subFlower3_amount : null,
		bunchOfFlowers1_ID : null,
		bunchOfFlowers1_amount : null,
		bunchOfFlowers2_ID : null,
		bunchOfFlowers2_amount : null
	});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
	const [maincart, setMaincart] = useState([]);
	const [subcart, setSubcart] = useState([]);
	const [bunchcart, setBunchcart] = useState([]);
	const [now, setNow] = useState(0);
	const [number, dispatch] = useReducer(reducer, maincart);
	
	function reducer(state, action) {
		// i=0;
		switch (action.type) {
		  case "INCREMENT1":
			setMaincart(maincart);
			return maincart[now].flower_amount;
		  case "DECREMENT1": 
			setMaincart(maincart);
			return maincart[now].flower_amount;
		  case "INCREMENT2":
			setSubcart(subcart);
			return subcart[now].flower_amount;
		  case "DECREMENT2": 
			setSubcart(subcart);
			return subcart[now].flower_amount;
		  case "INCREMENT3":
			setBunchcart(bunchcart);
			return bunchcart[now].flower_amount;
		  case "DECREMENT3": 
			setBunchcart(bunchcart);
			return bunchcart[now].flower_amount;
		  default:
        	return 0;
		}
	  }

	const domain = "http://3.38.97.195/";
	// const domain = "http://127.0.0.1:8000/";
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
			setPickup(1);
			return navigate("/address");
		}
	}
	const Main = ({ main }) => {
		if(maincart.length < mains.length){
			const maintmp = {
				flower_id: main.idx,
				flower_amount : 0,
			}
			maincart.push(maintmp);
		}
		return (
		  <div className='flex flex-row mt-8 border-b-2 border-pickupbt pb-4'>
			<img src={"http://"+main.flowerPhoto.substr(16)} className='ml-2' alt="" width="100" />
			<div className='flex flex-col text-lg mx-12'>
				<div>{main.flowerName}</div>
				<div>{main.oneFlowerPrice}원 / 1송이</div>
			</div>
			<div className='flex flex-row'>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					if(maincart[main.idx - maincart[0].flower_id].flower_amount>0){
						maincart[main.idx - maincart[0].flower_id].flower_amount--;
						setNow(main.idx - maincart[0].flower_id);
						dispatch({ type: "DECREMENT1"});
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
					if(maincart[main.idx - maincart[0].flower_id].flower_amount != 0 || count<3){
					// if(count<3){
						maincart[main.idx - maincart[0].flower_id].flower_amount++;
						setNow(main.idx - maincart[0].flower_id);
						dispatch({ type: "INCREMENT1"});
					}
					else{
						alert("3 종류 까지 고를 수 있습니다~!");
					}
				  }}
				>+</button>
			</div>
		  </div>
		);
	}
	const Sub = ({ sub }) => {
		if(subcart.length < subs.length){
			const subtmp = {
				flower_id: sub.idx,
				flower_amount : 0,
			}
			subcart.push(subtmp);
		}
		// console.log(subcart);
		return (
		  <div className='flex flex-row mt-8 border-b-2 border-pickupbt pb-4'>
			{
				sub.flowerPhoto[15] === '/'
				?<img src={"http://"+sub.flowerPhoto.substr(16)} className='ml-2' alt="" width="100" />
				:<img src={"http://"+sub.flowerPhoto.substr(15)} className='ml-2' alt="" width="100" />
			}
			<div className='flex flex-col text-lg mx-12'>
				<div>{sub.flowerName}</div>
				<div>{sub.oneFlowerPrice}원 / 1송이</div>
			</div>
			<div className='flex flex-row'>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					if(subcart[sub.idx - subcart[0].flower_id].flower_amount>0){
						subcart[sub.idx - subcart[0].flower_id].flower_amount--;
						setNow(sub.idx - subcart[0].flower_id);
						dispatch({ type: "DECREMENT2"});
					}
					
				  }}
				>-</button>
				<div>{subcart[sub.idx - subcart[0].flower_id].flower_amount}</div>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					var count = 0;
					for (let i = 0; i < subcart.length; i++) {
						if(subcart[i].flower_amount != 0){
							count++;
						}
					}
					if(subcart[sub.idx - subcart[0].flower_id].flower_amount != 0 || count<3){
						subcart[sub.idx - subcart[0].flower_id].flower_amount++;
						setNow(sub.idx - subcart[0].flower_id);
						dispatch({ type: "INCREMENT2"});
					}
					else{
						alert("3 종류 까지 고를 수 있습니다~!");
					}
				  }}
				>+</button>
			</div>
		  </div>
		);
	}
	const Bunch = ({ bunch }) => {
		if(bunchcart.length < bunchs.length){
			const bunchtmp = {
				flower_id: bunch.idx,
				flower_amount : 0,
			}
			bunchcart.push(bunchtmp);
		}
		return (
		  <div className='flex flex-row my-8 border-b-2 border-pickupbt pb-4'>
			<img src={"http://"+bunch.flowerPhoto.substr(15)} className='ml-2' alt="" width="100"></img>
			<div className='flex flex-col text-lg ml-12 mr-12'>
				<div>{bunch.color}</div>
				<div>{bunch.price}원</div>
			</div>
			<div className='flex flex-row'>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					if(bunchcart[bunchcart.findIndex(i => i.flower_id === bunch.idx)].flower_amount>0){
						bunchcart[bunchcart.findIndex(i => i.flower_id === bunch.idx)].flower_amount--;
						setNow(bunchcart.findIndex(i => i.flower_id === bunch.idx));
						dispatch({ type: "DECREMENT3"});
					}
					
				  }}
				>-</button>
				<div>{bunchcart[bunchcart.findIndex(i => i.flower_id === bunch.idx)].flower_amount}</div>
				<button className='mx-4 grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 h-8'
				onClick={function(e){
					e.preventDefault();
					var count = 0;
					for (let i = 0; i < bunchcart.length; i++) {
						if(bunchcart[i].flower_amount != 0){
							count++;
						}
					}
					if(count<2 || bunchcart[bunchcart.findIndex(i => i.flower_id === bunch.idx)].flower_amount != 0){						
						bunchcart[bunchcart.findIndex(i => i.flower_id === bunch.idx)].flower_amount++;
						setNow(bunchcart.findIndex(i => i.flower_id === bunch.idx));
						dispatch({ type: "INCREMENT3"});
					}
					else{
						alert("3 종류 까지 고를 수 있습니다~!");
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
			
			let shops = await axios.get(domain + 'api/flowershop/');
			shops = JSON.stringify(shops.data);
			// shop에는 현재 click한 꽃집 기본 정보가 들어가 있음
			const shop = JSON.parse(shops).filter(function(element){
				return element.shopName === shopname;
			}); 
			
			setShopinfo(shop[0]);
			
			let response1 = await axios.get(domain + 'api/mainflower/' + shop[0].idx);
			setMains(response1.data);
			let response2 = await axios.get(domain + 'api/subflower/' + shop[0].idx);
			setSubs(response2.data);
			let response3 = await axios.get(domain + 'api/bunchofflowers/' + shop[0].idx);
			setBunchs(response3.data);
			
			} catch (e) {
				setError(e);
			}
			setLoading(false);
	};
	const onSubmit = async () => {
		try {
			const finalmain = []
			const finalsub = []
			const finalbunch = []
			for (let i = 0; i < maincart.length; i++) {
				if(maincart[i].flower_amount != 0){
					const tmp = {
						flower_id: maincart[i].flower_id,
						flower_amount : maincart[i].flower_amount,
					}
					finalmain.push(tmp);
				}
			}

			for (let i = 0; i < subcart.length; i++) {
				if(subcart[i].flower_amount != 0){
					const tmp = {
						flower_id: subcart[i].flower_id,
						flower_amount : subcart[i].flower_amount,
					}
					finalsub.push(tmp);
				}
			}

			for (let i = 0; i < bunchcart.length; i++) {
				if(bunchcart[i].flower_amount != 0){
					const tmp = {
						flower_id: bunchcart[i].flower_id,
						flower_amount : bunchcart[i].flower_amount,
					}
					finalbunch.push(tmp);
				}
			}
			if(finalmain[0]){
				cart.mainFlower1_ID = finalmain[0].flower_id;
				cart.mainFlower1_amount = finalmain[0].flower_amount;
				setCart(cart);
			}
			if(finalmain[1]){
				cart.mainFlower2_ID = finalmain[1].flower_id;
				cart.mainFlower2_amount = finalmain[1].flower_amount;
				setCart(cart);
			}
			if(finalmain[2]){
				cart.mainFlower3_ID = finalmain[2].flower_id;
				cart.mainFlower3_amount = finalmain[2].flower_amount;
				setCart(cart);
			}

			if(finalsub[0]){
				cart.subFlower1_ID = finalsub[0].flower_id;
				cart.subFlower1_amount = finalsub[0].flower_amount;
				setCart(cart);
			}
			if(finalsub[1]){
				cart.subFlower2_ID = finalsub[1].flower_id;
				cart.subFlower2_amount = finalsub[1].flower_amount;
				setCart(cart);
			}
			if(finalsub[2]){
				cart.subFlower3_ID = finalsub[2].flower_id;
				cart.subFlower3_amount = finalsub[2].flower_amount;
				setCart(cart);
			}

			if(finalbunch[0]){
				cart.bunchOfFlowers1_ID = finalbunch[0].flower_id;
				cart.bunchOfFlowers1_amount = finalbunch[0].flower_amount;
				setCart(cart);
			}
			if(finalbunch[1]){
				cart.bunchOfFlowers2_ID = finalbunch[1].flower_id;
				cart.bunchOfFlowers2_amount = finalbunch[1].flower_amount;
				setCart(cart);
			}
			console.log(cart);
			const accessToken = localStorage.getItem("userToken");
			const res = await axios.post(domain + "api/cart/", JSON.stringify(cart), {
				headers: {
					Authorization: `token ${accessToken}`,
					"Content-Type": "application/json",
				}
			});
			console.log(res)
			// const resq = await axios.post(domain + "api/cart/", cart);
			return navigate("/cart");
		} catch (err) {
			console.log(err)
		}
	}	
	

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;
	if (change != shopname){
		fetchCarts();
		setMains(null);
		setMaincart([]);
		setSubs(null);
		setSubcart([]);
		setBunchs(null);
		setBunchcart([]);
		setChange(shopname);
	}
	return (
		<>
			<div className='absolute z-10 h-full overflow-auto text-2xl font-normal bg-white '>
				<Sidebar_top />
				{
					pickup == 0
					?(
						<div className='flex flex-col'>
							<div className='flowerbuy ml-32 mt-14'>꽃 구매, 어떤 방식을 원하세요?</div>
							<div className='flex flex-row mt-24'>
								<button className='deliverbutton ml-20' onClick={onClickDeliverBtn}>배달</button>
								<button className='pickupbutton ml-56' onClick={onClickPickup}>픽업</button>
							</div>
						</div>
					)
					:null
				}
				
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
							<div>
								<div className='mt-2 text-center text-lg border-b-2 border-flower-pink bg-flower-pink'>Main Flower (최대 3개)</div>
								{
									mains.map(main => (<Main key={main} main={main} />))
								}
								<div className='text-center text-lg border-b-2 border-flower-pink bg-flower-pink'>Sub Flower (최대 3개)</div>
								{
									subs.map(sub => (<Sub key={sub} sub={sub} />))
								}
								<div className='text-center text-lg border-b-2 border-flower-pink bg-flower-pink'>Bunch Of Flower (최대 2개)</div>
								{
									bunchs.map(bunch => (<Bunch key={bunch} bunch={bunch} />))
								}
							</div>
							<div className="ml-12 mb-8">
								<button className="w-5/6 px-8 py-4 border-2 border-blue-300 rounded-md"
								type='submit' onClick={onSubmit}>장바구니</button>
							</div>
						</div>
						:null
					}
				</div>
			</div>
		</>
	)
}