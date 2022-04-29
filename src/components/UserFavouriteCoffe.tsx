import { Stack,Avatar } from "@mui/material";
import React from "react";

interface UserProps{
    fullname:string;
    coffee:string;
    image:string;
}

export default function UserFavouritCoffee(props:UserProps){
    return(
        <>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{alignItems:"center",marginTop:"5px"}}>
            {props.image!=="" &&
              
              <Avatar src={props.image}/>
              //<Avatar src={`data:image/jpeg;base64,${props.image}`}/>
              
            }
            {
              props.image=="" && 
              <Avatar>{props.fullname[0]}</Avatar>
            }
            <p>
              {props.fullname} favourite coffee is the <b>{props.coffee}</b>
            </p>
          </Stack>
        </>
    );
}