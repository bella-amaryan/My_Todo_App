"use client";

export default function CalendarGrid({
  currentDate,
 selectedDate,
 setSelectedDate,
 events
}) {

  const getDaysInMonth = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
  };


  const getFirstDayOfMonth = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
  };


  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days = [];


  for(let i = 0; i < firstDay; i++){
    days.push(null);
  }


  for(let i = 1; i <= daysInMonth; i++){
    days.push(i);
  }


  const getEventCountForDay = (day) => {

    if(!day) return 0;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );


    return events.filter((event)=>
      new Date(event.date).toDateString()
      === date.toDateString()
    ).length;

  };


  const handleDateClick = (day)=>{

    if(day){

      setSelectedDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        )
      );

    }

  };


  return (

    <div className="bg-white rounded-lg shadow-lg overflow-hidden">

      <div className="calendar-container">


        <div className=" calendar-header">

          {[
            "SUNDAY",
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY"
          ].map(day=>(
            <div
              key={day}
              className="calendar-day-header"
            >
              {day}
            </div>
          ))}

        </div>



        <div className="calendar-grid">

          {days.map((day,index)=>{

            const eventCount = getEventCountForDay(day);


            const isSelected =
              day &&
              day === selectedDate.getDate() &&
              selectedDate.getMonth() === currentDate.getMonth();


            return (

              <div
                key={index}
                onClick={()=>handleDateClick(day)}
                className={`
                  calendar-cell
                  ${isSelected ? "selected":""}
                  ${!day ? "empty":""}
                  ${eventCount ? "has-events":""}
                `}
              >

                <div className="day-content">

                  <span className="day-number">
                    {day}
                  </span>


                  {eventCount > 0 && (
                    <div className="event-indicator">
                      {eventCount}
                    </div>
                  )}

                </div>


              </div>

            );

          })}

        </div>


      </div>


    </div>

  );
}