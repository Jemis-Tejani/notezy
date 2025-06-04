import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addNote, updateNote } from "../redux/noteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();
  const allnotes = useSelector((state) => state.note.notes);

  useEffect(() => {
    if (noteId) {
      const note = allnotes.find((n) => n._id === noteId);
      setTitle(note?.title || "");
      setValue(note?.content || "");
    }
  }, [noteId, allnotes]);

  function createnote() {
    if (!title.trim() && !value.trim()) {
      // Prevent creating empty notes
      return;
    }

    const note = {
      title,
      content: value,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (noteId) {
      dispatch(updateNote(note));
    } else {
      dispatch(addNote(note));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={value}
        placeholder="Enter Content Here"
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      />
      <button onClick={createnote}>
        {noteId ? "Update My Note" : "Create My Note"}
      </button>

      {value && (
        <div className="preview-box">
          <h4>Live Preview:</h4>
          <p>{value}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
