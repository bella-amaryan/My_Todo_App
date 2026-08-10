"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, Save, ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";


export default function AccountSettings(){

  const router = useRouter();


  const [user, setUser] = useState({
    name:"",
    username:"",
    bio:"",
    avatar:"",
    email:""
  });


  const [loading, setLoading] = useState(true);



  // Get user data

  useEffect(()=>{

    async function getUser(){

      try{

        const res = await fetch("/api/account");

        const data = await res.json();

        setUser(data);


      }catch(error){

        console.log(error);
        toast.error("Failed to load account");

      }finally{

        setLoading(false);

      }

    }


    getUser();


  },[]);




  // Input changes

  const handleChange = (e)=>{

    setUser({

      ...user,

      [e.target.name]: e.target.value

    });

  };




  // Image upload

  const handleImage = (e)=>{

    const file = e.target.files?.[0];


    if(!file) return;



    const reader = new FileReader();



    reader.onloadend = ()=>{

      setUser({

        ...user,

        avatar: reader.result

      });

    };


    reader.readAsDataURL(file);


  };





  // Remove avatar

  const removeAvatar = async ()=>{

    setUser(prev=>({
      ...prev,
      avatar:""

  }));
  

// Save account

try{

  const res = await fetch("/api/account",{

        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          avatar:""
        })

      });
      
      if(!res.ok){
      throw new Error("Failed to remove avatar")
      }

       toast.success("Photo removed");

      //update navbar
        window.dispatchEvent(
            new Event("profileUpdated"))
        }catch(error){
          console.log(error);
          toast.error("Failed to remove photo")
        }

      }

      const saveAccount = async () => {

  try {

    const res = await fetch("/api/account", {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(user)

    });

    if (!res.ok) {
      throw new Error("Failed to update account");
    }

    toast.success("Profile updated");

    window.dispatchEvent(
      new Event("profileUpdated")
    );

  } catch (error) {

    console.log(error);

    toast.error("Failed to update account");

  }

};

if(loading){

    return (

      <div className="min-h-screen bg-slate-950 text-white p-6">

        Loading...

      </div>

    )

  }





return (

<div className="
min-h-screen
p-6
text-white
">


<div className="
max-w-3xl
mx-auto
">



{/* Header */}

<div className="
flex
items-center
gap-4
mb-8
">


<button

onClick={()=>router.push("/settings")}

 className="
    group
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    border
    border-slate-700
    text-slate-400
    transition-all
    hover:-translate-x-1
    hover:bg-purple-500/20
    hover:text-purple-400
"

>

<ArrowLeft size={20}/>

</button>



<div>

<h1 className="
text-3xl
font-bold
text-purple-900
">

Account Settings

</h1>


<p className="
text-slate-500
text-sm-10
mt-1
">

Manage your personal information

</p>


</div>


</div>






{/* Card */}

<div className="

border
border-slate-800
rounded-3xl
p-8
space-y-6
">





{/* Avatar */}


<div className="
flex
items-center
gap-6
">


<div className="
relative
">



<label className="cursor-pointer">


<img

src={user.avatar || "/images/profile.png"}

alt="profile"

className="
h-28
w-28
rounded-full
object-cover
border-4
border-purple-500/30
"

/>


<input

type="file"

accept="image/*"

className="hidden"

onChange={handleImage}

/>


</label>





<label

className="
absolute
bottom-0
right-0
z-10
bg-purple-600
h-12
w-12
rounded-full
flex
items-center
justify-center
cursor-pointer
hover:bg-purple-700
"

>


<Camera size={22}/>


<input

type="file"

accept="image/*"

capture="user"

className="hidden"

onChange={handleImage}

/>


</label>



</div>

<div>
<h2 className="
text-xl
text-purple-900
font-semibold
">

{user.name || "Your Name"}

</h2>


<p className="
text-slate-400
">

Update your profile photo

</p>


<button
type="button"

onClick={removeAvatar}

className="
flex
items-center
gap-1
mt-2
text-sm
text-red-400
hover:text-red-300
"

>

<Trash2 size={14}/>

Remove photo

</button>


</div>



</div>








{/* Name */}

<div>

<label className="text-sm text-purple-400">

Name

</label>


<input

name="name"

value={user.name}

onChange={handleChange}

className="
mt-2
w-full
text-slate-400
rounded-xl
border
border-slate-700
px-4
py-3
outline-none
focus:border-purple-500
"

/>

</div>






{/* Username */}

<div>

<label className="text-sm text-purple-400">

Username

</label>


<input

name="username"

value={user.username}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl

border
border-slate-700
px-4
py-3
outline-none
focus:border-purple-500
text-slate-400
"

/>

</div>






{/* Email */}

<div>

<label className="text-sm text-purple-400">

Email

</label>


<input

value={user.email}

readOnly

className="
mt-2
w-full
rounded-xl

border
border-slate-700
px-4
py-3
text-slate-400
"

/>

</div>







{/* Bio */}

<div>

<label className="text-sm text-purple-400">

Bio

</label>


<textarea

name="bio"

value={user.bio}

onChange={handleChange}

rows="4"

className="
mt-2
w-full
rounded-xl
text-slate-400
border
border-slate-700
px-4
py-3
outline-none
focus:border-purple-500
resize-none
"

/>

</div>


{/* Save */}

<button

onClick={saveAccount}

className="
flex
items-center
justify-center
gap-2
w-40
rounded-xl
bg-purple-600
py-3
font-semibold
hover:bg-purple-700
transition
"

>

<Save size={20}/>

Save Changes

</button>




</div>


</div>


</div>


)

}