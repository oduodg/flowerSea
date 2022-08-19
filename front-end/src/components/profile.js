import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
	const location = useLocation();
	const navigate = useNavigate();

	const onClickLogout = () => {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userName");
		console.log(localStorage.userToken);
		return navigate('/')
	}

	if (!localStorage.getItem("userToken")) {
		return (
			<div className="flex justify-center float-right">
				<Link to="/login">
					<div className="text-[#8DA6FF] mt-2.5 mr-4 h-9">로그인을 해주세요.</div>
				</Link>
				<Link to="/login">
					<img className="pt-2 mr-4 h-9" alt="profile" src="/images/icon_profile.png" />
				</Link>
				<Link to="/cart">
					<img className="pt-2 mr-10 h-9" alt="profile" src="/images/icon_cart_color.png" />
				</Link>
			</div>
		)
	}

	return (
		<div className="flex float-right">
			<Link to="/mypage">
				<div className="text-[#8DA6FF] mt-2.5 mr-4 h-9">{localStorage.getItem("userName")}님</div>
			</Link>
			<Link to="/mypage">
				<img className="pt-2 mr-4 h-9" alt="profile" src="/images/icon_profile.png" />
			</Link>
			<Link to="/cart">
				<img className="pt-2 h-9" alt="profile" src="/images/icon_cart_color.png" />
			</Link>
			<button className='h-8 px-1 mt-1.5 text-sm text-gray-300 ml-2 mr-5 border-2 hover:text-[#8DA6FF] hover:border-2 hover:border-[#8DA6FF] rounded-lg' onClick={onClickLogout}>로그아웃</button>
		</div>
	)
}