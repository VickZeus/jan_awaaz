# JanAwaaz 🇮🇳

> An AI-powered citizen grievance reporting and management platform.

JanAwaaz is a smart grievance management platform designed to help citizens report public issues and connect them with the appropriate authorities.

Instead of relying on traditional complaint systems, JanAwaaz allows citizens to submit grievances using **text, images, videos, and location data**. The system can analyze and categorize complaints, identify duplicate issues, estimate severity, and help authorities prioritize and resolve problems efficiently.

---

## 🚀 Features

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Secure HTTP-only cookies
- Protected API routes

### 📢 Grievance Reporting
Citizens can report issues by providing:
- 📝 Text descriptions
- 📷 Images
- 🎥 Videos
- 📍 Location information

### 🤖 AI-Powered Analysis
The platform is designed to support:
- Automatic issue classification
- Duplicate grievance detection
- Severity estimation
- Image-based issue verification
- Intelligent grievance prioritization

### 📊 Grievance Management
- Track submitted grievances
- View grievance status
- Search and filter complaints
- Identify similar complaints
- Group duplicate or related issues

### 🏛️ Authority Management
The system can help identify the appropriate department or authority responsible for resolving a reported issue.

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- REST APIs

### Database
- Supabase
- PostgreSQL

### Authentication & Security
- JWT
- bcrypt
- HTTP-only cookies

### AI / Machine Learning
- Python
- Machine Learning / Deep Learning
- NLP
- Computer Vision
- Sentence Transformers

### Future / Planned Technologies
- Redis
- Vector Database (Qdrant / Pinecone)
- YOLO
- LLM-based summarization

---

## 🏗️ System Architecture

```text
                 ┌───────────────────┐
                 │      Citizen      │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │    Next.js App    │
                 │   Web Interface   │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   Authentication  │
                 │    JWT + bcrypt    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   Grievance API   │
                 └─────────┬─────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌───────────────────┐
   │     Supabase      │       │    AI Pipeline    │
   │    PostgreSQL     │       │ Classification    │
   └───────────────────┘       │ Duplicate Check   │
                               │ Severity Analysis │
                               └─────────┬─────────┘
                                         │
                                         ▼
                               ┌───────────────────┐
                               │   Authorities     │
                               │  & Departments    │
                               └───────────────────┘
