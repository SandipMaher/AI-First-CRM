from typing import TypedDict, Optional


class AssistantState(TypedDict):
    # User's latest message
    user_message: str

    # Current form values (used by Edit Tool later)
    current_form: dict

    # Which tool the agent selected
    selected_tool: Optional[str]

    # Result returned by the executed tool
    tool_result: dict