import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export async function analyzeImage(
  image: File
) {
  const formData = new FormData();

  formData.append(
    "image",
    image
  );

  const response = await axios.post(
    `${BASE_URL}/analyze-image`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
}