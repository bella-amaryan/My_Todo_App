"use client";

export default function EventList({
  events,
  setEvents
}) {


  async function handleDelete(id) {

    try {

      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });


      const data = await res.json();


      if (res.ok) {

        setEvents((prev) =>
          prev.filter((event) => event._id !== id)
        );

      } else {

        console.log(data.message);

      }


    } catch (error) {

      console.log("Delete error:", error);

    }

  }



  return (

    <div className="
      bg-white
      rounded-lg
      shadow-lg
      overflow-hidden
      flex
      flex-col
    ">


      {/* Header */}

      <div className="
        bg-[#9696e4]
        text-white
        p-4
      ">

        <h2 className="text-lg font-bold">
          EVENTS
        </h2>

      </div>




      {/* Table header */}

      <div className="
        grid
        grid-cols-2
        bg-green-200
        text-white
        font-bold
        text-sm
      ">

        <div className="
          px-4
          py-2
          border-r
          border-gray-700
          text-green-800
        ">
          DATE
        </div>


        <div className="
          px-4
          py-2
          text-green-800
        ">
          EVENT
        </div>


      </div>






      {/* Events */}

      <div className="
        overflow-y-auto
      ">


        {
          events.length === 0 ? (

            <div className="
              p-4
              text-gray-400
              text-sm
              text-center
            ">

              No events scheduled

            </div>


          ) : (


            [...events]
              .sort(
                (a,b)=>
                new Date(a.date)-new Date(b.date)
              )
              .map((event)=>(


              <div
                key={event._id}
                className="
                  grid
                  grid-cols-2
                  border-b
                  border-gray-200
                  hover:bg-gray-50
                "
              >



                {/* Date */}

                <div className="
                  px-4
                  py-3
                  border-r
                  border-gray-200
                  text-xs
                  font-semibold
                  text-gray-600
                ">

                  {
                    new Date(event.date)
                    .toLocaleDateString(
                      "en-GB",
                      {
                        day:"2-digit",
                        month:"short",
                        year:"numeric"
                      }
                    )
                  }


                </div>





                {/* Event info */}

                <div className="
                  px-4
                  py-3
                  text-sm
                  text-gray-800
                  flex
                  flex-col
                ">


                  <span className="
                    font-semibold
                  ">

                    {event.title}

                  </span>




                  {
                    event.description &&

                    <span className="
                      text-xs
                      text-gray-500
                      mt-1
                    ">

                      {event.description}

                    </span>

                  }





                  <button

                    onClick={()=>
                      handleDelete(event._id)
                    }


                    className="
                      mt-3
                      w-fit
                      bg-red-500
                      text-white
                      text-xs
                      px-3
                      py-1
                      rounded
                      hover:bg-red-600
                    "

                  >

                    Delete

                  </button>



                </div>



              </div>


              ))

          )

        }


      </div>


    </div>

  );

}