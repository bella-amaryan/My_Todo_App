export default function StatCard({
icon,
title,
value
}){


return (

<div
className="
rounded-2xl
p-5
border border-gray-800
hover:border-cyan-400
transition
"
>


<div className="text-cyan-400 mb-4">
{icon}
</div>


<p className="text-[#FF7F50] text-xl">
{title}
</p>


<h2 className="text-3xl font-bold mt-2">
{value}
</h2>


</div>


)

}