import { Globe, MessagesSquare, University } from "lucide-react";
import React from "react";
import Grid from "../Grid/Grid";
import { useAuthStore } from "../../store/useAuthStore";

function Login() {
    const {  login} = useAuthStore()
  return (
    <div className="flex w-full h-full bg-base-100 absolute top-0 ">
      <div className="md:w-[50%] w-[100%] flex items-center h-full justify-center bg-base-200 rounded-lg">
        <div className="flex justify-center items-center flex-col gap-6">
          <div className="flex justify-center items-center bg-primary/10 p-2 rounded-xl hover:bg-primary/20 cursor-default">
            <Globe className="size-9 text-primary" />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-base-content/30 text-lg text-center">
              {" "}
              Welcome To StudoSphere
            </h1>
            <h1 className="font-bold text-2xl text-base-content text-center">
              Login Using College GMail ID
            </h1>
            <h1 className="font-bold text-base-content/30 text-lg text-center">
              <span className="text-primary">*</span>Login Only With College
              GMail otherwise login will fail
              <span className="text-primary">*</span>
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <button className="flex bg-slate-900/90 p-3 rounded-lg font-bold cursor-pointer hover:bg-neutral/70 items-center justify-center gap-3" onClick={login}>
                <img src="./google.png" alt="login" className="size-5" />
                <p className="text-neutral-content">
                    Login With Google
                    </p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] hidden items-center justify-center md:flex">
        <Grid />
      </div>
    </div>
  );
}

export default Login;
