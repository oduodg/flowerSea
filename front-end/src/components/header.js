import React from 'react';
import { Link } from "react-router-dom";

export default function header() {
	return (
		<>
			<div className="relative z-10 w-full shadow h-11">
				<Link to="/">
					<img className="inline ml-10 h-11" alt="signature" src="/images/signature_header.png" />
				</Link>
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
			</div>
		</>
	)
};