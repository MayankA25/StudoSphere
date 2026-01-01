import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";

export default function SkillsModal() {
  const {
    user,
    setProfileSkills,
    skills,
    handleSkillChange,
    removeSkill,
    handleSubmit,
    checkDuplicateSkills
  } = useAuthStore();
  const [number, setNumber] = useState(1);
  useEffect(() => {
    setProfileSkills(user.user.skills);
    setNumber(user.user.skills.length == 0 ? 1 : user.user.skills.length);
  }, []);
  return (
    <dialog
      id="my_skill_modal_1"
      className="modal modal-bottom sm:modal-middle z-900"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-5">Skills</h3>
        <div className="flex flex-col justify-center gap-5">
          {[...Array(number)].map((element, index) => {
            return (
              <div key={index} className="flex gap-4 items-center">
                <input
                  type="text"
                  className="input input-primary"
                  value={skills[index] || ""}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder={`Enter Skill ${number}`}
                />
                {index == number - 1 ? (
                  <div
                    className="flex items-center justify-center gap-1 bg-base-300 p-2 rounded-lg cursor-pointer"
                    onClick={async() => {
                      if (skills[index].trim().length != 0) {
                        const check = await checkDuplicateSkills(index, skills[index])
                        !check && setNumber(number + 1);
                      }
                    }}
                  >
                    <Plus />
                    <p>Add Skill</p>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center bg-base-300 p-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      removeSkill(index);
                      setNumber(number - 1);
                    }}
                  >
                    <X />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-action">
          <form
            method="dialog"
            onSubmit={() => {
              try{

                handleSubmit({
                  skills: skills.filter((element) => element.trim().length !== 0),
                });
                toast.success("Skills Updated")
              } catch(e){
                toast.error("Error While Updatig Skills")
              }
            }}
          >
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary">Update Skills</button>
          </form>
          <button
            className="btn btn-error"
            onClick={() => {
              setProfileSkills([]);
              setNumber(1);
            }}
          >
            Remove All Skills
          </button>
        </div>
      </div>
    </dialog>
  );
}
