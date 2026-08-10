"use client";

import {useState} from "react";
import toast from "react-hot-toast";


export default function FocusTimer({refreshStats}){
const [title,setTitle] = useState("");
const [minutes,setMinutes] = useState("");


const saveFocus = async()=>{

  await fetch("/api/focus",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
        title,
      minutes:Number(minutes)
    })
  });
setTitle("");
setMinutes("");
  if(refreshStats){
    refreshStats()
  }
 toast.success("Focus session saved 🎯");

};



return (

<div className="
border border-gray-800
rounded-2xl
p-5
space-y-4
">


<h2 className="text-xl text-blue-500 font-semibold">
Add Focus Session
</h2>

<form className="flex   flex-col gap-4">
  <input  placeholder="What did you focus on?"
  className="w-80 border border-gray-600 rounded-lg p-3  text-slate-500" />
  
  <input type="number"
  placeholder="Minutes"
  className="w-80 border border-gray-600 rounded-lg p-3 text-slate-500" />

  <button
    type="button"
    onClick={saveFocus}
    className="w-30 bg-cyan-900  px-5 py-2 rounded-xl hover:bg-cyan-700"
  >
    Save Focus
  </button>
</form>

</div>

)

}