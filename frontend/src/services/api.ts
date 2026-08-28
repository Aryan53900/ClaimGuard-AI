import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: BASE_URL
});
export const downloadPdfReport = async (reportData: any) => {
  const response = await api.post('/export-pdf', reportData, {
    responseType: 'blob',
  });
  return response.data;
};
export const getUnifiedReport = async (claimData: any, image: File) => {
  const formData = new FormData();
  
  // Convert the structured claim data object into a JSON string
  formData.append('claim_data', JSON.stringify(claimData));
  
  // Attach the raw image file
  formData.append('image', image);

  const response = await api.post('/unified-report', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};