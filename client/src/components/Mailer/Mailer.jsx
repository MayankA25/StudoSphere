import { Badge, Edit, Loader, Loader2, Plus, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useMailerStore } from "../../store/useMailerStore";
import { Editor } from "@monaco-editor/react";
// import Markdown from 'react-markdown'
import Markdown from "markdown-to-jsx";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import * as xlsx from "xlsx"
;
import { uploadAttachments } from "../../utils/uploadFile";

export default function Mailer() {
  const {
    emails,
    handleEmailChange,
    removeEmail,
    ccEmails,
    handleCcEmail,
    removeCcEmails,
    bccEmails,
    handleBccEmail,
    removeBccEmails,
    sendMail,
    setEmails
  } = useMailerStore();
  const [recipients, setRecipients] = useState(1);
  const [cc, setCc] = useState(0);
  const [bcc, setBcc] = useState(0);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("text");
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [uploading, setUploading] = useState(false);
  const ref = useRef(null);

  const handleFileUpload = (event)=>{
    const file = event.target.files[0];
    // console.log("File: ", file);
    if(!file) return;
    const reader = new FileReader();

    reader.onload = (e)=>{
      const recipients = [];
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });
      
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      // console.log(jsonData);

      for(const row of jsonData){
        if(!recipients.includes(row.Email)){
          recipients.push(row.Email)
        }
      }
      if(!recipients[0] || recipients[0]?.trim().length == 0) return toast.error("No Email Column Found!")
      // console.log(recipients);
      setEmails(recipients);
      setRecipients(recipients.length);
    } 
    reader.readAsArrayBuffer(file);
  }
  
  const handleAttachmentUpload = async(event)=>{
    let attachments = []
    const files = event.target.files;
    // console.log(files)
    if(files.length == 0) return;
    setUploading(true);
    const formData = new FormData();

    for(let file of files){
      formData.append("files", file);
    }
    const urls = await uploadAttachments(formData);
    
    for(let i = 0; i<files.length; i++){
      attachments.push({ filename: files[i].name, path: urls[i] })
    }
    // console.log(attachments)
    setAttachment(attachments)
    setUploading(false);

  }

  return (
    <div className="flex flex-col mt-18 h-[93vh] overflow-y-scroll w-[100%] md:w-[80%]">
      <div className="flex-1 flex flex-col w-full ">
        {/* Header */}
        <div className="bg-base text-base-content px-8 py-6">
          <h1 className="text-2xl font-bold">Bulk Mailer</h1>
          <p className=" mt-1">
            Compose and send emails to multiple recipients
          </p>
        </div>

        {/* Email Form */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-base-100 rounded-xl shadow-sm  overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Compose Email
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-col justify-center-center">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold">
                      To <span className="text-error">*</span>
                    </h1>
                    {[...Array(recipients)].map((element, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-5 mb-3"
                        >
                          <input
                            type="text"
                            value={emails[index] || ""}
                            onChange={(e) =>
                              handleEmailChange(e.target.value, index)
                            }
                            className="input input-primary w-[50%] bg-base-200"
                            placeholder={`Enter Recipient ${index + 1}`}
                          />
                          {index == recipients - 1 ? (
                            <div
                              className="flex items-center justify-center p-2 bg-base-300 rounded-lg cursor-pointer"
                              onClick={() => {
                                if (
                                  emails[recipients - 1].trim().length !== 0
                                ) {
                                  setRecipients(recipients + 1);
                                  handleEmailChange("", index + 1);
                                }else{
                                  toast.error("Fill The Field")
                                }
                              }}
                            >
                              <Plus className="size-5" />
                            </div>
                          ) : (
                            <div
                              className="flex items-center justify-center p-2 bg-base-300 rounded-md cursor-pointer"
                              onClick={() => {
                                removeEmail(index);
                                setRecipients(recipients - 1);
                              }}
                            >
                              <X className="size-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col justify-center mb-3 gap-2">
                    <h1 className="font-bold">Upload File Of Recipients <span className="text-accent font-bold">*Must Contain 'Email' Field*</span></h1>
                    <input type="file" className="file-input file-input-primary" accept=".xlx,.xlsx*" onChange={handleFileUpload}/>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center bg-base-300 p-2 rounded-md text-neutral-content gap-1.5 cursor-pointer"
                      onClick={() => {
                        if (ccEmails.length < 1 || ccEmails[cc - 1] !== "") {
                          setCc(cc + 1);
                          handleCcEmail("", cc);
                        }
                        else{
                          toast.error("Fill The Field")
                        }
                      }}
                    >
                      <Plus className="size-5" />
                      <h1>Add Cc</h1>
                    </div>
                    <div
                      className="flex items-center justify-center bg-base-300 p-2 rounded-md text-neutral-content gap-1.5 cursor-pointer"
                      onClick={() => {
                        if (bccEmails.length < 1 || bccEmails[bcc - 1] !== "") {
                          setBcc(bcc + 1);
                          handleBccEmail("", bcc);
                        }else{
                          toast.error("Fill The Field")
                        }
                      }}
                    >
                      <Plus className="size-5" />
                      <h1>Add Bcc</h1>
                    </div>
                  </div>
                </div>

                {[...Array(cc)].map((element, index) => {
                  return (
                    <div key={index} className="flex items-center gap-5 mb-3">
                      <h1 className="font-bold">Cc: </h1>
                      <input
                        type="text"
                        value={ccEmails[index] || ""}
                        onChange={(e) => handleCcEmail(e.target.value, index)}
                        className="input input-primary w-[50%] bg-base-200"
                        placeholder={`Enter Recipient ${index + 1}`}
                      />

                      <div
                        className="flex items-center justify-center p-2 bg-base-300 rounded-md cursor-pointer"
                        onClick={() => {
                          removeCcEmails(index);
                          setCc(cc - 1);
                        }}
                      >
                        <X className="size-4" />
                      </div>
                    </div>
                  );
                })}
                {[...Array(bcc)].map((element, index) => {
                  return (
                    <div key={index} className="flex items-center gap-5 mb-3">
                      <h1 className="font-bold">Bcc: </h1>
                      <input
                        type="text"
                        value={bccEmails[index] || ""}
                        onChange={(e) => handleBccEmail(e.target.value, index)}
                        className="input input-primary w-[50%] bg-base-200"
                        placeholder={`Enter Recipient ${index + 1}`}
                      />

                      <div
                        className="flex items-center justify-center p-2 bg-base-300 rounded-md cursor-pointer"
                        onClick={() => {
                          removeBccEmails(index);
                          setBcc(bcc - 1);
                        }}
                      >
                        <X className="size-4" />
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col justify-center w-full gap-1.5">
                    <h1 className="font-bold">Subject</h1>
                  <input type="text" className="w-[60%] input input-primary bg-base-200" value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject" />
                </div>
                <div className="flex justify-center flex-col gap-1.5">
                  <h1 className="font-bold">Upload Attachments <span className="text-accent">*File Should Not Be Greater Than 22 MB*</span></h1>
                  <div className="flex items-center gap-1.5">
                  <input type="file" className="file-input file-input-primary" multiple onChange={handleAttachmentUpload}/>
                  {uploading && <Loader2 className="animate-spin text-primary"/>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <select defaultValue={language.toUpperCase()} onChange={(e)=>{setLanguage(e.target.value.toLowerCase()); setText("")}} className="select">
                    <option>Text</option>
                    <option>HTML</option>
                  </select>

                  <Editor
                    height={"400px"}
                    language={language}
                    defaultValue=""
                    value={text}
                    theme="vs-dark"
                    onChange={(newValue) => {
                      // console.log(newValue);
                      setText(newValue);
                      language == "html" && (ref.current.innerHTML = newValue);
                    }}
                  />
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-500">
                    Recipients:{" "}
                    {emails.filter((element) => element !== "").length +
                      ccEmails.filter((element) => element !== "").length +
                      bccEmails.filter((element) => element !== "").length}
                  </div>
                  <div
                    className="flex gap-3"
                    onClick={() => {
                      if(emails[0] == "") return toast.error("No Recipients")
                      if(text.trim().length == 0) return toast.error("No Message")
                      toast.promise(sendMail(subject.trim() || "", text.trim(), attachment), {
                        loading: "Sending...",
                        success: <p>Email Sent Successfully</p>,
                        error: <p>Error While Sending Mail.</p>,
                      });
                    }}
                  >
                    <button className="px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center rounded-md p-3">
                      <Send className="w-4 h-4 mr-2" />
                      <h1 className="font-semibold">Send Mail</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-300 w-[90%] m-auto rounded-lg p-10">
        <div className="flex items-center py-3 border-b">
          <h1 className="font-bold text-lg">Preview</h1>
        </div>
        <div className="flex items-center h-full" >
          {language == "html" && <div className="w-full" ref={ref}></div>}
          {language == "text" && (
            <Markdown remarkplugins={[remarkGfm]}>
              {text.length == 0
                ? "Write You Message To See The Preview"
                : `\`\`\`js\n${text}\n\`\`\``}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
}
