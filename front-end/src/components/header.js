import React from 'react';
import { Link } from "react-router-dom";

export default function header() {
	return (
		<>
			<div className="relative z-10 w-full shadow h-11">
				<Link to="/">
				<img className="inline pt-1 ml-10 h-9" alt="signature" src="/images/signature_temporary.png"></img>
				</Link>
				<Link to="/login">
				<button className="float-right p-1 mt-1 mr-10 border-2 rounded-lg">로그인</button>
				</Link>
			</div>
		</>
	)
};