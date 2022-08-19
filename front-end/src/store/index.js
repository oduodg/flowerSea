import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './Auth';
//reducer를 사용하기 위해 configureStore를 선언
export default configureStore({
	reducer: {
		authToken: tokenReducer,
	},
});