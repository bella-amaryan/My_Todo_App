"use client";

import { useState } from "react";


export default function AddEventForm({
  selectedDate,
  setEvents
}) {


  const [title, setTitle] = useState("");



  const formattedDate = selectedDate.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );




  async function handleAddEvent() {


    if (!title.trim()) {
      return;
    }



    try {


      const res = await fetch("/api/events", {

        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json"
        },


        body: JSON.stringify({

          title,

          description: "",

          date: selectedDate

        })

      });



      const data = await res.json();



      if (res.ok) {


        setEvents((prev) => [
          ...prev,
          data
        ]);


        setTitle("");

      } else {

        console.log(data.message);

      }



    } catch (error) {

      console.log(
        "Add event error:",
        error
      );

    }


  }





  function handleKeyDown(e) {


    if (e.key === "Enter") {

      e.preventDefault();

      handleAddEvent();

    }

  }





  return (

    <div
      className="
      border-t
      border-gray-200
      p-4
      bg-gray-50
      "
    >



      {/* Selected date message */}

      <p
        className="
        text-sm
        text-gray-600
        mb-3
        "
      >

        Select date by clicking on the calendar:<br/>

        <span
          className="
          ml-1
          font-semibold
          text-blue-600
          "
        >

          {formattedDate}

        </span>


      </p>





      <div
        className="
        flex
        items-center
        gap-2
        "
      >



        <input

          type="text"

          value={title}

          onChange={(e) =>
            setTitle(e.target.value)
          }


          onKeyDown={handleKeyDown}


          placeholder="Add event..."


          className="
          flex-1
          bg-transparent
          border-b
          border-gray-400
          py-2
          text-sm
          outline-none
          focus:border-blue-500
          "

        />





        <button

          onClick={handleAddEvent}


          className="
          w-8
          h-8
          rounded-full
          bg-blue-600
          text-white
          font-bold
          hover:bg-blue-700
          transition
          "

        >

          +

        </button>



      </div>


    </div>

  );

}