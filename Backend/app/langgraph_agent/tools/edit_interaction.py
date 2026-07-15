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
Use this tool ONLY when an interaction already exists
and the user wants to modify it.

Examples

- change meeting time
- add attendee
- remove attendee
- update topics
- change HCP name

Never use this tool for creating a new interaction.

Returns ONLY the modified fields.
"""

    print("✅ EDIT TOOL CALLED")

    chain = EDIT_INTERACTION_PROMPT | llm

    response = chain.invoke(
        {
            "current_form": json.dumps(
                current_form,
                indent=2,
                ensure_ascii=False,
            ),
            "user_message": user_message,
        }
    )

    content = response.content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "").strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        print("Invalid JSON returned:")
        print(content)
        return {}