import json
from datetime import datetime

from langchain_core.tools import tool

from app.services.groq_service import llm
from app.langgraph_agent.prompts import LOG_INTERACTION_PROMPT



@tool
def log_interaction(user_message: str) -> dict:
    """
    Extract interaction details from a natural language conversation
    and return structured JSON for auto-filling the interaction form.

    Use ONLY when creating a NEW interaction.

    Never use this tool for editing.
  
    """
   
    print("✅ LOG_INTERACTION TOOL CALLED")
    print(f"User Message: {user_message}")

    now = datetime.now()

    today = now.strftime("%Y-%m-%d")
    current_time = now.strftime("%H:%M")

    chain = LOG_INTERACTION_PROMPT | llm

    response = chain.invoke(
        {
            "today": today,
            "current_time": current_time,
            "message": user_message,
        }
    )

    content = response.content.strip()

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)