export default function CalendarHeader({
  currentDate,
  setCurrentDate
}) {

  const monthYear = currentDate.toLocaleDateString(
    "en-US",
    {
      month:"long",
      year:"numeric"
    }
  );


  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()-1
      )
    );
  };


  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()+1
      )
    );
  };


  return (
    <div className="flex justify-between items-center mb-8">

      <h1 className="text-4xl text-blue-500 font-bold ">
        CALENDAR TO DO LIST
      </h1>


      <div className="flex gap-4 items-center">

        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ← 
        </button>


        <span className="text-2xl  text-green-200 font-semibold">
          {monthYear}
        </span>


        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
           →
        </button>

      </div>

    </div>
  );
}