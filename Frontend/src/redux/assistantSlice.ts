import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AssistantState {
  messages: ChatMessage[];
  currentInput: string;
  isLoading: boolean;
  error: string | null;
  suggestions: string[];
  summary: string;
  sentiment: string;
  followUp: string;
}

const initialState: AssistantState = {
  messages: [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        'Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.',
      timestamp: new Date().toISOString(),
    },
  ],

  currentInput: "",

  isLoading: false,

  error: null,

  suggestions: [
    "Schedule Follow-up Meeting",
    "Send Clinical Study PDF",
    "Invite to Webinar",
  ],

  summary: "",
sentiment: "",
followUp: "",
};

const assistantSlice = createSlice({
  name: "assistant",
  initialState,

  reducers: {
    setCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },

    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: crypto.randomUUID(),
        role: "user",
        content: action.payload,
        timestamp: new Date().toISOString(),
      });

      state.currentInput = "";
    },

    addAssistantMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: crypto.randomUUID(),
        role: "assistant",
        content: action.payload,
        timestamp: new Date().toISOString(),
      });
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearChat: (state) => {
      state.messages = initialState.messages;
      state.currentInput = "";
      state.isLoading = false;
      state.error = null;
    },

    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },

    setAIResponse: (
  state,
  action: PayloadAction<{
    summary: string;
    sentiment: string;
    followUp: string;
  }>
) => {
  state.summary = action.payload.summary;
  state.sentiment = action.payload.sentiment;
  state.followUp = action.payload.followUp;
},
  },
});

export const {
  setCurrentInput,
  addUserMessage,
  addAssistantMessage,
  setLoading,
  setError,
  clearChat,
  setSuggestions,
  setAIResponse,
} = assistantSlice.actions;

export default assistantSlice.reducer;