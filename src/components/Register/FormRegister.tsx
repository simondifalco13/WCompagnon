import { Avatar, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../../css/form.css";
import { User } from "../../models/User";
import UnstyledSelectsMultiple from "../MultiSelect/UnstyledSelectsMultiple";
import UploadFileComponent from "../UploadFile/UploadFileComponent";
import PreferedGroups from "./PreferedGroups";
var sha1 = require("sha-1");

type Inputs = {
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    group: string;
    coffee: string;
};

interface Group {
    id: string;
    name: string;
    engineId: string;
}

interface BasicFormProps {
    user: User;
    setUser: (user: User) => void;
}

export const FormRegister = (props: BasicFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => Validate(data, props.user, props.setUser);
    const [base64, setBase64] = React.useState("");
    const [groups, setGroups] = React.useState<Array<Group>>([]);
    const coffeeOptions = [
        { value: "doppio", label: "Doppio" },
        { value: "coffee", label: "Coffee" },
        { value: "long", label: "Long" },
        { value: "double_espresso", label: "Double espresso" },
        { value: "espresso", label: "Espresso" },
    ];
    const [coffee, setCoffee] = React.useState(coffeeOptions[0].value);
    const [radioButton, setRadioButton] = useState<string>("yes");
    const [groupOptions, setGroupOptions] = React.useState<{ value: string; label: string }[]>();
    const [selectedOption, setSelectedOption] = React.useState<{ value: string; label: string }>();
    const [selectedOptions, setSelectedOptions] = React.useState<Array<string>>([]);
    const [selectedOptionsName, setSelectedOptionsName] = React.useState<Array<string>>([]);
    const [selectedGroups, setSelectedGroups] = React.useState<Array<string>>([]);

    function Validate(data: Inputs, user: User, setUser: (u: User) => void) {
        user.favouriteCoffee = coffee;
        user.firstname = data.firstname;
        user.lastname = "";
        if (selectedOption != null) {
            user.groups = selectedOptions;
        }
        user.mail = data.mail;
        user.avatar = base64;
        user.password = sha1(data.password);
        setUser(props.user);
        navigate("/register/face");
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + "/group/all")
            .then((response) => response.json())
            .then((data) => {
                setGroups(data);
            });
    }, []);

    //put all group in groups
    useEffect(() => {
        let groupArray = groups.map((group) => ({
            value: group.id,
            label: group.name,
        }));
        setGroupOptions(groupArray.sort((a, b) => a.label.localeCompare(b.label)));
        setSelectedOption(groupArray[0]);
    }, [groups]);

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
        [selectedOptions, setSelectedOptions]
    );

    //function that returns group's name by id
    const getGroupName = (id: string) => {
        let groupName = "";
        groups.forEach((group) => {
            if (group.id === id) {
                groupName = group.name;
            }
        });
        return groupName;
    };

    //function that returns an array of string group's name by array of string group's id
    const getGroupNames = (ids: Array<string>) => {
        let groupNames = new Array<string>();
        ids.forEach((id) => {
            groupNames.push(getGroupName(id));
        });
        return groupNames;
    };

    const handleSelectOptions = useCallback(
        (e: any) => {
            var newArray = e as Array<string>;
            compareArrays(newArray);
        },
        [compareArrays]
    );

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Profile picture </label>
                    {base64 !== "" && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <p>
                                <b>
                                    <i>Preview</i>
                                </b>
                            </p>
                            <Avatar
                                src={base64}
                                sx={{ width: 120, height: 120, marginBottom: 2 }}
                            />
                        </div>
                    )}
                    <UploadFileComponent setBase64={setBase64} />
                </div>
                <div>
                    <label htmlFor="firstname">Nickname</label>
                    <input placeholder="John" {...register("firstname", { required: true })} />
                    {errors.firstname && <span className="error">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="mail">Mail </label>
                    <input
                        placeholder="example.e@host.com"
                        {...register("mail", { required: true })}
                    />
                    {errors.mail && <span className="error">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register("password", { required: true })} />
                    {errors.password && <span className="error">This field is required</span>}
                </div>
                <div>
                    <FormLabel id="group-label">Would like to belong to a group ?</FormLabel>
                    <RadioGroup
                        aria-labelledby="group-label"
                        defaultValue="yes"
                        name="radio-buttons-group"
                        row
                    >
                        <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                            onChange={() => {
                                setRadioButton("yes");
                                if (groupOptions !== undefined) setSelectedOption(groupOptions[0]);
                            }}
                        />
                        <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                            onChange={() => {
                                setRadioButton("no");
                                setSelectedOption({ value: "", label: "" });
                                setSelectedOptions([]);
                            }}
                        />
                    </RadioGroup>
                    {radioButton === "yes" && groupOptions !== undefined && (
                        <UnstyledSelectsMultiple
                            options={groupOptions}
                            setOptionsSelected={handleSelectOptions}
                        />
                    )}
                </div>
                {radioButton === "yes" && groupOptions !== undefined && selectedOptions.length > 0 && (
                    <div>
                        <label> Your prefered Group : </label>
                        <PreferedGroups groups={selectedOptionsName} />
                    </div>
                )}
                <div className="divSelect">
                    <FormLabel>Favourite coffee</FormLabel>
                    <Select
                        options={coffeeOptions}
                        defaultValue={coffeeOptions[0]}
                        onChange={(e) => setCoffee(e?.value as string)}
                    />
                </div>
                <input type="submit" value={"Validate"} />
            </form>
        </>
    );
};
