import { Calendar, Edit3, Mail, MapPin, Phone } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import SkillsModal from "../SkillsModal/SkillsModal";
import InfoModal from "../InfoModal/InfoModal";
import { uploadAttachments } from "../../utils/uploadFile";

export default function Profile() {
  const { user, skills, uploadResume, handleSubmit } = useAuthStore();
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleProfileChange = async (e) => {
    toast.promise(
      async () => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("files", file);
        const urls = await uploadAttachments(formData);
        // console.log(urls[0]);
        handleSubmit({ profilePic: urls[0] })
      },
      {
        loading: "Updating...",
        error: "Error While Updating Profile Pic",
      }
    );
  };

  return (
    <div className="w-[70%] m-auto flex flex-col gap-5 min-h-50">
      <div className="relative bg-gradient-to-r from-blue-800 via-purple-900 to-indigo-900 md:mt-25 rounded-xl ">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}

            <div className="avatar">
              <div
                className="w-32 h-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2 relative"
                onMouseOver={() => {
                  setShow(true);
                }}
                onMouseOut={() => setShow(false)}
              >
                <img
                  src={user?.user.profilePic}
                  alt=""
                  className="object-contain"
                />
                {show && (
                  <div
                    className="flex items-center justify-center bg-base-200 opacity-70 w-full h-full absolute top-0 z-700 cursor-pointer"
                    onClick={() => ref.current.click()}
                  >
                    <Edit3 />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={ref}
                      onChange={handleProfileChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left text-white">
              <h1 className="text-4xl font-bold mb-2">{user?.user.username}</h1>
              <p className="text-xl opacity-90 mb-2">
                {user?.user.regNo.toUpperCase()}
              </p>
              <p className="text-lg opacity-80 font-bold">
                {user?.user.isHead ? "Placement Head" : "Student"} at VIT Bhopal University
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base border border-gray-700 shadow-xl w-[95%] m-auto">
        <InfoModal />
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title text-base-content mb-6">
              Personal Information
            </h2>
            {!user.user.isHead && <div
              className="flex items-center justify-center gap-2 bg-gray-800 cursor-pointer p-2 px-4 rounded-lg"
              onClick={() =>
                document.getElementById("my_info_modal").showModal()
              }
            >
              <Edit3 className="size-4" />
              <h1 className="font-bold">Edit</h1>
            </div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-lg  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className=" font-bold text-lg text-base-content">Email</p>
                <p className="font-medium text-base-content">
                  {user?.user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-lg  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-base-content font-bold text-lg">
                  Department
                </p>
                <p className="font-medium text-base-content">
                  {!user?.user.isHead ? user?.user.dept : "Placement Head"}
                </p>
              </div>
            </div>

            {!user?.user.isHead && (
              <div className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-lg  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-lg text-base-content">CGPA</p>
                  <p className="font-medium text-base-content">
                    {user?.user.cgpa}
                  </p>
                </div>
              </div>
            )}

            {!user?.user.isHead && (
              <div className="flex items-center space-x-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-lg  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-lg text-base-content">Batch</p>
                  <p className="font-medium text-base-content">
                    {user?.user.batch}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!user.user.isHead && (
        <div className="card bg-base border  border-gray-700 shadow-xl w-[95%] m-auto">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-base-content mb-6">Skills</h2>
              <SkillsModal />
              <div
                className="flex items-center justify-center gap-2 bg-gray-800 cursor-pointer p-2 px-4 rounded-lg"
                onClick={() => {
                  document.getElementById("my_skill_modal_1").showModal();
                }}
              >
                <Edit3 className="size-4" />
                <h1 className="font-bold">Edit Skills</h1>
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-8 gap-5 max-h-50 md:overflow-y-hidden overflow-y-scroll p-2">
              {user?.user.skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-3 p-4 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-full  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in"
                  >
                    <h1 className="text-neutral-content font-bold text-center">{skill}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!user.user.isHead && (
        <div className="card bg-base border  border-gray-700 shadow-xl w-[95%] m-auto p-5">
          <h1 className="font-bold text-xl mb-4">Resume</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-primary"
                onChange={uploadResume}
              />
              <h1 className="ml-4 font-bold">
                (
                {user.user.resume
                  ? "Upload New Resume To Update"
                  : "Uplod Your Resume"}
                )
              </h1>
            </div>
            {user?.user.resume ? (
              <div className="flex items-center gap-3">
                <div
                  className="btn btn-primary"
                  onClick={(e) => {
                    const link = document.createElement("a");
                    let href = `${user.user.resume}`;
                    link.download = "resume.pdf";
                    link.setAttribute("target", "_blank");
                    // console.log(`${href}`);
                    link.href = href;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Show Resume
                </div>
                <div
                  className="btn btn-error text-error-content"
                  onClick={() => {
                    handleSubmit({ resume: "" });
                    toast.success("Resume Deleted");
                  }}
                >
                  Delete Resume
                </div>
              </div>
            ) : (
              <h1 className="font-bold">No Resume Uploaded</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
