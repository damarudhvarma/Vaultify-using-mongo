import React, { useRef, useState, useEffect } from "react";
import Savedpasswords from "./Savedpasswords";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref = useRef();
  const Passwordref = useRef();
  
  const [form, setForm] = useState({ site: "", password: "", username: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async()=>{
    const req = await fetch("http://localhost:3000/")
    let passwords= await req.json()
    setpasswordArray(passwords);
    

  }

  useEffect(() => {
    getPasswords()
    }
  , []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      Passwordref.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      Passwordref.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async() => {
    toast('Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.edit_id }) })
    
    const newPassword = { ...form, id: uuidv4() };
    await fetch('http://localhost:3000/',{
     method: 'POST',
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(newPassword),
    })
    setpasswordArray([...passwordArray, newPassword]);
    setForm({ site: "", password: "", username: "" });
  };

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto p-4 text-center max-w-4xl">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
          <span className='text-green-700'>&lt;</span> 
          <span>Vaulti</span>
          <span className='text-green-700'>Fy/&gt;</span> 
        </h1>
        <p className="text-green-700 text-sm sm:text-base">Your own password manager</p>

        <div className="flex flex-col p-5">
          <input 
            value={form.site} 
            onChange={handleChange} 
            placeholder="Enter website URL" 
            className="rounded-full m-3 w-full border border-green-500 py-2 px-4" 
            type="text" 
            name="site" 
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              value={form.username} 
              onChange={handleChange} 
              placeholder="Enter username" 
              className="rounded-full m-3 w-full sm:w-1/2 border border-green-500 py-2 px-4" 
              type="text" 
              name="username" 
            />
            <div className="password relative w-full sm:w-1/2">
              <input 
                ref={Passwordref} 
                value={form.password} 
                onChange={handleChange} 
                placeholder="Enter password" 
                className="rounded-full m-3 w-full border border-green-500 py-2 px-4" 
                type="password" 
                name="password" 
              />
              <span 
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2" 
                onClick={()=>showPassword} 
                title="show">
                <img ref={ref} className="w-6" src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <button 
            onClick={()=>{savePassword()} }
            className="flex justify-center items-center text-center w-fit p-3 rounded-full bg-green-400 text-sm hover:bg-green-300">
            <lord-icon 
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>
            Add Password
          </button>
        </div>
      </div>
   
      <Savedpasswords passwordArray={passwordArray} setpasswordArray={setpasswordArray} setForm={setForm} />
    </>
  );
};

export default Manager;
