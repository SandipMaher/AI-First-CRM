import json
from datetime import datetime
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

from app.core.config import settings

llm = ChatGroq(
    groq_api_key=settings.GROQ_API_KEY,
    model="llama-3.3-70b-versatile",
    # model="llama-3.1-8b-instant",
    temperature=0.3,
)

prompt = ChatPromptTemplate.from_template(
    """
You are an AI CRM assistant.

Analyze the following interaction.

Doctor:
{hcp_name}

Interaction Type:
{interaction_type}

Notes:
{notes}

Return ONLY this format:

Summary:
<summary>

Sentiment:
Positive | Neutral | Negative

Follow Up:
<follow-up recommendation>
"""
)


chat_parse_prompt = ChatPromptTemplate.from_template(
    """
You are an AI assistant that extracts structured information from medical interaction notes.

Current Date:
{today}

Current Time:
{current_time}

Extract the following fields.

Return ONLY valid JSON.

JSON format:

{{
    "hcp_name":"",
    "interaction_type":"",
    "date":"",
    "time":"",
    "attendees":[],
    "topics":"",
    "materials":"",
    "sentiment":"",
    "outcomes":"",
    "follow_up":""
}}

Rules:

- Return ONLY valid JSON.
- Do not explain anything.
- attendees must always be an array.
- If interaction type is not mentioned, use "Meeting".
- If date is not mentioned, use the Current Date.
- If time is not mentioned, use the Current Time.
- If any other field is missing, return an empty string.

Interaction:

{message}
"""
)


def analyze_interaction(
    hcp_name: str,
    interaction_type: str,
    notes: str,
):
    chain = prompt | llm

    response = chain.invoke(
        {
            "hcp_name": hcp_name,
            "interaction_type": interaction_type,
            "notes": notes,
        }
    )

    return response.content


def parse_ai_response(response: str):
    data = {
        "summary": "",
        "sentiment": "",
        "follow_up": "",
    }

    current_field = None

    for line in response.splitlines():
        line = line.strip()

        if line.startswith("Summary:"):
            current_field = "summary"
            data["summary"] = line.replace("Summary:", "").strip()

        elif line.startswith("Sentiment:"):
            current_field = "sentiment"
            data["sentiment"] = line.replace("Sentiment:", "").strip()

        elif line.startswith("Follow Up:"):
            current_field = "follow_up"
            data["follow_up"] = line.replace("Follow Up:", "").strip()

        elif current_field and line:
            data[current_field] += " " + line

    return data



def parse_chat_message(message: str):
    now = datetime.now()

    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%H:%M")

    chain = chat_parse_prompt | llm

    response = chain.invoke(
        {
            "message": message,
            "today": today,
            "current_time": current_time,
        }
    )

    content = response.content.strip()

    # Remove markdown if model returns ```json
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)