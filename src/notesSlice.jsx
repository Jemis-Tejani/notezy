import { createSlice } from "../@reduxjs/toolkit";

const initialState = {
  notes: [],
  selectedNoteId: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) state.notes[index] = action.payload;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      if (state.selectedNoteId === action.payload) state.selectedNoteId = null;
    },
    selectNote: (state, action) => {
      state.selectedNoteId = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, selectNote } =
  notesSlice.actions;
export default notesSlice.reducer;
