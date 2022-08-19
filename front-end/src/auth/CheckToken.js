import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookieToken } from "../storage/Cookie";
import { DELETE_TOKEN } from "../store/Auth";

export function CheckToken(key) {
	const [isAuth, setIsAuth] = useState('Loaded');
	//const { authenticated, expireTime } = useSelector(state => state.token);
	const refreshToken = getCookieToken();
	const dispatch = useDispatch();

	useEffect(() => {
		const checkAuthToken = async () => {
			// 웹 브라우저의 쿠키에 토큰이 저장되어 있는지 확인
			if(refreshToken === undefined) { // 존재하지 않는다면
				dispatch(DELETE_TOKEN());
				setIsAuth('Failed'); // Failed 반환
			} else { // refresh 토큰이 저장되어 있다면
				setIsAuth('Success');
			}
		};
		checkAuthToken();
	}, [refreshToken, dispatch, key]);

	return {
		isAuth
	};
}