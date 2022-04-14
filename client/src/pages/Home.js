import React from "react";
import { useAppContext } from "../context/appContext";

function Home() {
	const { user } = useAppContext();

	return (
		<div>
			This is home
			{user ? <div>{user.image}</div> : <div>no user</div>}
		</div>
	);
}

export default Home;
