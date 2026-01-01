import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useMailerStore = create((set, get)=>({
    emails: [''],
    ccEmails: [''],
    bccEmails: [''],
    setEmails: async(emails)=>{
        set({ emails })
    },
    handleEmailChange: async(email, index)=>{
        const emailsCopy = [...get().emails];
        const foundEmail = get().emails.find((element, index)=>element == email);
        // console.log(foundEmail)
        if(foundEmail){
            emailsCopy.splice(index, 1)
            set({ emails: emailsCopy })
             return toast.error(`Duplicate Emails: ${foundEmail}`)}
        emailsCopy.splice(index, 1, email.trim());
        // console.log(emailsCopy)
        set({ emails: emailsCopy })
    },
    removeEmail: async(index)=>{
        const emailsCopy = [...get().emails];
        emailsCopy.splice(index,1);
        // console.log(emailsCopy);
        set({ emails: emailsCopy })
    },
    handleCcEmail: async(email, index)=>{
        const ccEmailsCopy = [...get().ccEmails];
        const foundEmail = get().ccEmails.find((element, index)=>element == email);
        // console.log(foundEmail)
        if(foundEmail){
            ccEmailsCopy.splice(index, 1)
            set({ ccEmails: ccEmailsCopy })
             return toast.error(`Duplicate Emails: ${foundEmail}`)}
        ccEmailsCopy.splice(index, 1, email.trim());
        // console.log("Cc: ", ccEmailsCopy);
        set({ ccEmails: ccEmailsCopy })
    },
    removeCcEmails: async(index)=>{
        const ccEmailsCopy = [...get().ccEmails];
        ccEmailsCopy.length == 1 ? ccEmailsCopy.splice(index, 1, ""): ccEmailsCopy.splice(index, 1);
        // console.log(ccEmailsCopy);
        set({ ccEmails: ccEmailsCopy });
    },
    handleBccEmail: async(email, index)=>{
        const bccEmailsCopy = [...get().bccEmails];
        const foundEmail = get().bccEmails.find((element, index)=>element == email);
        // console.log(foundEmail)
        if(foundEmail){
            bccEmailsCopy.splice(index, 1)
            set({ bccEmails: bccEmailsCopy })
             return toast.error(`Duplicate Emails: ${foundEmail}`)}
        bccEmailsCopy.splice(index, 1, email.trim());
        // console.log("Bcc: ", bccEmailsCopy);
        set({ bccEmails: bccEmailsCopy })
    },
    removeBccEmails: async(index)=>{
        const bccEmailsCopy = [...get().bccEmails];
        bccEmailsCopy.length == 1 ? bccEmailsCopy.splice(index, 1, ""): bccEmailsCopy.splice(index, 1);
        // console.log(bccEmailsCopy);
        set({ bccEmails: bccEmailsCopy });
    },
    sendMail: async(subject, message, attachment)=>{
        if(message.length == 0) return toast.error("No Message Body");
        // console.log(attachment)
        let emailsCopy = [...get().emails];
        let ccCopy = [...get().ccEmails];
        let bccCopy = [...get().bccEmails];
        if(emailsCopy[emailsCopy.length-1] == ""){
            emailsCopy.splice(emailsCopy.length-1, 1);
        }
        if(ccCopy[ccCopy.length-1] == ""){
            ccCopy.splice(ccCopy.length-1, 1)
        }
        if(bccCopy[bccCopy.length-1] == ""){
            bccCopy.splice(ccCopy.length-1, 1)
        }
        if(emailsCopy.length == 0) return toast.error("No Recipients");
        try{
            const response = await axiosInstance.post("/mail/sendmail", {recipients: [[...emailsCopy], [...ccCopy], [...bccCopy]], subject, message, attachment: attachment});
            // console.log(response.data)
        }catch(e){
            // console.log(e);
        }
    },

    
}))