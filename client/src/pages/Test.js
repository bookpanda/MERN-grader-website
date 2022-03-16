import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
function Test() {
	const createCookie = () => {
		axios
			.post(
				"http://localhost:5000/login",
				{
					email: "joe@gmail.com",
					password: "secret",
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data);
			});
	};
	const deleteCookie = () => {
		axios
			.get("http://localhost:5000/logout", { withCredentials: true })
			.then((res) => {
				console.log(res.data);
			});
	};

	return (
		<div className="App">
			<h1>HTTP ONLY COOKIE DEMO</h1>
			<div className="box">
				<button className="button green" onClick={createCookie}>
					Create Cookies
				</button>
				<button className="button yellow">Renew Cookies</button>
				<button className="button red" onClick={deleteCookie}>
					Delete Cookie
				</button>
			</div>
		</div>
	);
}

export default Test;
