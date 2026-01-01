import { axiosInstance } from "../lib/axiosInstance";

export const uploadAttachments = async (formData) => {
  try {
    const response = await axiosInstance.post("/mail/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Uploaded URLs: ", response.data.urls);
    return response.data.urls;
  } catch (e) {
    console.log("Upload FE: ", e);
  }
};
