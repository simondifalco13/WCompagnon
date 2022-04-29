import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

interface AdminHomeProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function AdminHome(props: AdminHomeProps) {
    const navigate = useNavigate();
    function logout() {
        window.sessionStorage.removeItem("loggedIn");
        props.setIsLoggedIn(false);
    }
    return (
        <>
            {!window.sessionStorage.getItem("loggedIn") && (
                <Login
                    setIsLoggedIn={props.setIsLoggedIn}
                    urlPath="/admin"
                    sessionVariable="loggedIn"
                />
            )}
            {window.sessionStorage.getItem("loggedIn") === "true" && (
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <h2>Welcome Admin</h2>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p>
                            Register a new group <br />
                            <Button variant="outlined" onClick={() => navigate("/admin/group")}>
                                Group
                            </Button>
                        </p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p>
                            Register a new engine <br />
                            <Button variant="outlined" onClick={() => navigate("/admin/engine")}>
                                Engine
                            </Button>
                        </p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p>
                            Consult groups <br />
                            <Button variant="outlined" onClick={() => navigate("/admin/consult")}>
                                Consult
                            </Button>
                        </p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button variant="contained" onClick={logout} sx={{ alignItems: "center" }}>
                            Log Out
                        </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
