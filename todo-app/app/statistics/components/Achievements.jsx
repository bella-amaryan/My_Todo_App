export default function Achievements({stats}){

    const achievements=[];

    if(stats.completed >= 100){
        achievements.push({
             icon:"🏆",
             text:`Completed ${
                stats.completed} Tasks`
        });
    }else{
        achievements.push({
             icon:"📌",
             text:`Complete ${
                100 - stats.completed
             } more tasks to unlock 100 Tasks badge`
        })
    }
    if(stats.completionRate >= 90){

    achievements.push({
        icon:"🚀",
        text:"Productivity Master"
    });

}

if(stats.streak >= 7){

    achievements.push({

        icon:"🔥",
        text:`${stats.streak} Day Streak`

    });

}



return (

<div className="

rounded-2xl
p-5
border border-gray-800
">


<h2 className="font-bold text-blue-500 mb-4">
Top Achievements
</h2>


<div className="space-y-3">

{
    achievements.map((item,index)=>(
        <div
        key={index}
        className="flex items-center gap-3"
        >
            <span>{item.icon}</span>
            <span>{item.text}</span>
            </div>
    ))
}





</div>


</div>

)

}