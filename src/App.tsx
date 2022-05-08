import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountInformation from "./components/Account/AccountInformation";
import AdminHome from "./components/admin/AdminHome";
import ConsultGroups from "./components/admin/ConsultGroups";
import { Login } from "./components/admin/Login";
import RegisterEngine from "./components/admin/RegisterEngine";
import RegisterGroup from "./components/admin/RegisterGroup";
import { Layout } from "./components/Layout/Layout";
import { FormFace } from "./components/Register/FormFace";
import { FormRegister } from "./components/Register/FormRegister";
import { Welcome } from "./components/Welcome";
import { CallUser } from "./models/CallUser";
import { User } from "./models/User";

function App() {
    const [user, setUser] = React.useState<User>({
        id: "",
        tagId: "",
        tagName: "",
        firstname: "",
        lastname: "",
        mail: "",
        favouriteCoffee: "",
        password: "",
        pictures: [],
        avatar: "",
        groups: [],
    });
    const [callUser, setCallUser] = React.useState<CallUser>({
        userId: "",
        credentials: undefined,
        displayName: "",
    });

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Layout setIsLoggedIn={setIsLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/home" element={<Welcome />} />
                        <Route
                            path="/register"
                            element={<FormRegister user={user} setUser={setUser} />}
                        />
                        <Route
                            path="/account"
                            element={
                                <AccountInformation
                                    setIsLoggedIn={setIsLoggedIn}
                                    isLoggedIn={isLoggedIn}
                                />
                            }
                        />
                        <Route
                            path="/register/face"
                            element={<FormFace user={user} setUser={setUser} />}
                        />
                        <Route path="/admin/group" element={<RegisterGroup />} />
                        <Route path="/admin/engine" element={<RegisterEngine />} />
                        <Route
                            path="/admin"
                            element={<AdminHome setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route path="/admin/consult" element={<ConsultGroups />} />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    setIsLoggedIn={setIsLoggedIn}
                                    urlPath=""
                                    sessionVariable="userLoggedIn"
                                />
                            }
                        />

                        <Route path="*" element={<Welcome />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
}
const constraints = {
    audio: false,
    video: {
        width: 640,
        height: 360,
    },
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e) {
        console.log(e);
    }
}

export default App;
