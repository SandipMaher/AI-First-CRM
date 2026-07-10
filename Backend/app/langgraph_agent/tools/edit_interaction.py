import json

from langchain_core.tools import tool

from app.services.groq_service import llm
from app.langgraph_agent.prompts import (
    EDIT_INTERACTION_PROMPT,
)


@tool
def edit_interaction(
    current_form: dict,
    user_message: str,
) -> dict:
    """
    Update only the modified interaction fields.
    """
   
    print("✅ EDIT TOOL CALLED")
    chain = EDIT_INTERACTION_PROMPT | llm

    response = chain.invoke(
        {
            "current_form": json.dumps(
                current_form,
                indent=2,
            ),
            "user_message": user_message,
        }
    )

    content = response.content.strip()

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)