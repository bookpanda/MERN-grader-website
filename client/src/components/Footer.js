import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				crackncode.in.th
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<Box
				component="footer"
				sx={{
					py: 3,
					px: 2,
					mt: "auto",
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[200]
							: theme.palette.grey[800],
				}}
			>
				<Container maxWidth="sm">
					<Stack direction="row" spacing={2}>
						<Box>
							<Typography variant="body1">CrackNCode Grader Website</Typography>
							<Copyright />
						</Box>
						<Box>
							<IconButton
								onClick={() => {
									window.open(
										"https://www.facebook.com/profile.php?id=100069611934421"
									);
								}}
							>
								<FacebookIcon />
							</IconButton>
							<IconButton
								onClick={() => {
									window.open("https://www.instagram.com/crackncodeth/");
								}}
							>
								<InstagramIcon />
							</IconButton>
						</Box>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
