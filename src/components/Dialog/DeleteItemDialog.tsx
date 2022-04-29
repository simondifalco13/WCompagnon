import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface DialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    content: string;
    title: string;
    navigate: string;
    //parentHandleClose: () => void;
    parentHandleValidate: () => void;
}

export default function DeleteItemDialog(props: DialogProps) {
    const navigate = useNavigate();

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
        //props.parentHandleClose();
        if (props.navigate !== "") navigate(props.navigate);
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={() => props.setOpen(false)} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={props.parentHandleValidate} autoFocus>
                        Validate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
