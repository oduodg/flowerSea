import React from 'react';
import { Link } from "react-router-dom";
import Profile from './profile';

export default function Header() {
	return (
		<>
			<div className="absolute z-20 w-full shadow-md h-11 bg-white">
				<Link to="/">
					<img className="inline ml-10 h-11" alt="signature" src="/images/signature_header.png" />
				</Link>
				<Profile/>
			</div>
		</>
	)
};