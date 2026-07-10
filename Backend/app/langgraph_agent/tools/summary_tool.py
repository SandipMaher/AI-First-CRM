import json

from langchain_core.tools import tool

from app.services.groq_service import llm
from app.langgraph_agent.prompts import SUMMARY_TOOL_PROMPT


@tool
def summary_tool(interaction: dict) -> str:
    """
    Generate a concise summary of an interaction.
    """
   
    print("✅ SUMMARY TOOL CALLED")
    chain = SUMMARY_TOOL_PROMPT | llm

    response = chain.invoke(
        {
            "interaction": json.dumps(
                interaction,
                indent=2,
            )
        }
    )

    return response.content.strip()