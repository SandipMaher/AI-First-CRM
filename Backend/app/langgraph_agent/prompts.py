from langchain_core.prompts import ChatPromptTemplate

LOG_INTERACTION_PROMPT = ChatPromptTemplate.from_template(
    """
You are an AI CRM Assistant.

Your task is to extract structured interaction details from the user's message.

Today's Date:
{today}

Current Time:
{current_time}

Return ONLY valid JSON.

JSON format:

{{
    "hcp_name":"",
    "interaction_type":"",
    "date":"",
    "time":"",
    "attendees":[],
    "topics":"",
    "materials":[],
    "samples":[],
    "sentiment":"",
    "outcomes":"",
    "follow_up_actions":""
}}

Rules:

- Return ONLY JSON.
- Never explain anything.
- Never use markdown.

- Determine the interaction type from the user's message.

Interaction Type Rules:
- If the message mentions "visit", "visited", or "visiting", return "Visit".
- If the message mentions "meeting", "met", or "meet", return "Meeting".
- If the message mentions "call", "phone call", or "telephone", return "Call".
- If the message mentions "email", "emailed", or "mail", return "Email".
- If the message mentions "conference", "seminar", "webinar", or "event", return "Conference".
- Only use "Meeting" if no interaction type can be determined.

- If date is missing, use Today's Date.
- If time is missing, use Current Time.

- Extract only information explicitly mentioned.
- attendees must always be an array.
- materials must always be an array.
- samples must always be an array.

- sentiment must be one of:
  Positive
  Neutral
  Negative
User Interaction:

{message}
"""
)



# EDIT_INTERACTION_PROMPT = ChatPromptTemplate.from_template(
#     """
# You are an AI CRM Assistant.

# The user wants to modify an already filled interaction form.

# Current Form:

# {current_form}

# User Request:

# {user_message}

# Your task:

# Return ONLY the fields that need to be updated.

# Do NOT return unchanged fields.

# Return ONLY valid JSON.

# Example:

# Current Form:

# {{
#     "hcp_name":"Dr Smith",
#     "sentiment":"Positive",
#     "topics":"Product X"
# }}

# User:

# Actually doctor's name was Dr John.
# The sentiment was Negative.

# Return:

# {{
#     "hcp_name":"Dr John",
#     "sentiment":"Negative"
# }}

# Rules:

# - Return ONLY JSON.
# - Never explain anything.
# - Never use markdown.
# - Never return unchanged fields.
# - If nothing needs updating return {{}}.
# """
# )


EDIT_INTERACTION_PROMPT = ChatPromptTemplate.from_template(
"""
You are an AI CRM Assistant.

The user is editing an existing HCP interaction.

Current Interaction:

{current_form}

User Request:

{user_message}

Your task:

Update ONLY the fields explicitly mentioned by the user.

Rules:

1. Return ONLY valid JSON.
2. Return ONLY the fields that changed.
3. Never include unchanged fields.
4. Never return empty strings, null, or empty arrays for fields that were not modified.
5. Preserve all existing information unless the user explicitly changes or removes it.
6. If the user says "add", append the new value to the existing list instead of replacing it.
7. If the user says "remove", remove only the specified value.
8. If the user says "replace" or "change", overwrite that field.
9. If nothing needs updating, return {{}}.
10. Never explain anything.
11. Never use markdown.

Examples

Current:

{{
    "attendees": [
        "Vaibhav"
    ]
}}

User:

Add attendee Mahesh Sagar

Return

{{
    "attendees": [
        "Vaibhav",
        "Mahesh Sagar"
    ]
}}

---------------------

Current:

{{
    "time":"11:00"
}}

User:

Change meeting time to 3 PM

Return

{{
    "time":"15:00"
}}

---------------------

Current:

{{
    "materials":[
        "Blood Report"
    ]
}}

User:

Also shared Product Brochure

Return

{{
    "materials":[
        "Blood Report",
        "Product Brochure"
    ]
}}

---------------------

Current:

{{
    "topics":"Blood Report"
}}

User:

Also discussed hypertension

Return

{{
    "topics":"Blood Report, Hypertension"
}}
"""
)



SUMMARY_TOOL_PROMPT = ChatPromptTemplate.from_template(
    """
You are an AI CRM Assistant.

Generate a concise professional summary of the following HCP interaction.

Interaction Details:

{interaction}

Instructions:

- Keep the summary between 2 and 4 sentences.
- Mention the HCP name if available.
- Mention the discussion topic.
- Mention materials or samples shared if present.
- Mention key outcomes if present.
- Do NOT mention sentiment.
- Do NOT suggest follow-up actions.
- Return ONLY the summary text.
"""
)



# FOLLOWUP_TOOL_PROMPT = ChatPromptTemplate.from_template(
#     """
# You are an AI CRM Assistant.

# Based on the interaction below, suggest professional follow-up actions.

# Interaction:

# {interaction}

# Instructions:

# - Return ONLY a JSON array.
# - Suggest between 3 and 5 follow-up actions.
# - Keep every suggestion short.
# - Do not explain anything.
# - Do not use markdown.

# Example:

# [
#   "Schedule follow-up meeting in 2 weeks.",
#   "Share Product X Phase III brochure.",
#   "Invite doctor to upcoming webinar."
# ]
# """
# )

# FOLLOWUP_TOOL_PROMPT = ChatPromptTemplate.from_messages(
# [
# (
# "system",
# """
# You are an AI pharmaceutical CRM assistant.

# Analyze the interaction.

# Generate:

# 1. follow_up_actions
# - These are the actual agreed next steps mentioned in the conversation.

# 2. follow_up_suggestions
# - These are AI-generated recommendations that were NOT explicitly mentioned but would be useful.
# - Generate exactly 3 suggestions.

# Return ONLY valid JSON.

# {{
#   "follow_up_actions": "...",
#   "follow_up_suggestions": [
#     "...",
#     "...",
#     "..."
#   ]
# }}

# Do not include markdown.
# """
# ),
# (
# "human",
# "{interaction}"
# )
# ]
# )


FOLLOWUP_TOOL_PROMPT = ChatPromptTemplate.from_messages(
[
(
"system",
"""
You are an AI pharmaceutical CRM assistant.

Analyze the interaction and return ONLY valid JSON.

Generate the following:

1. follow_up_actions
- Return ONLY the actual next step that was explicitly agreed during the interaction.
- This should be a single short sentence.
- Do NOT repeat the meeting outcome.
- If no follow-up action was agreed, return an empty string.

Examples:
- Review patient after 5 days.
- Schedule follow-up visit next week.
- Share updated lab reports.

2. follow_up_suggestions
Generate exactly 3 AI recommendations that were NOT explicitly mentioned.

Rules:
- Each suggestion must be a single short sentence.
- Maximum 15 words.
- Start with an action verb.
- Do NOT mention the doctor's name.
- Do NOT explain the reason.
- Do NOT repeat follow_up_actions.
- Do NOT repeat the meeting outcome.


Return ONLY valid JSON.

{{
  "follow_up_actions": "",
  "follow_up_suggestions": [
    "",
    "",
    ""
  ]
}}

Do not include markdown.
"""
),
(
"human",
"{interaction}"
)
]
)


SENTIMENT_TOOL_PROMPT = ChatPromptTemplate.from_template(
    """
You are an AI CRM Assistant.

Analyze the sentiment of the following HCP interaction.

Interaction:

{interaction}

Instructions:

Return ONLY valid JSON.

Format:

{{
    "sentiment":"",
    "confidence":0
}}

Rules:

- sentiment must be one of:
  Positive
  Neutral
  Negative

- confidence must be an integer from 0 to 100.

- Return ONLY JSON.

- Do not explain anything.
"""
)