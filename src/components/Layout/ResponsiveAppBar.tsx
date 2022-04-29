import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Register", "Cafy"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface AppbarProps {
    setIsLoggedIn: (value: boolean) => void;
    setIsUserLoggedIn: (value: boolean) => void;
}

const ResponsiveAppBar = (props: AppbarProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleHome = () => {
        navigate("/home");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            <MenuItem key={"home"} onClick={handleHome}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem key={"register"} onClick={handleRegister}>
                                <Typography textAlign="center">Register</Typography>
                            </MenuItem>

                            {window.sessionStorage.getItem("loggedIn") === "true" && (
                                <MenuItem key={"logout"} onClick={() => navigate("/logout")}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>
                            )}
                            <MenuItem key={"userConnect"} onClick={() => navigate("loginUser")}>
                                <Typography textAlign="center">Sign in</Typography>
                            </MenuItem>
                            {window.sessionStorage.getItem("userLoggedIn") && (
                                <MenuItem key={"sign out"} onClick={() => disconnectUser}>
                                    <Typography textAlign="center">Sign Out</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            key={"home"}
                            onClick={handleHome}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Home
                        </Button>
                        <Button
                            key={"register"}
                            onClick={handleRegister}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Register
                        </Button>
                        {window.sessionStorage.getItem("loggedIn") === "true" && (
                            <Button
                                key={"log out"}
                                onClick={disconnect}
                                sx={{ my: 2, color: "white", display: "block", alignSelf: "right" }}
                            >
                                Log out
                            </Button>
                        )}
                        {!window.sessionStorage.getItem("userLoggedIn") && (
                            <Button
                                key={"userconnect"}
                                onClick={() => navigate("/loginUser")}
                                sx={{ my: 2, color: "white", display: "block", alignSelf: "right" }}
                            >
                                Sign in
                            </Button>
                        )}
                        {window.sessionStorage.getItem("userLoggedIn") === "true" && (
                            <Button
                                key={"account"}
                                onClick={() => navigate("/account")}
                                sx={{ my: 2, color: "white", display: "block", alignSelf: "right" }}
                            >
                                Account
                            </Button>
                        )}
                        {window.sessionStorage.getItem("userLoggedIn") === "true" && (
                            <Button
                                key={"sign out"}
                                onClick={disconnectUser}
                                sx={{ my: 2, color: "white", display: "block", alignSelf: "right" }}
                            >
                                Sign Out
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
    function disconnect() {
        window.sessionStorage.removeItem("loggedIn");
        window.sessionStorage.removeItem("user");

        props.setIsLoggedIn(false);
    }
    function disconnectUser() {
        window.sessionStorage.removeItem("userLoggedIn");
        window.sessionStorage.removeItem("user");
        navigate("/loginUser");
        props.setIsUserLoggedIn(false);
    }
};
export default ResponsiveAppBar;
