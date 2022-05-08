import {
    Alert,
    AlertColor,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    styled,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";

interface DataRowProps {
    id: number;
    email: string;
}

interface DataColProps {
    field: string;
    headerName: string;
    width: number;
}

interface DataGridMembers {
    members: string[];
    expanded: boolean;
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

export default function UsersDataGrid(props: DataGridMembers) {
    const [rows, setRows] = useState<Array<DataRowProps>>([]);
    const [columns, setColumns] = useState<Array<DataColProps>>([]);
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor>("success");

    const DeleteUser = () => {
        var mail = userToDelete;
        setOpen(false);
        let i = 0;
        fetch(process.env.REACT_APP_API_BASE_URL + "/user/delete/" + mail, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                setSnackBarContent("User " + { userToDelete } + " deleted successfully");
                setSnackBarSeverity("success");
                setOpenSnackbar(true);
                props.members.splice(props.members.indexOf(mail), 1);
                setRows(
                    props.members.map((member) => {
                        return {
                            id: i++,
                            email: member,
                        };
                    })
                );
            } else {
                setSnackBarContent("Error of deleting, try later.");
                setSnackBarSeverity("error");
                setOpenSnackbar(true);
            }
        });
    };

    const DialogForDeleting = (mail: string) => {
        setUserToDelete(mail);
        setOpen(true);
    };

    const HandleClose = () => {
        setOpen(false);
    };

    const CloseSnackBack = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        let i = 0;
        setRows(
            props.members.map((member) => {
                return {
                    id: i++,
                    email: member,
                };
            })
        );
        setColumns([
            {
                field: "email",
                headerName: "Email",
                width: 300,
            },
            {
                field: "col2",
                headerName: "Editing",
                width: 200,
            },
        ]);
    }, [props.members]);

    return (
        <>
            <Collapse in={props.expanded} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.email}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Collapse>
            <Dialog
                open={open}
                onClose={HandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete user</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this user : {userToDelete} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={HandleClose} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={DeleteUser} autoFocus>
                        Validate
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={CloseSnackBack}>
                <Alert onClose={CloseSnackBack} severity={snackBarSeverity} sx={{ width: "100%" }}>
                    {snackBarContent}
                </Alert>
            </Snackbar>
        </>
    );
}
