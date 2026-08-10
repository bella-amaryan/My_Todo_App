
"use client";
import {ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";


export default function TaskHeader() {
  const router = useRouter();
  return (
    
          <div className="mb-8 flex items-start justify-between">

       <div className="
flex
items-center
gap-4

">
            <button
              onClick={() => router.push("/dashboard")}
             className="
          group
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-slate-700
          text-slate-400
          transition-all
          hover:-translate-x-1
          hover:bg-purple-500/20
          hover:text-purple-400
        "
        >
              <ArrowLeft
              size={20}/>
      
              
            </button>
      
          
      <div>
        <h1 className="text-4xl font-bold text-blue-500">
           My Tasks
        </h1>
        <p className="text-5sm  text-slate-500">
          Stay organized and keep moving forward.
        </p>
        
      </div>
      </div>
      </div>
    
    
    
    
  );
}
