"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function NotificationSettings(){

  const router = useRouter();


  const [settings,setSettings] = useState({

    enabled:true,
    dailyReminder:true,
    reminderTime:"09:00",
    dueToday:true,
    overdueTasks:true,
    weeklySummary:false,
    sound:true

  });



  useEffect(()=>{

    async function getSettings(){

      const res = await fetch("/api/account");

      const data = await res.json();


      if(data.notifications){

        setSettings(data.notifications);

      }

    }


    getSettings();


  },[]);




  const handleChange=(e)=>{

    const {name,checked,value,type}=e.target;


    setSettings({

      ...settings,

      [name]:
        type==="checkbox"
        ? checked
        : value

    });

  };




  const saveSettings=async()=>{


    const res = await fetch("/api/account",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },


      body:JSON.stringify({

        notifications:settings

      })

    });



    if(res.ok){

      toast.success("Notification settings saved");

    }


  };




return (

<div className="
min-h-screen

text-white
p-6
">


<div className="max-w-3xl mx-auto">



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
text-purple-900
font-bold
flex
items-center
gap-3
">

<Bell className="text-purple-500"/>

Notifications

</h1>


<p className="
text-slate-500
mt-1
">

Manage your reminders and alerts

</p>


</div>


</div>






<div className="
text-purple-900
border
border-slate-800
rounded-3xl
p-8
space-y-6
">





<SettingItem
title="Enable notifications"
description="Receive productivity alerts"
>

<input

type="checkbox"
name="enabled"
checked={settings.enabled}
onChange={handleChange}

/>


</SettingItem>






<SettingItem

title="Daily reminder"

description="Remind me about my tasks"

>

<input

type="checkbox"

name="dailyReminder"

checked={settings.dailyReminder}

onChange={handleChange}

/>

</SettingItem>


<div className="flex items-center gap-4 ">

<label className="text-purple-900  ">

Reminder time

</label>


<input

type="time"

name="reminderTime"

value={settings.reminderTime}

onChange={handleChange}

className="
mt-2
w-40
bg-slate-300
border
border-slate-700
rounded-xl
px-4
py-3
mb-3
 text-black
    outline-none
    focus:border-purple-500
"

/>

</div>


<SettingItem
title="Tasks due today"
description="Notify about today's tasks"
>

<input

type="checkbox"

name="dueToday"

checked={settings.dueToday}

onChange={handleChange}

/>

</SettingItem>







<SettingItem
title="Overdue tasks"
description="Warn when tasks are late"
>

<input

type="checkbox"

name="overdueTasks"

checked={settings.overdueTasks}

onChange={handleChange}

/>

</SettingItem>







<SettingItem
title="Weekly summary"
description="Productivity report every week"
>

<input

type="checkbox"

name="weeklySummary"

checked={settings.weeklySummary}

onChange={handleChange}

/>

</SettingItem>







<SettingItem
title="Sound"
description="Play notification sound"
>

<input

type="checkbox"

name="sound"

checked={settings.sound}

onChange={handleChange}

/>

</SettingItem>






<button

onClick={saveSettings}

className="
w-40
flex
items-center
justify-center
gap-2
bg-purple-400
hover:bg-purple-700
py-3
rounded-xl
font-semibold
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





function SettingItem({
title,
description,
children
}){


return (

<div className="
flex
items-center
justify-between
border-b
border-slate-800
pb-4
">

<div>

<h3 className="font-semibold">

{title}

</h3>


<p className="text-sm text-slate-400">

{description}

</p>


</div>


{children}


</div>

)

}
