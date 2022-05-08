import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/welcome.css";
import ContentCard from "./Cards/ContentCard";
import Presentation from "./Presentation";

interface BasicPresentationProps {
    firstname: String;
    lastname: String;
    mail: String;
    img: String;
    linkedin: String;
    github: String;
    description: String;
}

interface ContentProps {
    imageSrc: string;
    title: string;
    content: string;
    link: string;
}

const Mic: ContentProps = {
    title: "Project",
    content:
        " For our internship the M.I.C gave us a challenge : a coffee machine with facial recognition",
    imageSrc: "./images/mic.jpg",
    link: "https://www.mic-belgique.be/",
};

const Delonghi: ContentProps = {
    title: "Machine",
    content:
        "The coffee machine we used for this project. That's the Delonghi Dynamica Plus ECAM370.95.T ",
    imageSrc: "./images/delonghi.jpg",
    link: "https://www.delonghi.com/fr-be/machine-a-expresso-full-automatique-dinamica-plus-ecam370-95-t/p/ECAM370.95.T",
};

export const Welcome = () => {
    const navigate = useNavigate();
    function handleRegister(): void {
        navigate("/register");
    }

    function handleCafy(): void {
        navigate("/cafy");
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <h2>Welcome to Dark Cafy</h2>
            </Grid>

            <Grid item md={3} xs={12}></Grid>
            <ContentCard
                title={Mic.title}
                content={Mic.content}
                link={Mic.link}
                imageSrc={Mic.imageSrc}
            />
            <ContentCard
                title={Delonghi.title}
                content={Delonghi.content}
                link={Delonghi.link}
                imageSrc={Delonghi.imageSrc}
            />
            <Grid item md={3} xs={12}></Grid>
            <Grid item xs={12} md={12}>
                <h2>About us</h2>
            </Grid>
            <Presentation />
        </Grid>
    );
};
