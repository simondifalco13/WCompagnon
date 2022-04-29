import { Button, Grid } from "@mui/material";
import { useState } from "react";

interface InputProps {
    value: string;
    title: string;
    isInputDisabled: boolean;
    setIsInputDisabled: (isInputDisabled: boolean) => void;
    setParentValue: (value: string) => void;
}

export default function EditableInput(props: InputProps) {
    const [inputValue, setInputValue] = useState(props.value);
    const [oldInputValue, setOldInputValue] = useState(props.value);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        props.setParentValue(e.target.value);
    };
    return (
        <>
            <Grid item xs={12} md={12}>
                <label>{props.title} </label>
                <input
                    type="text"
                    placeholder={inputValue}
                    disabled={props.isInputDisabled}
                    value={inputValue}
                    onChange={(e) => {
                        onChangeHandler(e);
                    }}
                />
            </Grid>
            {props.isInputDisabled && (
                <Grid item xs={12} md={12}>
                    <Button
                        variant="outlined"
                        className="button"
                        onClick={() => {
                            setOldInputValue(inputValue);
                            props.setIsInputDisabled(false);
                        }}
                    >
                        Modify
                    </Button>
                </Grid>
            )}
        </>
    );
}
