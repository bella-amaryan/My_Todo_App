"use client";

import { useState } from "react";
import { ArrowLeft, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const router = useRouter();
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleting,setDeleting] = useState(false);

const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }); 

  const changePassword = async()=>{
    try{
    const res = await fetch("/api/account/password",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(form)
  })
  const data = await res.json();
  if(res.ok){
    toast.success(data.message)

    setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

  }else{
    toast.error(data.message);
  }
}catch(error){
    console.log(error)
    toast.error("Server error")
}
  }

  const deleteAccount = async()=>{
   try{
     setDeleting(true);
     const res = await fetch(
        "/api/account/delete",
        {
            method:"DELETE"
        }
    );
    const data = await res.json();
    if(res.ok){
        toast.success(data.message);
        setShowDeleteModal(false);
         document.cookie = "token=; path=/; max-age=0";
        router.push("/login");
    }else{
        toast.error(data.message)
    }
    
   }catch(error){
    console.log(error);
      toast.error("Server error");
   }finally{
    setDeleting(false)
   }
}
  


  return (
    <div className="min-h-screen text-slate-500 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => router.push("/settings")}
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
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl  text-purple-900 font-bold flex items-center gap-3">
              <Lock className="text-purple-400" />
              Security
            </h1>

            <p className="text-slate-400 mt-1">
              Manage your password and account security
            </p>
          </div>

        </div>

        {/* Change Password */}

        

          <input
            type="password"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={(e)=>setForm({...form, currentPassword: e.target.value})}
            className="w-100  text-slate-500 border border-slate-600 rounded-xl p-3 mb-5"
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e)=>setForm({...form, newPassword: e.target.value})}
            className="w-100  text-slate-500 border border-slate-600 rounded-xl p-3 mb-5"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e)=>setForm({...form, confirmPassword: e.target.value})}
            className="w-100  text-slate-500 border border-slate-600 rounded-xl p-3 mb-5"
          />

          <button onClick={changePassword}
            className="
              flex
              items-center
              text-white
              gap-2
              bg-purple-600
              hover:bg-purple-700
              px-6
              py-3
              rounded-xl
              font-semibold
              mb-5
            "
            
          >
            Change Password
          </button>

        
        <p className="text-slate-500 gap-2 mb-5">
            Permanently delete your account and all your data.
          </p>

          <button onClick={()=>setShowDeleteModal(true)}
            className="
              flex
              items-center
              text-white
              gap-2
              bg-red-600
              hover:bg-red-700
              px-6
              py-3
              rounded-xl
              font-semibold
              mb-5
            "
          >
            <Trash2 size={18} />
            Delete Account
          </button>

        {showDeleteModal && (
  <div className="
    fixed
    inset-0
    bg-black/60
    flex
    items-center
    justify-center
    z-50
  ">

    <div className="
      bg-slate-900
      border
      border-red-800
      rounded-3xl
      p-8
      max-w-md
      w-full
    ">

      <h2 className="
        text-2xl
        font-bold
        text-red-400
        mb-3
      ">
        Delete Account?
      </h2>


      <p className="
        text-slate-300
        mb-6
      ">
        This action cannot be undone. 
        All your tasks, events and personal data will be permanently deleted.
      </p>


      <div className="
        flex
        justify-end
        gap-3
      ">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="
            px-5
            py-2
            rounded-xl
            bg-slate-700
            hover:bg-slate-600
          "
        >
          Cancel
        </button>

<button
disabled={deleting}
onClick={deleteAccount}
className="
    px-5
    py-2
    rounded-xl
    bg-red-600
    hover:bg-red-700
    disabled:opacity-50
    "
>
{deleting ? "Deleting..." : "Delete"}
</button>

      </div>

    </div>

  </div>
)}

      </div>
    </div>
  );
}