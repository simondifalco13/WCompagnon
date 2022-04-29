import { Grid, styled } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { User } from "../../models/User";
import GroupTable from "./GroupTable";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface CafyGroup {
    id: string;
    name: string;
    engine: string;
}

interface GroupWithMembers {
    id: string;
    name: string;
    engine: string;
    members: User[];
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ConsultGroups() {
    const [groups, setGroups] = useState<Array<GroupWithMembers>>([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/group/allwithmembers")
            .then((response) => response.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <h2>Group</h2>
                </Grid>
                {groups.map((group) => {
                    return (
                        <Grid item xs={6} key={group.id}>
                            <GroupTable group={group} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
