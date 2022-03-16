import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "error",
			alertText: "Please provide all values",
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}
	if (action.type === LOGIN_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === LOGIN_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			accessToken: action.payload.token,
			user: action.payload.user,
			showAlert: true,
			alertType: "success",
			alertText: "Login Successful! Redirecting...",
		};
	}
	if (action.type === LOGIN_USER_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: "error",
			alertText: action.payload.msg,
		};
	}
	throw new Error(`No such action: ${action.type}`);
};

export default reducer;
