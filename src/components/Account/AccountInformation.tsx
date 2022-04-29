import { Avatar, Button, Grid, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "../../css/account.css";
import { User } from "../../models/User";
import { Login } from "../admin/Login";
import AlertDialog from "../Dialog/AlertDialog";
import DeleteItemDialog from "../Dialog/DeleteItemDialog";
import UnstyledSelectsMultiple from "../MultiSelect/UnstyledSelectsMultiple";
import PreferedGroups from "../Register/PreferedGroups";
import UploadFileComponent from "../UploadFile/UploadFileComponent";

interface UserProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface Group {
    id: string;
    name: string;
    engineId: string;
}

export default function AccountInformation(props: UserProps) {
    const [user, setUser] = useState<User>();
    const [isInputDisabled, setIsInputDisabled] = useState(true);
    const [inputFavouriteCoffee, setInputFavouriteCoffee] = useState<string>("");
    const [oldFavouriteCoffee, setOldFavouriteCoffee] = useState<any>();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [navigateLink, setNavigateLink] = useState("");
    const [userRecupered, setUserRecupered] = useState(false);
    const [groups, setGroups] = useState<Array<Group>>([]);
    const [groupOptions, setGroupOptions] = useState<{ value: string; label: string }[]>();
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string }>();
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const [selectedOptionsName, setSelectedOptionsName] = useState<Array<string>>([]);
    const [dialogState, setDialogState] = useState("");
    const [oldAvatar, setOldAvatar] = useState<string>("");

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/group/all")
            .then((response) => response.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

    useEffect(() => {
        let groupArray = groups.map((group) => ({
            value: group.id,
            label: group.name,
        }));
        setGroupOptions(groupArray.sort((a, b) => a.label.localeCompare(b.label)));
        setSelectedOption(groupArray[0]);
    }, [groups]);

    //function that returns group's name by id
    const getGroupName = useCallback(
        (id: string) => {
            let groupName = "";
            groups.forEach((group) => {
                if (group.id === id) {
                    groupName = group.name;
                }
            });
            return groupName;
        },
        [groups]
    );

    //function that returns an array of string group's name by array of string group's id
    const getGroupNames = useCallback(
        (ids: Array<string>) => {
            let groupNames = new Array<string>();
            ids.forEach((id) => {
                groupNames.push(getGroupName(id));
            });
            return groupNames;
        },
        [getGroupName]
    );

    const getUserFromSessionStorage: any = useCallback(() => {
        if (window.sessionStorage.getItem("userLoggedIn")) {
            var user = window.sessionStorage.getItem("user");
            if (user !== null) {
                setUser(JSON.parse(user));
                setInputFavouriteCoffee(JSON.parse(user).favouriteCoffee);
                setUserRecupered(true);
                var groupsName = getGroupNames(JSON.parse(user).groups);
                setSelectedOptionsName(groupsName);
            }
        }
    }, [groups, getGroupNames, getGroupNames]);

    useEffect(() => {
        if (
            window.sessionStorage.getItem("userLoggedIn") === "true" &&
            user === undefined &&
            userRecupered === false &&
            groups.length > 0
        ) {
            getUserFromSessionStorage();
        }
    }, [
        groups,
        props.isLoggedIn,
        userRecupered,
        getUserFromSessionStorage,
        user,
        selectedOptionsName,
    ]);

    const compareArrays = useCallback(
        (newArray: Array<string>) => {
            const options = [...selectedOptions];
            if (options.length !== newArray.length) {
                if (newArray.length === 0) {
                    options.splice(0, options.length);
                }
                for (let i = 0; i < newArray.length; i++) {
                    if (options.length > newArray.length) {
                        if (options.length > 0) {
                            for (let j = 0; j < options.length; j++) {
                                if (!newArray.includes(options[j])) {
                                    options.splice(j, 1);
                                }
                            }
                        } else {
                            options.push(newArray[i]);
                        }
                    } else {
                        for (let j = 0; j < newArray.length; j++) {
                            if (!options.includes(newArray[j])) {
                                options.push(newArray[j]);
                            }
                        }
                    }
                }
                var names = getGroupNames(options);
                setSelectedOptionsName(names);
                setSelectedOptions(() => options);
            }
        },
        [selectedOptions, setSelectedOptions, getGroupNames]
    );

    const handleSelectOptions = useCallback(
        (e: any) => {
            var newArray = e as Array<string>;
            compareArrays(newArray);
        },
        [compareArrays]
    );

    const compareUser = (): boolean => {
        if (user !== null && user !== undefined) {
            if (user.favouriteCoffee !== inputFavouriteCoffee) {
                return true;
            }
        }
        return false;
    };

    //callback function that returns a boolean
    const hasUserChanged = useCallback(() => {
        if (user !== null && user !== undefined) {
            if (user.favouriteCoffee !== inputFavouriteCoffee) {
                return true;
            }
            if (user.groups !== selectedOptions) {
                return true;
            }
            if (user.avatar !== oldAvatar) {
                return true;
            }
        }
        return false;
    }, [user, inputFavouriteCoffee, selectedOptions, oldAvatar]);

    const validationUpdating = useCallback(async () => {
        var userChanged = hasUserChanged();
        if (userChanged && user !== null && user !== undefined) {
            const updatedUser = { ...user };
            updatedUser.favouriteCoffee = inputFavouriteCoffee;
            updatedUser.groups = selectedOptions;
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            };
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URL + "/user/" + encodeURIComponent(updatedUser.id),
                requestOptions
            );
            try {
                const data = await response.json();
                if (data == true) {
                    window.sessionStorage.setItem("user", JSON.stringify(updatedUser));
                    setNavigateLink("/account");
                    setTitle("Updating account");
                    setContent("Your account has been updated successfully");
                    setOpen(true);
                    setUser(updatedUser);
                    setIsInputDisabled(true);
                    setSelectedOptionsName(getGroupNames(updatedUser.groups));
                }
                if (data == false) {
                    setNavigateLink("/account");
                    setTitle("Updating account");
                    setContent("You didn't modify your account, so it has not been updated");
                    setOpen(true);
                    setIsInputDisabled(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setNavigateLink("");
            setTitle("You have not changed anything");
            setContent("Nothing will be updated");
            setOpen(true);
            setIsInputDisabled(true);
        }
    }, [inputFavouriteCoffee, user, hasUserChanged, selectedOptions, getGroupNames]);

    const handleValidate = useCallback(async () => {
        if (user !== null && user !== undefined) {
            await validationUpdating();
        }
    }, [user, validationUpdating]);

    const handleCancel = () => {
        setInputFavouriteCoffee(oldFavouriteCoffee);
        if (user !== null && user !== undefined) {
            var groupsName = getGroupNames([...user.groups]);
            setSelectedOptionsName(groupsName);
        }
        setIsInputDisabled(true);
    };

    const handleModification = () => {
        setDialogState("modification");
        if (user !== undefined) {
            setOldAvatar(user.avatar);
        }
        setOldFavouriteCoffee(inputFavouriteCoffee);
        setIsInputDisabled(false);
        if (user !== null && user !== undefined) {
            var groupsName = getGroupNames([...user.groups]);
            setSelectedOptionsName(groupsName);
        }
    };

    const removeUnderscore = (str: string) => {
        return str.replace(/_/g, " ");
    };

    const deleteAccount = async () => {
        setDialogState("modification");
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (user !== null && user !== undefined) {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URL + "/user/" + encodeURIComponent(user.id),
                requestOptions
            );
            try {
                const data = await response.json();
                if (data == true) {
                    window.sessionStorage.removeItem("userLoggedIn");
                    window.sessionStorage.removeItem("user");
                    setNavigateLink("/home");
                    setTitle("Deleting account");
                    setContent("Your account has been deleted successfully");
                    setOpen(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteAccount = async () => {
        setDialogState("delete");
        setNavigateLink("");
        setTitle("Are you sure ?");
        setContent("Click on 'yes' to delete your account");
        setOpen(true);
    };

    const setAvatar = (e: any) => {
        if (user !== undefined) {
            var updatedUser = { ...user };
            updatedUser.avatar = e;
            setUser(updatedUser);
        }
    };

    return (
        <>
            {!window.sessionStorage.getItem("userLoggedIn") && (
                <Login
                    setIsLoggedIn={props.setIsLoggedIn}
                    urlPath="/user/login"
                    sessionVariable="userLoggedIn"
                />
            )}
            {window.sessionStorage.getItem("userLoggedIn") === "true" &&
                window.sessionStorage.getItem("user") &&
                userRecupered &&
                user !== undefined && (
                    <Grid container justifyContent="center">
                        <form className="card">
                            <Grid item xs={12} md={12}>
                                <h1 className="title">Account information</h1>
                            </Grid>
                            {user.avatar !== "" && (
                                <Grid item xs={12} md={12}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Avatar
                                            src={user.avatar}
                                            sx={{ width: 120, height: 120, marginBottom: 2 }}
                                        />
                                    </div>
                                </Grid>
                            )}
                            {!isInputDisabled && <UploadFileComponent setBase64={setAvatar} />}
                            <Grid item xs={12} md={12}>
                                <span>
                                    <label>Name : </label> {user.firstname} {user.lastname}
                                </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span>
                                    <label>Mail : </label> {user.mail}
                                </span>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <label>Coffee : {removeUnderscore(inputFavouriteCoffee)}</label>
                                {!isInputDisabled && (
                                    <div style={{ marginTop: "30px" }}>
                                        <Select
                                            id="demo-simple-select"
                                            value={inputFavouriteCoffee}
                                            disabled={isInputDisabled}
                                            onChange={(e) =>
                                                setInputFavouriteCoffee(e.target.value as string)
                                            }
                                        >
                                            <MenuItem value={"doppio"}>Doppio</MenuItem>
                                            <MenuItem value={"coffee"}>Coffee (simple)</MenuItem>
                                            <MenuItem value={"long"}>Long</MenuItem>
                                            <MenuItem value={"double_espresso"}>
                                                Double Espresso
                                            </MenuItem>
                                            <MenuItem value={"espresso"}>Espresso</MenuItem>
                                        </Select>
                                    </div>
                                )}
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <label> Your favourite groups : </label>
                                {selectedOptionsName.length > 0 && (
                                    <PreferedGroups groups={selectedOptionsName} />
                                )}
                                {selectedOptionsName.length === 0 && (
                                    <p>
                                        You don't have any group to call : click on "modify" to add
                                        group
                                    </p>
                                )}
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {groupOptions !== undefined && !isInputDisabled && (
                                    <div style={{ marginTop: "30px" }}>
                                        <label>Groups : </label>
                                        <UnstyledSelectsMultiple
                                            options={groupOptions}
                                            setOptionsSelected={handleSelectOptions}
                                        />
                                    </div>
                                )}
                            </Grid>
                            {isInputDisabled && (
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="outlined"
                                        className="button"
                                        onClick={() => {
                                            handleModification();
                                        }}
                                    >
                                        Modify
                                    </Button>
                                </Grid>
                            )}
                            {!isInputDisabled && (
                                <Grid item xs={12} md={12}>
                                    <div style={{ margin: "10px" }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            className="button_validation"
                                            onClick={() => {
                                                handleValidate();
                                            }}
                                        >
                                            Validate
                                        </Button>
                                        <Button
                                            className="button_validation"
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                handleCancel();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Grid>
                            )}
                        </form>
                        <Grid item xs={12} md={12}>
                            <div className="div_delete">
                                <Button
                                    variant="contained"
                                    color="error"
                                    className="button_delete"
                                    onClick={() => {
                                        handleDeleteAccount();
                                    }}
                                >
                                    Delete account
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                )}

            {dialogState === "modification" && (
                <AlertDialog
                    open={open}
                    setOpen={setOpen}
                    content={content}
                    title={title}
                    navigate={navigateLink}
                />
            )}
            {dialogState === "delete" && (
                <DeleteItemDialog
                    open={open}
                    setOpen={setOpen}
                    content={content}
                    title={title}
                    navigate={navigateLink}
                    parentHandleValidate={deleteAccount}
                />
            )}
        </>
    );
}
