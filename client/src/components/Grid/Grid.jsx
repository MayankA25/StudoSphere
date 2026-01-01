import React from "react";

function Grid() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, index) => {
          return (
            <div
              key={index}
              className={`lg:w-30 lg:h-30 md:w-20 md:h-20 rounded-lg bg-primary/20 ${index%2 == 0 ? "animate-pulse" : "animate-none"}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
