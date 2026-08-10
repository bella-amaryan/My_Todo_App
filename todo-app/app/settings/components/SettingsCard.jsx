import { useRouter } from "next/navigation"
export default function SettingsCard({
  icon,
  title,
  description,
  href
}){
  const router = useRouter();


return (

<div
onClick={()=>router.push(href)}
className="
border border-gray-800
rounded-2xl
p-6
hover:border-purple-500
transition
cursor-pointer
"
>


<div className="flex items-center gap-4">


<div
className="
p-3
rounded-xl
bg-purple-500/20
text-purple-400
"
>
{icon}
</div>


<div>

<h2 className="text-xl  text-purple-600 font-semibold">
{title}
</h2>

<p className="text-gray-400 text-sm">
{description}
</p>

</div>


</div>


</div>

)

}