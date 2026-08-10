"use client";

import {
PieChart,
Pie,
Legend
} from "recharts";


export default function CategoryChart({data=[]}){
    if(data.length===0){

return (

<div className="
border border-gray-800
text-slate-500
rounded-2xl
p-5
">

No category data yet

</div>

)

}


return (

<div
className="

rounded-2xl
p-5
border border-gray-800
"
>

<h2 className="mb-4">
Tasks by Category
</h2>



<PieChart width={280} height={230}>


<Pie
  data={data}
  dataKey="value"
  cx="50%"
  cy="50%"
  innerRadius={50}
  outerRadius={80}
/>


<Legend/>


</PieChart>


</div>

)

}