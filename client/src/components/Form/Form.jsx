import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Edit2, Edit3, Plus, X } from "lucide-react";
import { uploadAttachments } from "../../utils/uploadFile";
import toast from "react-hot-toast";

export default function Form() {
  const { user, handleSkillChange, skills, removeSkill, handleSubmit, checkDuplicateSkills } =
    useAuthStore();
  const [num, setNum] = useState(1);
  const [hidden, setHidden] = useState(true);
  const ref = useRef(null);
  const [imageUrl, setImageUrl] = useState(user.user.profilePic);
  const [cgpa, setCgpa] = useState("");
  const updateImageURL = async (e) => {
    const file = e.target.files[0];

    // if()

    // const reader = new FileReader();
    // reader.onload = (e)=>{
    //   const result = e.target.result;
    //   setImageUrl(result)
    // };
    // reader.readAsDataURL(file)
    toast.promise(
      async () => {
        const formData = new FormData();
        formData.append("files", file);
        const urls = await uploadAttachments(formData);
        // console.log(urls[0]);
        setImageUrl(urls[0]);
      },
      {
        loading: "Updating...",
        error: "Error While Updating",
      }
    );
  };
  return (
    <div className="mt-20 w-[90%] m-auto h-[93vh] overflow-y-scroll pb-10">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="font-bold text-2xl">Details</h1>
        <div className="flex flex-col justify-center px-4 w-full gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-lg">Profile Picture: </h1>
            <div
              className="flex items-center justify-center relative cursor-pointer"
              onMouseOver={() => setHidden(false)}
              onMouseOut={() => setHidden(true)}
              onClick={() => ref.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={ref}
                onChange={updateImageURL}
              />
              <div
                className={`bg-base-300 size-10 rounded-full absolute right-0 flex items-center justify-center ${
                  hidden ? "hidden" : "block"
                }`}
              >
                <Edit3 className="size-4" />
              </div>
              <img
                src={imageUrl}
                className="rounded-full size-10 object-contain"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold text-lg">
              Name <span className="text-error">*</span>
            </h1>
            <input
              type="text"
              className="input input-primary w-full"
              defaultValue={user.user.username}
              readOnly
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold text-lg">
              Email <span className="text-error">*</span>
            </h1>
            <input
              type="text"
              className="input input-primary w-full"
              defaultValue={user.user.email}
              readOnly
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold text-lg">
              Role <span className="text-error">*</span>
            </h1>
            <input
              type="text"
              className="input input-primary w-full"
              defaultValue={user.user.isHead ? "Placement Head" : "Student"}
              readOnly
            />
          </div>
          {!user.user.isHead && (
            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="font-bold text-lg">
                Batch <span className="text-error">*</span>
              </h1>
              <input
                type="text"
                className="input input-primary w-full"
                defaultValue={user.user.batch}
                readOnly
              />
            </div>
          )}
          {!user.user.isHead && (
            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="font-bold text-lg">
                Registeration Number <span className="text-error">*</span>
              </h1>
              <input
                type="text"
                className="input input-primary w-full"
                defaultValue={user.user.regNo.toUpperCase()}
                readOnly
              />
            </div>
          )}
          {!user.user.isHead && (
            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="font-bold text-lg">
                Department <span className="text-error">*</span>
              </h1>
              <input
                type="text"
                className="input input-primary w-full"
                defaultValue={user.user.dept}
                readOnly
              />
            </div>
          )}
          {!user.user.isHead && (
            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="font-bold text-lg">
                CGPA (Upto 2 Decimals) <span className="text-error">*</span>
              </h1>
              <input
                type="text"
                className="input input-primary w-full"
                value={cgpa}
                onChange={(e) => {
                  setCgpa("");
                  if (parseFloat(e.target.value) <= 10) {
                    setCgpa(`${e.target.value}`);
                  }
                }}
              />
            </div>
          )}

          {!user.user.isHead && (
            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="font-bold text-lg">Skills</h1>
              {[...Array(num)].map((element, index) => {
                return (
                  <div key={index} className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      className="input input-primary"
                      value={skills[index] || ""}
                      placeholder={`Skill ${index + 1}`}
                      onChange={(e) => {
                        handleSkillChange(index, e.target.value);
                      }}
                    />
                    {index == num - 1 ? (
                      <div
                        className="flex bg-base-300 p-2 rounded-lg cursor-pointer"
                        onClick={async() => {
                          if (skills[num - 1].trim().length !== 0) {
                            const check = await checkDuplicateSkills(index, skills[index])
                            !check && setNum(num + 1);
                            // handleSkillChange(index + 1, "");
                          }
                          else {
                            toast.error("Fill The Field First To Add More");
                          }
                        }}
                      >
                        <Plus />
                        <h1>Add Skill</h1>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center bg-base-300 p-1 hover:bg-base-200"
                        onClick={() => {
                          setNum(num - 1);
                          removeSkill(index);
                        }}
                      >
                        <X className="size-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <form
            action="/"
            onSubmit={(e) => {
              let temp = `${cgpa}.00`;
              if (temp.length > 0) {
                temp =  `${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`;
                // console.log("1: ",
                //   `${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`
                // );
                if (temp.split(".")[0].length == 1) {
                  // console.log("2: ",
                  //   `0${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`
                  // );
                  temp = 
                    `0${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`;
                }
              }
              // console.log(`${`${temp}`}`)
              handleSubmit({
                profilePic: imageUrl,
                skills: skills.filter((element)=>element.trim().length!==0),
                cgpa: temp.trim().length > 0 && parseFloat(`${`${temp}`.split(".")[0]}.${`${temp}`.split(".")[1].slice(0, 2)}`),
              });
            }}
          >
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
