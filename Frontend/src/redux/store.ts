import { configureStore } from "@reduxjs/toolkit";

import interactionReducer from "./interactionSlice";
import assistantReducer from "./assistantSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    interaction: interactionReducer,
    assistant: assistantReducer,
    ui: uiReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;