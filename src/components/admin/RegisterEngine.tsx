import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ResponsiveAppBar from "../Layout/ResponsiveAppBar";
import "../../css/form.css";
import { useNavigate } from "react-router-dom";
import { v1 as generateGUID } from 'uuid';
import AlertDialog from "../Dialog/AlertDialog";

type Inputs = {
    name:string,
 };



interface Engines{
    name:string,
    groupId:string,
}



export default function RegisterEngine() {
    const onSubmit: SubmitHandler<Inputs> = data => Validate(data);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [open,setOpen]=useState(false);
    const[navigateLink,setNavigateLink]=useState("");


    
    async function Validate(data:Inputs){
        let guuid=generateGUID();
        let engine:Engines={
            name:data.name,
            groupId:guuid
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              "Cross-Origin":"*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify(engine)
          };
          const response = await fetch(process.env.REACT_APP_API_BASE_URL+'/engine', requestOptions);
          const json = await response.json();
          console.log(json);
          if(json.statusMessage==="success"){
            setContent("Your engine has been created ! Enjoy ! ")
            setTitle("Success");
            setNavigateLink("/cafy");
            setOpen(true);
          }else{
            setContent("Your engine has not been created ! Sorry , please try Later ")
            setTitle("Error");
            setNavigateLink("/home");
            setOpen(true);
          }
    }


    return(
        <>
            <h2>Create an engine</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Engine Name/Place</label>
                    <input placeholder="Entreprise engine..."{...register("name", { required: true })} />
                    {errors.name && <span className="error">This field is required</span>}
                </div>  
                <input type="submit" value={"Validate"} />
            </form>
            <AlertDialog open={open} setOpen={setOpen} content={content} title={title} navigate={navigateLink}/>
        </>
    );
}
