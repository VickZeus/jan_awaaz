# JanAwaaz 🇮🇳

### A Citizen-Centric Grievance Reporting and Civic Issue Management Platform

JanAwaaz is a web-based civic grievance platform designed to make it easier for citizens to report public issues and for communities to discover, track, and prioritize problems in their surroundings.

The platform allows users to submit grievances with supporting information such as descriptions, images, videos, and geographical location. It provides a centralized feed where citizens can discover reported issues and interact with them through community engagement mechanisms.

The long-term goal of JanAwaaz is to incorporate AI-assisted complaint classification, duplicate detection, severity estimation, and intelligent prioritization to help authorities process large volumes of civic complaints more efficiently.

---

## 🚀 Live Application

**Live Demo:** https://janawaaz.vercel.app/

**GitHub Repository:** https://github.com/VickZeus/jan_awaaz

---

# 🎯 Problem Statement

Traditional grievance systems often face several challenges:

* Multiple citizens may report the same issue independently.
* Complaints may lack sufficient context or evidence.
* Large numbers of complaints make manual prioritization difficult.
* Citizens may not know whether an issue has already been reported.
* Location-specific civic issues can be difficult to discover.
* Authorities may struggle to identify which complaints require immediate attention.

JanAwaaz aims to provide a more community-driven and technology-assisted approach to civic issue reporting.

---

# 💡 Core Concept

The platform follows a simple workflow:

```text
Citizen
   │
   ▼
Report a Civic Issue
   │
   ├── Description
   ├── Images
   ├── Videos
   └── Location
   │
   ▼
JanAwaaz Platform
   │
   ├── Store & Manage Complaint
   ├── Display in Community Feed
   ├── Location-Based Discovery
   └── Community Engagement
   │
   ▼
Future AI Processing
   │
   ├── Complaint Classification
   ├── Duplicate Detection
   ├── Severity Estimation
   ├── Priority Scoring
   └── Intelligent Authority Routing
```

---

# ✨ Implemented Features

The following functionality is currently implemented in the application.

## 🔐 User Authentication

* User registration and login
* Password-based authentication
* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookies for authentication tokens
* Protected application routes and API operations
* User session handling

---

## 📝 Grievance Reporting

Users can report civic issues through the platform.

A grievance can contain:

* Issue description
* Supporting images
* Video/media information
* Geographical location
* Relevant issue category/type

The submitted grievance is persisted in the backend database and becomes available through the application's grievance feed.

---

## 📍 Location-Aware Grievances

JanAwaaz supports location information associated with reported grievances.

This enables location-based functionality such as:

* Discovering issues near a user
* Associating grievances with geographical coordinates
* Filtering complaints based on proximity

The "Near Me" functionality is intended to help citizens identify problems reported in their surrounding area.

---

## 📰 Community Grievance Feed

The application provides a centralized feed for discovering reported grievances.

The feed supports different views/categories such as:

* Trending
* Recent
* Near Me
* Popular

This allows users to discover civic issues based on different relevance criteria.

---

## 👍 Community Engagement

Users can interact with reported grievances through community engagement functionality.

This enables the platform to capture community interest in reported issues and can serve as a foundation for future community-driven prioritization.

---

## 🖼️ Multimedia Support

Grievances can include supporting media such as:

* Images
* Videos

This allows citizens to provide visual evidence and additional context about reported civic issues.

---

## 👤 User Profiles

The application provides user-specific functionality and profile-related information associated with submitted grievances and user activity.

---

## 🗄️ Database Integration

The application uses Supabase/PostgreSQL for persistent data storage.

The database is responsible for storing application data including:

* User information
* Grievances
* Grievance metadata
* Location information
* Community interactions

---

## 🔌 API Integration

The application contains backend API routes responsible for operations such as:

* User authentication
* Grievance creation
* Grievance retrieval
* Grievance updates
* User-specific operations
* Community interactions

The frontend communicates with these backend APIs to perform application operations.

---

# 🏗️ Technology Stack

## Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS

## Backend

* Next.js API Routes
* Node.js runtime

## Database

* Supabase
* PostgreSQL

## Authentication & Security

* JWT
* bcrypt
* HTTP-only cookies

## Deployment

* Vercel

---

# 🧩 High-Level Architecture

```text
                        ┌─────────────────────┐
                        │       Citizen       │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │   Next.js Frontend  │
                        │                     │
                        │  • Report Issue     │
                        │  • View Feed        │
                        │  • Near Me          │
                        │  • User Profile     │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │   Backend / APIs    │
                        │                     │
                        │  • Authentication   │
                        │  • Grievances      │
                        │  • User Operations  │
                        │  • Interactions     │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │ Supabase / Postgres │
                        │                     │
                        │  • Users            │
                        │  • Grievances       │
                        │  • Metadata         │
                        │  • Interactions     │
                        └─────────────────────┘
```

---

# 🤖 AI/ML Roadmap

AI/ML functionality is a major planned component of the JanAwaaz platform.

The objective is to reduce manual effort in processing large volumes of citizen complaints.

The following components are planned or under development:

## 🔵 Automated Complaint Classification

Automatically identify the category of a grievance from its description and supporting information.

Potential categories may include:

* Road damage
* Garbage/waste
* Water supply
* Street lighting
* Drainage
* Public infrastructure
* Traffic-related issues
* Other civic problems

---

## 🔵 Duplicate Grievance Detection

Identify semantically similar complaints submitted by different users.

For example:

```text
User A:
"Large pothole near the main road."

User B:
"There is a huge road hole near the bus stop."

```

The system should identify that both complaints may refer to the same underlying issue.

Potential technologies:

* Sentence Transformers
* Embeddings
* Vector similarity search
* Vector databases such as Qdrant or Pinecone

---

## 🔵 Severity Estimation

Estimate the potential severity or urgency of a grievance using information such as:

* Issue category
* Description
* Location
* Supporting image
* Community activity
* Number of affected users

---

## 🔵 Intelligent Priority Scoring

A future priority engine could combine multiple signals:

```text
Priority Score
      │
      ├── Issue Severity
      ├── Number of Affected Citizens
      ├── Location Density
      ├── Community Engagement
      ├── Duplicate Complaint Count
      └── Government-defined Urgency
```

This could help authorities focus on high-impact complaints first.

---

## 🔵 Image-Based Verification

Computer vision models may be used to analyze uploaded images and identify whether the visual evidence is relevant to the reported complaint.

Potential technologies include:

* YOLO
* Computer Vision models
* Image classification

---

## 🔵 AI-Assisted Summarization

An LLM-based system could generate concise summaries of lengthy citizen complaints to help authorities quickly understand the reported issue.

---

## 🔵 Intelligent Authority Routing

The long-term goal is to automatically identify the appropriate department or authority responsible for resolving a particular grievance.

For example:

```text
Road Pothole
     ↓
Road / Municipal Department

Garbage Accumulation
     ↓
Waste Management Department

Street Light Failure
     ↓
Electrical / Municipal Department
```

---

# 📊 Current Development Status

| Component                        | Status                         |
| -------------------------------- | ------------------------------ |
| Next.js Frontend                 | ✅ Implemented                  |
| User Registration                | ✅ Implemented                  |
| User Login                       | ✅ Implemented                  |
| Password Hashing                 | ✅ Implemented                  |
| JWT Authentication               | ✅ Implemented                  |
| HTTP-only Authentication Cookies | ✅ Implemented                  |
| Grievance Creation               | ✅ Implemented                  |
| Text-based Grievance Details     | ✅ Implemented                  |
| Image/Media Support              | ✅ Implemented                  |
| Location Information             | ✅ Implemented                  |
| Grievance Feed                   | ✅ Implemented                  |
| Recent Issues                    | ✅ Implemented                  |
| Popular/Trending Views           | ✅ Implemented                  |
| Near Me Functionality            | ✅ Implemented                  |
| Community Interaction            | ✅ Implemented                  |
| Supabase/PostgreSQL Integration  | ✅ Implemented                  |
| Backend API Routes               | ✅ Implemented                  |
| Vercel Deployment                | ✅ Implemented                  |
| AI Complaint Classification      | 🔵 Planned / Under Development |
| Semantic Duplicate Detection     | 🔵 Planned                     |
| Severity Estimation              | 🔵 Planned                     |
| AI Priority Scoring              | 🔵 Planned                     |
| Image Verification               | 🔵 Planned                     |
| Vector Database Integration      | 🔵 Planned                     |
| LLM Summarization                | 🔵 Planned                     |
| Intelligent Authority Routing    | 🔵 Planned                     |
| Authority/Admin Dashboard        | 🔵 Planned                     |

> **Note:** The AI/ML components listed above represent the planned evolution of the platform. The current production deployment primarily focuses on the core grievance reporting, community, location, authentication, and data management functionality.

---

# 🔒 Security Considerations

JanAwaaz uses several security mechanisms:

* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookies
* Protected API routes
* Environment variables for sensitive configuration
* Server-side handling of protected operations

Future security improvements may include:

* Rate limiting
* CSRF protection where applicable
* Advanced input validation
* File upload validation
* File size restrictions
* Abuse prevention
* Automated spam detection
* Role-based access control for authorities

---

# 📈 Future Roadmap

The future development of JanAwaaz is focused on transforming the platform from a grievance reporting system into an intelligent civic issue management platform.

### Phase 1 — Core Platform

* [x] Authentication
* [x] Grievance reporting
* [x] Multimedia support
* [x] Location support
* [x] Community feed
* [x] Community interactions

### Phase 2 — AI-Assisted Processing

* [ ] Automated complaint classification
* [ ] Duplicate complaint detection
* [ ] Severity estimation
* [ ] Priority scoring

### Phase 3 — Intelligent Processing

* [ ] Vector database integration
* [ ] Image-based complaint verification
* [ ] LLM-based summarization
* [ ] Automated authority routing

### Phase 4 — Authority Ecosystem

* [ ] Authority dashboard
* [ ] Complaint assignment
* [ ] Status updates
* [ ] Resolution tracking
* [ ] Analytics and reporting
* [ ] SLA monitoring

### Phase 5 — Scalability

* [ ] Redis-based caching
* [ ] Asynchronous AI processing
* [ ] Background job queues
* [ ] Scalable ML inference services
* [ ] Monitoring and observability

---

# 🧠 Engineering Challenges

Some of the key engineering challenges involved in building JanAwaaz include:

### Authentication

Designing secure user authentication and session management using JWTs and HTTP-only cookies.

### Multimedia Handling

Managing user-uploaded images and videos while maintaining application performance and storage efficiency.

### Location-Based Queries

Handling geographical data and retrieving grievances based on proximity to a user's location.

### Community Prioritization

Designing mechanisms that can distinguish between issues that are merely frequently reported and issues that are genuinely high priority.

### Duplicate Detection

The future AI system must identify complaints that describe the same real-world issue even when users use completely different wording.

### Scalability

The system must eventually handle large numbers of concurrent grievance submissions and AI processing tasks.

---

# 🛠️ Running Locally

Clone the repository:

```bash
git clone https://github.com/VickZeus/jan_awaaz.git
```

Navigate to the project:

```bash
cd jan_awaaz
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

# 🌱 Project Vision

JanAwaaz aims to evolve into an intelligent civic technology platform where citizens can report public issues and communities can collectively surface the problems that matter most.

The long-term vision is to combine:

```text
Citizen Reports
       +
Multimedia Evidence
       +
Geographical Context
       +
Community Signals
       +
AI/ML Analysis
       ↓
Intelligent Civic Issue Prioritization
       ↓
Efficient Authority Response
```

The goal is not only to provide a platform for reporting problems, but to help transform large volumes of unstructured citizen complaints into actionable, prioritized civic information.

---

## 👨‍💻 Author

**Abhishek Singh**

B.Tech Computer Science & Engineering
VIT-AP University

---

## 📄 License

This project is currently developed as an academic and portfolio project.
