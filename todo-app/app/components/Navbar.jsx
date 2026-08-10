"use client";

import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./Logout";
import NotificationBell from "./NotificationBell";
import { useState, useEffect } from "react";


export default function Navbar() {

  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");



  // Load user
  useEffect(() => {


    const fetchUser = async () => {

      try {

        const res = await fetch("/api/auth/me");

        const data = await res.json();

        setUser(data.user);


      } catch(error) {

        console.log(error);

      }

    };

fetchUser();

// refresh navbar after profile update
    window.addEventListener(
      "profileUpdated",
      fetchUser
    );


    return () => {

      window.removeEventListener(
        "profileUpdated",
        fetchUser
      );

    };


  }, []);





  // Upload avatar

  const handleImageChange = (e)=>{


    const file = e.target.files?.[0];


    if(!file) return;



    const reader = new FileReader();



    reader.onloadend = async()=>{


      const avatar = reader.result;



      // update UI immediately

      setUser((prev)=>({

        ...prev,

        avatar

      }));




      try{


        const res = await fetch("/api/account",{


          method:"PUT",


          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            avatar

          })


        });



        if(!res.ok){

          throw new Error("Avatar update failed");

        }




        // tell Navbar and other components

        window.dispatchEvent(
          new Event("profileUpdated")
        );



      }catch(error){

        console.log(error);

      }


    };



    reader.readAsDataURL(file);


  };






  // Greeting

  useEffect(()=>{


    const hour = new Date().getHours();


    if(hour < 12){

      setGreeting("Good morning");

    }
    else if(hour < 18){

      setGreeting("Good afternoon");

    }
    else{

      setGreeting("Good evening");

    }


  },[]);





  const userName = user?.name || "Guest";

  const avatar = user?.avatar || "/images/profile.png";





  return (

    <header className="
      border-b 
      border-white/10 
      px-6 
      py-5 
      backdrop-blur-xl
    ">


      <div className="
        flex 
        flex-col 
        gap-6 
        lg:flex-row 
        lg:items-center 
        lg:justify-between
      ">



        {/* LEFT */}

        <div>


          <h1 className="
            mt-3 
            text-3xl 
            font-semibold 
            text-slate-600
          ">

            {greeting}, {userName} 👋

          </h1>



          <p className="
            mt-2 
            text-slate-400
          ">

            Stay focused and make today count.

          </p>


        </div>






        {/* RIGHT */}

        <div className="
          flex 
          items-center 
          gap-4
        ">



          {/* Avatar */}

          <label className="cursor-pointer">


            <input

              type="file"

              accept="image/*"

              onChange={handleImageChange}

              className="hidden"

            />



            <div className="
              h-12 
              w-12 
              overflow-hidden 
              rounded-full
            ">


              <img

                src={avatar}

                alt="Profile"

                className="
                  h-full 
                  w-full 
                  object-cover
                "

              />


            </div>


          </label>


          <NotificationBell />  

          <ThemeToggle />

          <LogoutButton />


        </div>


      </div>


    </header>

  );

}