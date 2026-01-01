import { Link, MessagesSquare } from "lucide-react";
import React from "react";

function Welcome() {
  return (
    <div className="flex-1 flex justify-center items-center h-[93 vh]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-primary/10 rounded-md hover:bg-primary/20 cursor-default p-2 animate-bounce">
            <MessagesSquare className="size-8 text-primary" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="font-bold text-3xl">Welcome To StudoSphere</h1>
          <h1 className="font-semibold text-base-content/40 text-xl" >Select Options From Sidebar</h1>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
