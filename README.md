# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) AI-First CRM HCP application developed.

The project implements the **Log Interaction Screen** for an AI-first CRM system. It includes a React frontend with Redux state management, a Python with FastAPI backend, Postgres SQL Database,
LangGraph AI Agent Framework for AI workflow orchestration, and Groq LLM integration to assist with interaction logging and related AI-powered operations.

---

## LangGraph AI Agent

The LangGraph agent acts as an AI assistant that understands the user's request and automatically selects the appropriate tool to complete the task.

1) Log Interaction:
Extracts interaction details from the user's prompt and automatically fills the interaction form with the relevant information.

2) Edit Interaction: 
Updates existing interaction details based on the user's instructions without requiring manual form edits.

3) Generate Summary: 
Creates a short summary of the logged interaction, highlighting the key discussion points.

4) Sentiment Analysis:
Analyzes the conversation to identify the overall sentiment, such as positive, neutral, or negative.

5) Generate Follow-up:
Generates follow-up suggestions based on the interaction details and discussion.

## Features

- Log HCP interactions using a structured form or AI assistant
- AI-powered extraction of interaction details
- Edit previously logged interactions
- Generate AI-based interaction summaries
- Analyze interaction sentiment
- Generate follow-up suggestions
- LangGraph-based AI workflow
- FastAPI REST API with PostgreSQL integration

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### AI & Workflow
- LangGraph
- Groq API (Gemma2-9B-IT)

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/<your-username>/AI-FIRST-CRM.git
cd AI-FIRST-CRM
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd Backend
```

Create and activate a virtual environment.

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file using the provided `.env.example`.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ai_first_crm
GROQ_API_KEY=your_groq_api_key
```

Run the backend server.

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## AI Workflow

1. User provides an interaction through the form or AI Assistant.
2. LangGraph routes the request to the appropriate tool.
3. Groq LLM processes the interaction.
4. The AI-generated response is returned and displayed in the application.

---

## Assignment Requirements Implemented

- Log Interaction Screen
- React + Redux frontend
- FastAPI backend
- LangGraph AI Agent
- Five AI tools implementation
- Groq LLM integration
- PostgreSQL database
- CRUD operations for interactions

---

## Author

**Sandip Maher**

<img width="772" height="737" alt="image" src="https://github.com/user-attachments/assets/5fbf7aef-3c16-4ea4-a003-11896413c205" />

<img width="749" height="733" alt="Screenshot 2026-07-10 at 5 41 18 PM" src="https://github.com/user-attachments/assets/309a51c6-dc7b-43bc-bfc3-97dfe37d7949" />


 
