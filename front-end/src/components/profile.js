import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Profile() {
	const location = useLocation();

	const userName = localStorage.getItem("userName");
	
	if(userName) {
		return (
			<div className="flex justify-center float-right">
				<Link to="/mypage">
					<div className="text-[#8DA6FF] mt-2.5 mr-4 h-9">{userName}님</div>
				</Link>
				<Link to="/mypage">
					<img className="pt-2 mr-4 h-9" alt="profile" src="/images/icon_profile.png" />
				</Link>
				<Link to="/cart">
					<img className="pt-2 mr-10 h-9" alt="profile" src="/images/icon_cart_color.png" />
				</Link>
			</div>
		)
	}
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