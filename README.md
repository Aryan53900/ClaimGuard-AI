# ClaimGuard AI 🛡️

A full-stack, cloud-deployed intelligent system designed to automate insurance claim adjudication. ClaimGuard AI fuses traditional tabular machine learning (XGBoost) with generative computer vision (Google Gemini) to evaluate financial risk and physically verify vehicle damage in real-time.

### 🚀 Live Demo
*   **Frontend Client:** [https://claimguard-git-main-aryan53900s-projects.vercel.app/]
*   **Backend API:** [soon updated]

### ✨ Key Features
*   **Dual-Modal Fraud Detection:** Cross-references numerical policy data against physical, unstructured image evidence to flag suspicious discrepancies.
*   **Generative Visual Assessment:** Automatically categorizes collision severity and extracts damaged vehicle parts from user-uploaded images.
*   **Dynamic Document Generation:** Renders on-the-fly, professional PDF assessment reports integrating AI risk scores and embedded accident imagery.
*   **Decoupled 3-Tier Architecture:** Built on a strict separation of concerns (Presentation, Business Logic, and Data/ML layers) for high scalability.

### 💻 Tech Stack
*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Python, FastAPI, Uvicorn
*   **AI & Machine Learning:** XGBoost (Tabular prediction), Google Gemini Vision API (Image analysis)
*   **Document Processing:** Jinja2, xhtml2pdf
*   **Deployment:** Vercel (Client), Render (API)

### ⚙️ System Architecture Flow
1.  **Data Ingestion:** User submits claim details and accident photos via the React UI using `multipart/form-data`.
2.  **API Routing:** FastAPI receives the payload, temporarily caching images for local processing.
3.  **Inference Layer:** 
    *   XGBoost analyzes the numerical data to generate a fraud probability score.
    *   Gemini Vision API analyzes the image to classify damage severity.
4.  **Data Fusion & Reporting:** The backend merges these insights, populates a Jinja2 HTML template, and converts it into a downloadable PDF via xhtml2pdf.

### 🛠️ Local Installation

**1. Clone the Repository**
```bash
git clone [https://github.com/Aryan53900/ClaimGuard-AI.git](https://github.com/Aryan53900/ClaimGuard-AI.git)
cd ClaimGuard-AI
