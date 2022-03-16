import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";

import { ACTION } from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <AppContext.Provider>{children}</AppContext.Provider>;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
