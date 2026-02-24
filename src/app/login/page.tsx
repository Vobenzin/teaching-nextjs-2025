"use client"

import { useState } from "react";
import { LoginButton } from "./LoginButton";

export default function Login(){
    const [email, setEmail] = useState("")
    const[password,setPassword] = useState("")

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        };

    const handleChangePass = (event) => {
        setPassword(event.target.value);
        };

  return(<div className="relative flex flex-col justify-center h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>

        <div>
            <label className="label">
                <span className="text-base label-text">Email</span>
            </label>
            <input type="text" value={email} onChange={handleChangeEmail} placeholder="Email Address" className="w-full input input-bordered" />
        </div>
        <div>
            <label className="label">
                <span className="text-base label-text">Password</span>
            </label>
            <input type="password" value={password} onChange={handleChangePass} placeholder="Enter Password" className="w-full input input-bordered" />
        </div>
        <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
        <div>
            <LoginButton email={email} password={password}></LoginButton>
        </div>

    </div>
</div>)
}