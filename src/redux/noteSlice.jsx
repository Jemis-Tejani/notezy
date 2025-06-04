import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialNotes = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: initialNotes,
  },
  reducers: {
    addTonotes: (state, action) => {
      state.notes.push(action.payload);
    },
    updateTonotes: (state, action) => {
      const index = state.notes.findIndex((n) => n._id === action.payload._id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    resetAllnotes: (state) => {
      state.notes = [];
    },
    removeFromnotes: (state, action) => {
      state.notes = state.notes.filter((n) => n._id !== action.payload);
    },
  },
});

export const { addTonotes, updateTonotes, resetAllnotes, removeFromnotes } =
  noteSlice.actions;

// Thunk action creators with localStorage and toast centralized here
export const addNote = (note) => (dispatch, getState) => {
  dispatch(addTonotes(note));
  localStorage.setItem("notes", JSON.stringify(getState().note.notes));
  toast.success("Note Created Successfully");
};

export const updateNote = (note) => (dispatch, getState) => {
  dispatch(updateTonotes(note));
  localStorage.setItem("notes", JSON.stringify(getState().note.notes));
  toast.success("Note Updated Successfully");
};

export const deleteNote = (id) => (dispatch, getState) => {
  dispatch(removeFromnotes(id));
  localStorage.setItem("notes", JSON.stringify(getState().note.notes));
  toast("Note deleted");
};

export const clearAllNotes = () => (dispatch) => {
  dispatch(resetAllnotes());
  localStorage.removeItem("notes");
  toast("All notes removed");
};

export default noteSlice.reducer;
