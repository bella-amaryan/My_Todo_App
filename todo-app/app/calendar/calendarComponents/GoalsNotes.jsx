"use client"
import{useState, useEffect} from"react"

export default function GoalsNotes(){
    const [goals, setGoals] = useState("")
    const [notes, setNotes] = useState("")
    const[state, setState]=useState("")

    //Load data

    useEffect(()=>{
        async function loadData(){
            const res = await fetch("/api/goals");
            const data = await res.json()
            setGoals(data.goals ||"")
            setNotes(data.notes || "")
        }
        loadData();
    },[])

    //auto save
    useEffect(()=>{
        const timer = setTimeout(async()=>{
            setState("Saving...");
            await fetch("/api/goals",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    goals,
                    notes
            })
            });

            setState("Saved ✓")

            setTimeout(()=>{
                setState("")
            },200)
        },1000)

        return ()=>
            clearTimeout(timer)
        
    },[goals,notes])

return (

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">


<div className="bg-white  rounded-lg shadow-lg overflow-hidden">

<div className="bg-green-600 text-white p-4">

<h3 className="font-bold">
MY GOALS
</h3>

</div>


<textarea
 
 value={goals}
 onChange={(e)=>setGoals(e.target.value)}

className="
w-full
p-4
min-h-40
resize-none
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="Write your goals..."

/>


</div>


<div className="bg-white rounded-lg shadow-lg overflow-hidden">


<div className="bg-green-600 text-white p-4">

<h3 className="font-bold">
NOTES & REMINDERS
</h3>

</div>


<textarea
value={notes}
onChange={(e)=>setNotes(e.target.value)}

className="
w-full
p-4
min-h-40
resize-none
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="Write your notes..."

/>


</div>



</div>

)

}