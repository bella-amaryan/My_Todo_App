"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function CompletionChart({data=[]}){

return (

<BarChart 
width={500}
height={250}
data={data}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="tasks" fill="#f5e1cf"  /> // Blue

</BarChart>

)

}