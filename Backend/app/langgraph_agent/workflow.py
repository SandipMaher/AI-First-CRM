from typing import TypedDict

from langgraph.graph import StateGraph, END

from app.services.groq_service import (
    analyze_interaction,
    parse_ai_response,
)


class InteractionState(TypedDict):
    hcp_name: str
    interaction_type: str
    notes: str

    summary: str
    sentiment: str
    follow_up: str


def analyze_node(state: InteractionState):

    ai_response = analyze_interaction(
        hcp_name=state["hcp_name"],
        interaction_type=state["interaction_type"],
        notes=state["notes"],
    )

    parsed = parse_ai_response(ai_response)

    return {
        "summary": parsed["summary"],
        "sentiment": parsed["sentiment"],
        "follow_up": parsed["follow_up"],
    }


builder = StateGraph(InteractionState)

builder.add_node("analyze", analyze_node)

builder.set_entry_point("analyze")

builder.add_edge("analyze", END)

workflow = builder.compile()