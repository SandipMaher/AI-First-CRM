import json

from langchain_core.tools import tool

from app.services.groq_service import llm
from app.langgraph_agent.prompts import (
    SENTIMENT_TOOL_PROMPT,
)


@tool
def sentiment_tool(interaction: dict) -> dict:
    """
    Analyze interaction sentiment.
    """

    print("✅ SENTIMENT TOOL CALLED")
    chain = SENTIMENT_TOOL_PROMPT | llm

    response = chain.invoke(
        {
            "interaction": json.dumps(
                interaction,
                indent=2,
            )
        }
    )

    content = response.content.strip()

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)