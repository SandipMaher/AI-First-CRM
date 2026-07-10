import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  open: boolean;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface UIState {
  isMaterialModalOpen: boolean;
  isSampleModalOpen: boolean;
  globalLoading: boolean;
  toast: ToastState;
}

const initialState: UIState = {
  isMaterialModalOpen: false,
  isSampleModalOpen: false,
  globalLoading: false,

  toast: {
    open: false,
    type: "info",
    message: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    openMaterialModal: (state) => {
      state.isMaterialModalOpen = true;
    },

    closeMaterialModal: (state) => {
      state.isMaterialModalOpen = false;
    },

    openSampleModal: (state) => {
      state.isSampleModalOpen = true;
    },

    closeSampleModal: (state) => {
      state.isSampleModalOpen = false;
    },

    setGlobalLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.globalLoading = action.payload;
    },

    showToast: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "info" | "warning";
        message: string;
      }>
    ) => {
      state.toast.open = true;
      state.toast.type = action.payload.type;
      state.toast.message = action.payload.message;
    },

    hideToast: (state) => {
      state.toast.open = false;
      state.toast.message = "";
    },
  },
});

export const {
  openMaterialModal,
  closeMaterialModal,
  openSampleModal,
  closeSampleModal,
  setGlobalLoading,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;