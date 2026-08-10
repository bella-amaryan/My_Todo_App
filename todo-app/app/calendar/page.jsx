"use client";

import { useState, useEffect } from "react";
import "./calendar.css";
import { useRouter } from "next/navigation";
import CalendarHeader from "./calendarComponents/CalendarHeader";
import CalendarGrid from "./calendarComponents/CalendarGrid";
import EventList from "./calendarComponents/EventList";
import AddEventForm from "./calendarComponents/AddEventForm";
import GoalsNotes from "./calendarComponents/GoalsNotes";
import { ArrowLeft } from "lucide-react";




export default function CalendarPage() {
  const router = useRouter()

  const [currentDate,setCurrentDate] = useState(new Date());

  const [events,setEvents] = useState([]);

  const [selectedDate,setSelectedDate] = useState(new Date());



  // Load events from MongoDB
  useEffect(()=>{

    async function loadEvents(){

      try{

        const res = await fetch("/api/events",{
          credentials:"include"
        });


        const data = await res.json();


        setEvents(data);


      }catch(error){

        console.log(error);

      }

    }


    loadEvents();


  },[]);



  return (

    <div className="min-h-screen  from-gray-50 to-gray-100 p-8">
      
      <button
        onClick={() => router.push("/dashboard")}
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
        <ArrowLeft
        size={20}/>

      </button>

<div className="max-w-7xl mx-auto">

        <CalendarHeader

          currentDate={currentDate}

          setCurrentDate={setCurrentDate}

        />



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          <div className="lg:col-span-2">


            <CalendarGrid

              currentDate={currentDate}

              selectedDate={selectedDate}

              setSelectedDate={setSelectedDate}

              events={events}

            />


          </div>



          <div>


            <EventList

              events={events}
               setEvents={setEvents}

            />



            <AddEventForm

              selectedDate={selectedDate}

              setEvents={setEvents}

            />


          </div>


        </div>



        <GoalsNotes/>


      </div>


    </div>

  );

}