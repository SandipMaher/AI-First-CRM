from langgraph.prebuilt import create_react_agent

from app.services.groq_service import llm

from app.langgraph_agent.tools.log_interaction import log_interaction
from app.langgraph_agent.tools.edit_interaction import edit_interaction
from app.langgraph_agent.tools.summary_tool import summary_tool
from app.langgraph_agent.tools.followup_tool import followup_tool
from app.langgraph_agent.tools.sentiment_tool import sentiment_tool


tools = [
    log_interaction,
    edit_interaction,
    summary_tool,
    followup_tool,
    sentiment_tool,
]

agent = create_react_agent(
    model=llm,
    tools=tools,
)


def run_agent(message: str):
    result = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": message,
                }
            ]
        }
    )

    return result["messages"][-1].content