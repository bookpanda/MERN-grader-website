import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOGOUT_USER,
} from "./actions";

const accessToken = localStorage.getItem("accessToken");
const user = localStorage.getItem("user");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	accessToken: accessToken,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3000);
	};

	const addUserToLocalStorage = ({ user, accessToken }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("accessToken", accessToken);
	};
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
	};

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post("/register", currentUser);
			const { user, accessToken } = response.data;
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user, accessToken },
			});
			addUserToLocalStorage({ user, accessToken });
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN });
		try {
			const { data } = await axios.post("/login", currentUser);
			const { user, accessToken } = data;
			dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, accessToken } });
			addUserToLocalStorage({ user, accessToken });
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const sendGoogleToken = async (tokenId) => {
		try {
			const { data } = await axios.post("/googlelogin", {
				idToken: tokenId,
			});
			const { user, accessToken } = data;
			dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, accessToken } });
			addUserToLocalStorage({ user, accessToken });
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const sendGithubToken = async () => {
		await window.location.assign(
			"https://github.com/login/oauth/authorize?client_id=90fd6a484c0108821c77&scope=user:email"
		);
		try {
			const { data } = await axios.get("/auth/github/cookie", {
				withCredentials: true,
			});
			const { user, accessToken } = data;
			dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, accessToken } });
			addUserToLocalStorage({ user, accessToken });
		} catch (error) {
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				sendGoogleToken,
				sendGithubToken,
				logoutUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
