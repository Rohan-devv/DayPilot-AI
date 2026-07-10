"use client";

import {
  Paperclip,
  Send,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react"; 

import {toast} from "react-hot-toast"; 

import { useDashboardUIStore } from "@/stores/dashboard-ui-store";
import { useState } from "react";

export default function ComposeEmail() {
  const closeCompose = useDashboardUIStore(
    (state) => state.closeCompose
  ); 

const [values, setValues] = useState({
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  body: "",
});

const [errors, setErrors] = useState<{
  to?: string;
  subject?: string;
  body?: string;
}>({});

const [isSubmitting, setIsSubmitting] = useState(false);

function set(field: keyof typeof values) {
  return (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
}

function validate() {
  const e: typeof errors = {};

  if (!values.to.trim()) e.to = "Recipient is required";
  if (!values.subject.trim()) e.subject = "Subject is required";
  if (!values.body.trim()) e.body = "Body is required";

  return e;
}


async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
  e.preventDefault() 

  const validateErrors = validate()  

  setErrors(validateErrors) 

  if(Object.keys(validateErrors).length > 0) return  

  setIsSubmitting(true)
    
  

     try { 
      const res = await fetch("/api/email/messages/send", {
        method:"POST",
        headers: {
          "Content-type": "application/json"
        }, 
        body: JSON.stringify(values)
      })  

      const data = await res.json() 
      console.log("email Data:", data)  

      setValues({ 
         to: "",
         cc: "",
         bcc: "",
         subject: "",
         body: "",
      })  

      toast.success("Email sent successfully") 
      closeCompose()

      
     } catch (error) {  
      console.error(error)
     } finally{
      setIsSubmitting(false)
     }
}



  return (
    <div className="flex h-[520px] w-[640px] flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-[#f2f6fc] px-4 py-2">
        <h2 className="text-sm font-medium text-gray-700">
          New Message
        </h2>

        <div className="flex items-center gap-1">
          <button className="rounded p-1 hover:bg-gray-200">
            <Minimize2 size={15} />
          </button>

          <button className="rounded p-1 hover:bg-gray-200">
            <Maximize2 size={15} />
          </button>

          <button
            onClick={closeCompose}
            className="rounded p-1 hover:bg-red-100 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form
  onSubmit={handleSubmit}
  className="flex flex-1 flex-col"
>
        {/* To */}
        <div className="flex items-center border-b px-4">
          <span className="mr-3 text-sm text-gray-500">To</span>

          <input 
          value={values.to} 
          onChange={set("to")}
            type="email"
            className="flex-1 py-2.5 text-sm outline-none"
          />

          <button className="mr-2 text-sm text-gray-500 hover:text-blue-600">
            Cc
          </button>

          <button className="text-sm text-gray-500 hover:text-blue-600">
            Bcc
          </button>
        </div>

        {/* Subject */}
        <input 
        value={values.subject}
        onChange={set("subject")}
          type="text"
          placeholder="Subject"
          className="border-b px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
        />

        {/* Body */}
        <textarea 
        value={values.body}
        onChange={ set("body")}
          placeholder="Compose your email..."
          className="flex-1 resize-none px-4 py-3 text-sm outline-none"
        />

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-3 py-2">
          <div className="flex items-center gap-2">
            <button  
             type="submit"
             disabled={isSubmitting}
             className="flex items-center gap-2 rounded-full bg-[#0b57d0] px-5 py-2 text-sm font-medium text-white hover:bg-[#0842a0]">
              <Send size={15} />
              {isSubmitting ? "sending.." : "send"}
            </button>

            <button className="rounded-full p-2 hover:bg-gray-100">
              <Paperclip
                size={18}
                className="text-gray-600"
              />
            </button>
          </div>

          <span className="text-xs text-gray-400">
            Ctrl + Enter
          </span>
        </div>
       </form>
    </div>
  );
}