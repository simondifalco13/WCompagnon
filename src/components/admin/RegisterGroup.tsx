import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../../css/form.css";
import AlertDialog from "../Dialog/AlertDialog";

type Inputs = {
    name:string,
    members:[],
    engine:string,
};

type UserOptions={
    label: string,
    value:string,
}
interface UserForCheckboxes{
    firstname : string,
    lastname:string,
    mail:string
}

interface Engines{
    id:string,
    name:string,
    groupId:string,
}

interface CafyGroup{
    name:string,
    members:string[],
    engine: string;
}

type selectProps={
    options: Array<UserOptions>,
    setOptionsSelected :(option : string) => void;
}

function setOptionsByArray(users:Array<UserForCheckboxes>){
    var usersOptions=Array<UserOptions>();
    for(var i=0;i<users.length;i++){
        var fullname=users[i].firstname+" "+users[i].lastname;
        var mail=users[i].mail;
        var option : UserOptions={value:mail,label:fullname};
        usersOptions.push(option);
    }
    return usersOptions;
}


export default function RegisterGroup() {
    const onSubmit: SubmitHandler<Inputs> = data => Validate(data);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [users,setUsers]=useState<Array<UserForCheckboxes>>([]);
    const [usersOptions,setUserOptions]=useState<Array<UserOptions>>([]);
    const [optionsSelected,setOptionsSelected]=useState<Array<string>>([]);
    const [engines,setEngines]=useState<Array<Engines>>([]);
    const [selectedEngine,setSelectedEngine]=useState("");
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [open,setOpen]=useState(false);
    const[navigateLink,setNavigateLink]=useState("");


    useEffect( () =>{
        fetch(process.env.REACT_APP_API_BASE_URL+'/engine/all')
        .then(response => response.json())
        .then(data => {
            setEngines(data);
        })
    }, [])


    // useEffect(() =>{
    //     fetch(process.env.REACT_APP_API_BASE_URL+'/user/all')
    //     .then(response => response.json())
    //     .then(data => {
    //        setUsers(data);
    //        setUserOptions(setOptionsByArray(data));
    //     })
    // }, [])

    async function Validate(data:Inputs){
        let group : CafyGroup={
            name: data.name,
            members: optionsSelected,
            engine : selectedEngine
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              "Cross-Origin":"*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify(group)
          };
          const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/group', requestOptions);
          const json = await response.json();
          if(json.statusMessage==="success"){
              setContent("Your group has been created ! Enjoy ! ")
              setTitle("Success");
              setNavigateLink("/cafy");
              setOpen(true);
          }else{
            setContent("Your group has not been created ! Sorry , please try Later ")
            setTitle("Error");
            setNavigateLink("/home");
            setOpen(true);
          }
    }


    return(
        <>
            <h2>Create a group</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Group Name </label>
                    <input placeholder="Entreprise..."{...register("name", { required: true })} />
                    {errors.name && <span className="error">This field is required</span>}
                </div>

                {/* <div>
                    <label htmlFor="members">Members</label>
                    <UnstyledSelectsMultiple options={usersOptions} setOptionsSelected={setOptionsSelected} />
                    <br/>
                    {errors.members && <span className="error">This field is required</span>}
                </div>   */}

                <div className="divSelect">
                    <label htmlFor="engine">Engine associated to the group</label>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Engine</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedEngine}
                                required
                                label="Engine"
                                onChange={(e) => setSelectedEngine(e.target.value as string)}
                                key={Math.random() * 100}
                            >

                            {engines.map(element => {
                                return(
                                    <MenuItem value={element.groupId} key={Math.random() * 100}>{element.name}</MenuItem>
                                );
                            })}
                            </Select>
                        </FormControl>
                    </Box>
                    {errors.engine && <span className="error">This field is required</span>}
                </div>



                <input type="submit" value={"Validate"} />
            </form>
            <AlertDialog open={open} setOpen={setOpen} content={content} title={title} navigate={navigateLink}/>
        </>
    );
}
