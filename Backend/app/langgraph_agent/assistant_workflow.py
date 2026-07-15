import json

from langchain_core.messages import ToolMessage
from langgraph.prebuilt import create_react_agent
from app.langgraph_agent.system_prompt import SYSTEM_PROMPT

from app.services.groq_service import llm

from app.langgraph_agent.tools.log_interaction import log_interaction
from app.langgraph_agent.tools.edit_interaction import edit_interaction
from app.langgraph_agent.tools.summary_tool import summary_tool
from app.langgraph_agent.tools.followup_tool import followup_tool
from app.langgraph_agent.tools.sentiment_tool import sentiment_tool


assistant = create_react_agent(
    model=llm,
    tools=[
        log_interaction,
        edit_interaction,
        summary_tool,
        followup_tool,
        sentiment_tool,
    ],
)


# def run_agent(message: str):
#     result = assistant.invoke(
#         {
#             "messages": [
#                 {
#                     "role": "user",
#                     "content": message,
#                 }
#             ]
#         }
#     )

#     for msg in result["messages"]:
#         if isinstance(msg, ToolMessage) and msg.name == "log_interaction":
#             return json.loads(msg.content)

#     return {
#         "response": result["messages"][-1].content
#     }

def run_agent(message: str, current_form: dict,):
    result = assistant.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": message,
                }
            ]
        }
    )

    interaction = {}

    for msg in result["messages"]:

        if not isinstance(msg, ToolMessage):
            continue

        print("Tool:", msg.name)   # Debug

        if msg.name == "log_interaction":
            interaction = json.loads(msg.content)

        elif msg.name == "summary_tool":
            interaction["summary"] = msg.content

        elif msg.name == "sentiment_tool":
            sentiment = json.loads(msg.content)
            interaction["sentiment"] = sentiment.get("sentiment", "")

        elif msg.name == "followup_tool":
            followup = json.loads(msg.content)

            interaction["follow_up_actions"] = followup.get(
                "follow_up_actions", ""
            )

            interaction["follow_up_suggestions"] = followup.get(
                "follow_up_suggestions", []
            )

    return interaction