import { Stack } from "@fluentui/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { GroupWithMembers } from "../../models/GroupWithMembers";
import UsersDataGrid from "./UsersDataGrid";

interface CafyGroup {
    id: string;
    name: string;
    members: string[];
    engine: string;
}

interface GroupProps {
    group: GroupWithMembers;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
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

export default function GroupTable(props: GroupProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [membersEmail, setMembersEmail] = useState<string[]>([]);

    useEffect(() => {
        setMembersEmail(props.group.members.map((member) =>
            member.mail
        ));
    }, []);

    const groupStyle = {
        root: {
            borderRadius: "4px",
            border: "2px solid #e2e2e1",
        },
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <Stack styles={groupStyle}>
                <h3>
                    {props.group.group.name}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </h3>
            </Stack>
            <div style={{ height: 400 }}>
                <UsersDataGrid members={membersEmail} expanded={expanded} />
            </div>
        </>
    );
}
