import { create } from "zustand";

export const useCalendarStore = create((set, get)=>({
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthDays: [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    dates: [],


    getWeekInfo: ()=>{
        let currentDay = new Date().getDay();
        let currentDateTime = new Date().getTime();

        // console.log("Current Day: ", currentDay);
        // console.log("Current Date Time: ", currentDateTime);

        const dates = [];

        while(currentDay > 0){
            currentDay--;
            currentDateTime -= 24 * 60 * 60 * 1000
            const dateTime = new Date(currentDateTime).getTime();
            dates.push(dateTime);
        }

        currentDay = new Date().getDay();
        currentDateTime = new Date().getTime();

        // console.log("Current Day: ", currentDay);
        // console.log("Current Date Time: ", currentDateTime);

        while(currentDay <= 6){
            const dateTime = new Date(currentDateTime).getTime();
            dates.push(dateTime);
            currentDateTime += 24 * 60 * 60 * 1000;
            currentDay++;
        }

        // console.log("Dates: ", dates);

        set({ dates: dates });

    }
}))

