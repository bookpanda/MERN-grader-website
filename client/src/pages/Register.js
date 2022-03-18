import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import theme from "../theme";

const initialState = {
	email: "",
	password: "",
};

export default function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);
	const { user, isLoading, showAlert, displayAlert, registerUser } =
		useAppContext();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		const name = data.get("name");
		const email = data.get("email");
		const password = data.get("password");
		if (!name || !email || !password) {
			displayAlert();
			return;
		}
		const currentUser = { name, email, password };
		registerUser(currentUser);
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 1000);
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
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						{showAlert && <Alert />}
						<Grid container spacing={2} marginTop={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="name"
									label="Username"
									name="name"
									autoComplete="name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="confirm-password"
									label="Confirm Password"
									type="password"
									id="confirm-password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
