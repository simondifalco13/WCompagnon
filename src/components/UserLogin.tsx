import { Login } from "./admin/Login";

interface LoginProps {
    setIsUserLoggedIn: (isLoggedIn: boolean) => void;
}

export const UserLogin = (props: LoginProps) => {
    return (
        <div>
            {!window.sessionStorage.getItem("userLoggedIn") && (
                <Login
                    setIsLoggedIn={props.setIsUserLoggedIn}
                    urlPath={"/user/login"}
                    sessionVariable={"userLoggedIn"}
                />
            )}
        </div>
    );
};
