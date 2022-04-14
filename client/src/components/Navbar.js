import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { useAppContext } from "../context/appContext";
import theme from "../theme";

const pages = [
	{ name: "Home", link: "/" },
	{ name: "Task", link: "/tasks" },
	{ name: "Submissions", link: "/submissions" },
];
const settings = [
	// { name: "Profile", link: "/profile" },
	{ name: "Logout", link: "/logout" },
];

const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const { user, logoutUser } = useAppContext();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleUser = (name) => {
		setAnchorElUser(null);
		if (name === "Logout") logoutUser();
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar sx={{ backgroundColor: "primary.main" }} position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
						>
							CrackNCode
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page.name} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											<Link
												to={page.link}
												style={{ textDecoration: "none", color: "black" }}
											>
												{page.name}
											</Link>
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
						>
							CrackNCode
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									<Link
										to={page.link}
										style={{ textDecoration: "none", color: "white" }}
									>
										{page.name}
									</Link>
								</Button>
							))}
						</Box>

						{user ? (
							<Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
								<Typography marginRight={3}>{user.name}</Typography>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar src={user.image} alt={user.name} />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem
											key={setting.name}
											onClick={(event) => handleUser(setting.name)}
											// onClick={handleCloseUserMenu}
										>
											<Typography textAlign="center">{setting.name}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : (
							<Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
								{/* <Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link
										to="/register"
										style={{ textDecoration: "none", color: "white" }}
									>
										Sign Up
									</Link>
								</Button> */}
								<Button sx={{ my: 2, color: "white", display: "block" }}>
									<Link
										to="/login"
										style={{ textDecoration: "none", color: "white" }}
									>
										Login
									</Link>
								</Button>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};
export default Navbar;
