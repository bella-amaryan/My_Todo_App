"use client";

import { motion } from "framer-motion";


export default function Insights({ insights = [] }) {


return (

<div
className="

rounded-2xl
p-6
border border-slate-800
"
>


<div className="flex items-center justify-between mb-5">

<h2 className="
text-xl
font-semibold
text-blue-500
">
💡 Key Insights
</h2>


<span className="
text-xs
text-[#FF7F50]
">
AI Productivity Analysis
</span>


</div>



<div className="space-y-4">


{
insights.length === 0 ? (

<p className="text-slate-500 text-5sm">
Complete tasks to generate insights.
</p>


) : (


insights.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index * 0.1
}}


className="
flex
gap-4
items-start
bg-slate-800/60
rounded-xl
p-4
hover:bg-slate-800
transition
"


>


<div
className="
text-2xl
bg-slate-700
rounded-xl
w-10
h-10
flex
items-center
justify-center
"
>
{item.icon}
</div>



<div>


<p className="
text-white
font-medium
text-sm
"
>
{
item.type === "success"
?
"Great Progress"
:
item.type === "warning"
?
"Attention Needed"
:
"Insight"
}

</p>



<p className="
text-gray-400
text-sm
mt-1
"
>
{item.text}
</p>



</div>


</motion.div>


))

)


}


</div>


</div>

)

}