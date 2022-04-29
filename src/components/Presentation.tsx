import { Grid } from "@mui/material";
import BasicPresentation from "../models/BasicPresentation";
import PresentationCard from "./Cards/PresentationCard";

const Simon:BasicPresentation={
    firstname:"Simon",
    lastname:"Di falco",
    mail: "simondifalco.d@gmail.com",
    img: "./images/pdp.jpg",
    linkedin:"https://be.linkedin.com/in/simon-di-falco-2b108519b",
    description:"Student at HEPH Condorcet Charleroi. Currently in bachelor last year.",
    github: "https://github.com/simondifalco13"
}

const Sarah:BasicPresentation={
    firstname:"Sarah",
    lastname:"Coquereau",
    mail: "saraharcenciel@gmail.com",
    img: "./images/girl.jpg",
    linkedin:"https://www.linkedin.com/in/sarah-coquereau-2913971b4/",
    description:"Student at HEPH Condorcet Mons. Currently in bachelor last year.",
    github: "https://github.com/sara985"
}
const Presentation=()=>{
    return(
    <>
        <Grid item md={3} xs={12}></Grid>
        <Grid item xs={12} md={3}>
            <PresentationCard user={Sarah} />
        </Grid>
        <Grid item xs={12} md={3}>
            <PresentationCard user={Simon} />
        </Grid>
        <Grid item md={3} xs={12}></Grid>
    </>
    );
}

export default Presentation;