export const getFormattedDate = (date) => {
  // const startDate = `${
  //   Intl.DateTimeFormat().format(date).split("/")[2]
  // }-${Intl.DateTimeFormat()
  //   .format(date)
  //   .split("/")[0]
  //   .padStart(2, "0")}-${Intl.DateTimeFormat()
  //   .format(date)
  //   .split("/")[1]
  //   .padStart(2, "0")}`;
  const startDate = `${`${date.getFullYear()}`.padStart(2, "0")}-${`${date.getMonth()+1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`
  const startTime = date.toTimeString().slice(0, 5);
  console.log(startDate, startTime);

  return `${startDate}T${startTime}`;
};


export const formatDateTime = (input) => {
    const date = new Date(input);
    if (!input || isNaN(date)) return null;
    // const dateString = date.toLocaleDateString();
    // const timeString = date.toLocaleTimeString();

    // console.log(timeString)

//     const formattedDate = `${dateString.split("/")[2]}-${dateString.split("/")[0].padStart(2, "0")}-${dateString.split("/")[1].padStart(2, "0")}`

//     console.log("Formatted Date: ", formattedDate)

//     // const formattedTime = `${timeString.split(" ")[0].split(":")[0].padStart(2, "0")}:${timeString.split(" ")[0].split(":")[1].padStart(2, "0")}:00`;

//     // console.log("Formatted Time: ", formattedTime)
    
// //   const day = date.getDate().toString().padStart(2, "0");
// //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
// //   const year = date.getFullYear();

//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");

//   return `${formattedDate}T${hours}:${minutes}:00`;
    // return getFormattedDate(new Date(input))
//     const dateString = date.toLocaleDateString("en-CA"); // gives YYYY-MM-DD
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");

    const localDateString = date.toLocaleString();
    const splittedLocalDateString = localDateString.split(" ");

    const dateString = splittedLocalDateString[0].split(",")[0]
    let timeString = splittedLocalDateString[1];
    const check = splittedLocalDateString[2].toLowerCase();


    const newDateString = `${dateString.split("/")[2]}-${dateString.split("/")[1].padStart(2, "0")}-${dateString.split("/")[0].padStart(2, "0")}`

    if(check == "am" && timeString.split(":")[0] == 12){
        timeString = `00:${timeString.split(":")[1]}:${timeString.split(":")[1]}`
    }
    if(check == "pm"){
        timeString = `${parseInt(timeString.split(":")[0])+12}:${timeString.split(":")[1]}`
    };

    console.log(dateString, timeString, check)

    return `${newDateString}T${timeString}`;

};