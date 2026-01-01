import React from "react";
import { themes } from "../../utils/themes";
import { useThemeStore } from "../../store/useThemeStore";

function Settings() {
    const { setTheme } = useThemeStore();
  return (
    <div className="pt-18">
      <div className="w-[80%] m-auto py-3">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">Settings</h1>
            <h1 className="font-semibold text-lg text-base-content/60">
              Change Theme For Your StudoSphere Interface
            </h1>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
            {themes.map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-center m-5"
                >
                  <div
                    data-theme={element}
                    className="bg-base flex px-1.5 py-2.5 justify-center rounded-lg cursor-pointer gap-1 hover:bg-neutral/60"
                    onClick={() => setTheme(element)}
                  >
                    <div className="w-8 h-8 bg-primary rounded-sm"></div>
                    <div className="w-8 h-8 bg-secondary rounded-sm"></div>
                    <div className="w-8 h-8 bg-accent rounded-sm"></div>
                    <div className="w-8 h-8 bg-neutral rounded-sm"></div>
                  </div>
                  <h2 className="font-bold">
                    {element[0].toUpperCase() + element.slice(1)}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
