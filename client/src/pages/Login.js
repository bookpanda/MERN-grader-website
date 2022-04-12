import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components";
import { useAppContext } from "../context/appContext";
import theme from "../theme";

import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const initialState = {
	email: "",
	password: "",
};

export default function Login() {
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);
	const {
		user,
		isLoading,
		showAlert,
		displayAlert,
		loginUser,
		sendGoogleToken,
		sendFacebookToken,
		sendGithubToken,
	} = useAppContext();

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const email = data.get("email");
		const password = data.get("password");
		if (!email || !password) {
			displayAlert();
			return;
		}
		const currentUser = { email, password };
		loginUser(currentUser);
	};

	const responseGoogle = (response) => {
		sendGoogleToken(response.tokenId);
	};
	const responseFacebook = (response) => {
		console.log("login facebook: ", response);
		sendFacebookToken(response.userID, response.accessToken);
	};
	const responseGithub = () => {
		sendGithubToken();
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 100);
		}
	}, [user, navigate]);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h4" sx={{ mt: 3, mb: 2 }}>
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						{showAlert && <Alert />}
						{/* <TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							name="email"
							value={values.email}
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							name="password"
							value={values.password}
							onChange={handleChange}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button> */}
						<GoogleLogin
							clientId="2240931842-c0ikqfjglggqo8qa1visrbdkjbea0m34.apps.googleusercontent.com"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={"single_host_origin"}
							render={(renderProps) => (
								<Button
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									<div className=" p-2 rounded-full ">
										<i className="fab fa-google " />
									</div>
									<span className="ml-4">Sign In with Google</span>
								</Button>
							)}
						></GoogleLogin>
						{/* <FacebookLogin
							appId="2217201518427322"
							autoLoad
							callback={responseFacebook}
							render={(renderProps) => (
								<Button
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
								>
									<div className=" p-2 rounded-full ">
										<i className="fab fa-google " />
									</div>
									<span className="ml-4">Sign In with Facebook</span>
								</Button>
							)}
						></FacebookLogin> */}
						<Button
							onClick={responseGithub}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							<div className=" p-2 rounded-full ">
								<i className="fab fa-google " />
							</div>
							<span className="ml-4">Sign In with GitHub</span>
						</Button>
						{/* <Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid> */}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
