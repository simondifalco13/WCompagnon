import { ReactChild, ReactFragment, ReactPortal} from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

interface LayoutProps {
    children: ReactChild | ReactFragment | ReactPortal;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsUserLoggedIn: (isLoggedIn: boolean) => void;
}

export const Layout = (props: LayoutProps) => {

    return (
        <>
            <ResponsiveAppBar setIsLoggedIn={props.setIsLoggedIn} setIsUserLoggedIn={props.setIsUserLoggedIn} />
            <main>{props.children}</main>
        </>
    )
}