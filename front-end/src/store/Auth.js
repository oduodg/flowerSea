import { createSlice } from "@reduxjs/toolkit";
//createSlice 를 이용하여 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용할 수 있다.

export const TOKEN_TIME_OUT = 60 * 1000 * 10; //60*1000이 1분 *10 = 10분

export const tokenSlice = createSlice({
	name: 'authToken',
	initialState: {
		authenticated: false, //현재 로그인 여부를 간단히 확인하기 위해 선언
		accessToken: null, //Access Token 저장
		expireTime: null //Access Token 의 만료 시간
	},
	reducers: {
		SET_TOKEN: (state, action) => { //SET_TOKEN : Access Token 정보를 저장한다.
			state.authenticated = true;
			state.accessToken = action.payload;
			state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
		},
		DELETE_TOKEN: (state) => { //DELETE_TOKEN : 값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제한다.
			state.authenticated = false;
			state.accessToken = null;
			state.expireTime = null
		},
	}
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;