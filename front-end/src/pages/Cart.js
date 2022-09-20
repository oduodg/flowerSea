import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import axios from 'axios';


export default function Cart() {
  const domain = "http://3.38.97.195/";
  // const domain = "http://127.0.0.1:8000/";
  
  const [carts, setCarts] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const flo = [];
  
  const [li1, setLinks1] = useState(null);
  const [li2, setLinks2] = useState(null);
  const [li3, setLinks3] = useState(null);
  const [li4, setLinks4] = useState(null);
  const [li5, setLinks5] = useState(null);
  const [li6, setLinks6] = useState(null);
  const [li7, setLinks7] = useState(null);
  const [li8, setLinks8] = useState(null);
  
  var list = [];
  
  
  const fetchCarts = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setCarts(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      
      const accessToken = localStorage.getItem("userToken");
      const response = await axios.get(domain + "api/cart/",{
				headers: {
				Authorization: `token ${accessToken}`
				}
			});
      setCarts(response.data); // 데이터는 response.data 안에 들어있습니다.
      console.log(response.data);
      if(response.data.shopname != ""){
        flo[0] = response.data.mainFlower1_ID;
        flo[1] = response.data.mainFlower2_ID;
        flo[2] = response.data.mainFlower3_ID;
        flo[3] = response.data.subFlower1_ID;
        flo[4] = response.data.subFlower2_ID;
        flo[5] = response.data.subFlower3_ID;
        flo[6] = response.data.bunchOfFlowers1_ID; 
        flo[7] = response.data.bunchOfFlowers2_ID;
        
        // shop 정보 찾기 위한 과정
        let shops = await axios.get(domain + 'api/flowershop/');
        // console.log(shops.data);
        shops = JSON.stringify(shops.data);
        const shop = JSON.parse(shops).filter(function(element){
          return element.shopName === response.data.shopname;
        }); 
        console.log("shopis", shop);

        // img 경로 저장을 위한 과정
        for(let i=0; i<8; i++){
          var result = "";
          if(i<3 && flo[i]){ // mainflower 이면서 주문목록에 있으면
            let main = await axios.get(domain + 'api/mainflower/' + shop[0].idx);
            main = JSON.stringify(main.data);
            const res = JSON.parse(main).filter(function(element){
              return element.idx === flo[i];
            }); 
            switch(i){
              case 0:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks1(result);
              case 1:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks2(result);
              case 2:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks3(result);
              default:

            }
          }
          else if(i<6 && i>2 && flo[i]){ // subflower 이면서 주문목록에 있으면
            let sub = await axios.get(domain + 'api/subflower/' + shop[0].idx);
            sub = JSON.stringify(sub.data);
            const res = JSON.parse(sub).filter(function(element){
              return element.idx === flo[i];
            }); 
            switch(i){
              case 3:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks4(result);
              case 4:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks5(result);
              case 5:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(16);
                setLinks6(result);
              default:

            }
          }
          else if(flo[i]){ // bunchofflower 이면서 주문목록에 있으면
            let bunch = await axios.get(domain + 'api/bunchofflowers/' + shop[0].idx);
            bunch = JSON.stringify(bunch.data);
            const res = JSON.parse(bunch).filter(function(element){
              return element.idx === flo[i];
            }); 
            switch(i){
              case 6:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(15);
                setLinks7(result);
              case 7:
                list[i] = (res[0].flowerPhoto);
                result = list[i].substr(15);
                setLinks8(result);
              default:
            }
          }
          else{
            list.push("")
          }
        }
     }
      
      console.log("fetchCarts 완료!");
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };
  const [number, dispatch] = useReducer(reducer, carts);
  
  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT1":
        carts.mainFlower1_amount++;
        carts.totalPrice += carts.mainFlower1_price;
        setCarts(carts);
        return carts.mainFlower1_amount;
      case "INCREMENT2":
        carts.mainFlower2_amount++;
        carts.totalPrice += carts.mainFlower2_price;
        setCarts(carts);
        return carts.mainFlower2_amount;
      case "INCREMENT3":
        carts.mainFlower3_amount++;
        carts.totalPrice += carts.mainFlower3_price;
        setCarts(carts);
        return carts.mainFlower3_amount;
      case "INCREMENT4":
        carts.subFlower1_amount++;
        carts.totalPrice += carts.subFlower1_price;
        setCarts(carts);
        return carts.subFlower1_amount;
      case "INCREMENT5":
        carts.subFlower2_amount++;
        carts.totalPrice += carts.subFlower2_price;
        setCarts(carts);
        return carts.subFlower2_amount;
      case "INCREMENT6":
        carts.subFlower3_amount++;
        carts.totalPrice += carts.subFlower3_price;
        setCarts(carts);
        return carts.subFlower3_amount;
      case "INCREMENT7":
        carts.bunchOfFlowers1_amount++;
        carts.totalPrice += carts.bunchOfFlowers1_price;
        setCarts(carts);
        return carts.bunchOfFlowers1_amount;
      case "INCREMENT8":
        carts.bunchOfFlowers2_amount++;
        carts.totalPrice += carts.bunchOfFlowers2_price;
        setCarts(carts);
        return carts.bunchOfFlowers2_amount;
      // x
      case "DECREMENT1":
        carts.mainFlower1_amount--;
        carts.totalPrice -= carts.mainFlower1_price;
        setCarts(carts);
        return carts.mainFlower1_amount;
      case "DECREMENT2":
        carts.mainFlower2_amount--;
        carts.totalPrice -= carts.mainFlower2_price;
        setCarts(carts);
        return carts.mainFlower2_amount;
      case "DECREMENT3":
        carts.mainFlower3_amount--;
        carts.totalPrice -= carts.mainFlower3_price;
        setCarts(carts);
        return carts.mainFlower3_amount;
      case "DECREMENT4": // subflower
        carts.subFlower1_amount--;
        carts.totalPrice -= carts.subFlower1_price;
        setCarts(carts);
        return carts.subFlower1_amount;
      case "DECREMENT5":
        carts.subFlower2_amount--;
        carts.totalPrice -= carts.subFlower2_price;
        setCarts(carts);
        return carts.subFlower2_amount;
      case "DECREMENT6":
        carts.subFlower3_amount--;
        carts.totalPrice -= carts.subFlower3_price;
        setCarts(carts);
        return carts.subFlower3_amount;
      case "DECREMENT7":
        carts.bunchOfFlowers1_amount--;
        carts.totalPrice -= carts.bunchOfFlowers1_price;
        setCarts(carts);
        return carts.bunchOfFlowers1_amount;
      case "DECREMENT8":
        carts.bunchOfFlowers2_amount--;
        carts.totalPrice -= carts.bunchOfFlowers2_price;
        setCarts(carts);
        return carts.bunchOfFlowers2_amount;
      default:
        return carts.mainFlower1_amount;
    }
  }
  
  const onSubmit = async () => {
		try {
			const res = await axios.post(domain + "api/cart/", carts);
      console.log("----------- submit ------------ ");
      console.log(res.data);
		} catch (err) {
			console.log(err)
		}
	}

  useEffect(() => {
    fetchCarts();
    console.log("fetchcart 후");
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;

	// 아직 users가 받아와 지지 않았을 때는 아무것도 표시되지 않도록 해줍니다.
  if (!carts) 
  return (
    <div>
      <div>cart가 없어요~~~!</div>
      <div className='text-3xl'> djdjdjdjdjdjdj</div>
    </div>
  )

	  return (
		<form name="orderform" id="orderform" className="orderform" onSubmit="return false;"> 		
				<input type="hidden" name="cmd" value="order" />
				<div className="border-b-2 border-solid mx-2 pb-4" id="basket">
          <div className="flex flex-row border-b-2 mb-16 mt-12">
            <div className="ml-8"><img src="./images/icon_cart_color.png" alt="" width="60" /></div>
            <div className="f text-3xl pt-6 ml-2">장바구니</div>
          </div>
          <div className="flex flex-row">
            {
              carts.shopname
              ?(
                <div>
                  <h1 className="f text-2xl px-4 m-4 border-b-4 ">{carts.shopname}</h1>
                  <button className="f px-4 p-4 my-4 ml-2 rounded-l-lg bg-gray-300 ">배달</button>
                  <button className="f px-4 p-4 my-4 ml-2 rounded-r-lg bg-cyan-200">픽업</button>
                </div>
                )
              :<h1 className='text-center mx-60 pl-12 text-3xl'>담겨진 상품이 없어요!</h1>
            }
            {

            }
            
          </div>
          <div>
          {
            carts.mainFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li1} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower1_price}</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "DECREMENT1"});
                        }}
                
                          >-</button>
                      <div className="pt-2 mx-4 grow">{carts.mainFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "INCREMENT1"});
                        }}
                      // onClick={onIncrease}                        
                      >+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower1_price * carts.mainFlower1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.mainFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li2} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                    <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                        onClick={function(e){
                          e.preventDefault();
                          dispatch({ type: "DECREMENT2"});
                        }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.mainFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT2"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower2_price * carts.mainFlower2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.mainFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li3} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.mainFlower3_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.mainFlower3_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT3"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.mainFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT3"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.mainFlower3_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.mainFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.mainFlower3_price*carts.mainFlower3_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li4} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower1_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT4"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT4"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower1_price*carts.subFlower1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li5} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT5"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT5"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower2_price*carts.subFlower2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.subFlower3_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li6} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.subFlower3_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.subFlower3_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT6"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.subFlower3_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT6"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.subFlower3_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.subFlower3_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.subFlower3_price*carts.subFlower3_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.bunchOfFlowers1_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li7} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.bunchOfFlower1_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.bunchOfFlowers1_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT7"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.bunchOfFlowers1_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT7"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers1_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers1_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.bunchOfFlowers1_price*carts.bunchOfFlowers1_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            carts.bunchOfFlowers2_ID
            ? <div className="flex flex-row border-2 rounded-lg border-solid border-gray-100 drop-shadow mx-2 mb-8">
                <div className="m-4 py-4"><img src={"http://"+li8} alt="" width="200" /></div>
                <div className="flex flex-col text-center justify-center pl-12 pr-24 border-r-2 border-gray-300 my-2 drop-shadow-none">
                  <div className="font-bold text-base p-1">품목</div>
                  <div className="p-2">{carts.bunchOfFlower2_name}</div>
                  <div className="flex flex-row">
                    <div className="w-16">{carts.bunchOfFlowers2_price}원</div>
                    <div className="w-4 ">/</div>
                    <div className="w-12 ">1송이</div>
                  </div>
                </div>
                <div className="flex flex-row-reverse w-full">
                  <div className="flex flex-col m-2 justify-center text-center">
                    <div className="flex flex-row border-y-2 rounded-lg border-blue-300 border-solid drop-shadow-none">
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "DECREMENT8"});
                      }}>-</button>
                      <div className="pt-2 mx-4 grow">{carts.bunchOfFlowers2_amount}</div>
                      <button className="grow-1 rounded-md border-2 border-solid bg-blue-300 border-blue-300 w-8 text-3xl"
                      onClick={function(e){
                        e.preventDefault();
                        dispatch({ type: "INCREMENT8"});
                      }}>+</button>
                    </div>
                    <div className="flex flex-row my-2 border-b-2 border-solid">
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers2_price}원</div>
                      <div className="m-2 text-neutral-400">X</div>
                      <div className="m-2 text-neutral-400">{carts.bunchOfFlowers2_amount}</div>
                    </div>
                    <div className="text-blue-300">{carts.bunchOfFlowers2_price*carts.bunchOfFlowers2_amount}원</div>
                  </div>
                </div>
              </div>
            : null
          }
          </div>	
				</div>
        <div className="flex flex-row-reverse">
          {
            carts.totalPrice
            ? <div className="mr-2 mt-2 bigtext right-align box summoney">{carts.totalPrice}원</div>
            :null
          }
          {
            carts.totalPrice
            ? <div className="mr-2 mt-2 bigtext right-align box summoney">합계 : </div>
            :null
          }
          
        </div>
        {
          carts.shopname
          ?(
            <div id="goorder" className="">
              <div className="clear"></div>
              <div className="buttongroup center-align">
                <Link to='/Order'>
                  <button className="button w-40 px-8 py-4 border-2 border-blue-300 rounded-md"
                  type='submit' onClick={onSubmit}>주문하기</button>
                </Link>
              </div>
				    </div>
          )
          :(
            <div className="buttongroup center-align">
              <Link to='/'>
                <button className="button w-40 px-8 py-4 border-2 border-blue-300 rounded-md"
                type='submit'>주문하러 가기</button>
              </Link>
            </div>
          )
        }
				
			</form>
	  )
	}