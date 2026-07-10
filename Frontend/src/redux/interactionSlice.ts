import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface InteractionForm {
  hcpName: string;
  interactionType: string;
  date: string;
  time: string;
  attendees: string[];
  topics: string;
  materials: string[];
  samples: string[];
  sentiment: string;
  outcomes: string;
  followUpActions: string;
}

interface InteractionState {
  formData: InteractionForm;
}

const initialState: InteractionState = {
  formData: {
    hcpName: "",
    interactionType: "Meeting",
    date: "",
    time: "",
    attendees: [],
    topics: "",
    materials: [],
    samples: [],
    sentiment: "neutral",
    outcomes: "",
    followUpActions: "",
  },
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof InteractionForm;
        value: InteractionForm[keyof InteractionForm];
      }>,
    ) => {
      state.formData[action.payload.field] = action.payload.value as never;
    },

    setFormData: (state, action: PayloadAction<InteractionForm>) => {
      state.formData = action.payload;
    },

    fillFormFromAI: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.formData.hcpName = action.payload.hcp_name || "";

      state.formData.interactionType =
        action.payload.interaction_type || "Meeting";
        console.log(state.formData.interactionType);

      state.formData.date = action.payload.date || "";

      state.formData.time = action.payload.time || "";

      state.formData.attendees = Array.isArray(action.payload.attendees)
        ? action.payload.attendees
        : [];

      state.formData.topics = action.payload.topics || "";

      state.formData.materials = Array.isArray(action.payload.materials)
        ? action.payload.materials
        : [];

      state.formData.samples = Array.isArray(action.payload.samples)
        ? action.payload.samples
        : [];

      state.formData.sentiment =
        action.payload.sentiment?.toLowerCase() || "neutral";

      state.formData.outcomes = action.payload.outcomes || "";

      state.formData.followUpActions = action.payload.follow_up_actions || "";
    },

    resetForm: (state) => {
      state.formData = initialState.formData;
    },

    addMaterial: (state, action: PayloadAction<string>) => {
      state.formData.materials.push(action.payload);
    },

    removeMaterial: (state, action: PayloadAction<string>) => {
      state.formData.materials = state.formData.materials.filter(
        (item) => item !== action.payload,
      );
    },

    addSample: (state, action: PayloadAction<string>) => {
      state.formData.samples.push(action.payload);
    },

    removeSample: (state, action: PayloadAction<string>) => {
      state.formData.samples = state.formData.samples.filter(
        (item) => item !== action.payload,
      );
    },
  },
});

export const {
  updateField,
  setFormData,
  fillFormFromAI,
  resetForm,
  addMaterial,
  removeMaterial,
  addSample,
  removeSample,
} = interactionSlice.actions;

export default interactionSlice.reducer;
