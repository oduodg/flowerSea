import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";
import Sidebar_top from './sidebar_top';


export default function Sidebar({shop, setShop}) {
	const onClickDeliverBtn = () => {
		alert("배달 서비스는 준비중입니다 :)")
	}
	return (
		<>
			<div className='absolute z-10 h-full overflow-auto text-2xl font-normal bg-white '>
				<Sidebar_top />

				<div className='flowerbuy mt-14'>꽃 구매, 어떤 방식을 원하세요?</div>
				<div className='flex mt-24'>
					<button className='deliverbutton' onClick={onClickDeliverBtn}>배달</button>
					<Link to="/address">
						<button className='pickupbutton'>픽업</button>
					</Link>
				</div>
				<div className='line'></div>
				<div className='ml-20 text-sm font-bold mt-28'>당신의 주변, 이렇게 많은 꽃집이 있답니다!</div>
				<div className='mt-5 line'></div>
				<div className='mt-5'>{shop}</div>
			</div>
		</>
	)
}