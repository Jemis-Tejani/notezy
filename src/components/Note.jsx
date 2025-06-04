import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { Copy, Share2, Trash2, Edit, Eye } from "lucide-react";

const Note = () => {
  const notes = useSelector((state) => state.note.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(noteId) {
    dispatch(deleteNote(noteId));
  }

  async function handleShare(note) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: note.content,
          url: window.location.origin + "/notes/" + note._id,
        });
      } catch (error) {
        toast.error("Share failed");
      }
    } else {
      toast("Sharing not supported on this device");
    }
  }

  return (
    <div className="note-container">
      <input
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredData.map((note) => (
        <div className="note-item" key={note._id}>
          <div className="note-actions">
            <Link to={`/?noteId=${note._id}`}>
              <Edit size={16} />
            </Link>
            <Link to={`/notes/${note._id}`}>
              <Eye size={16} />
            </Link>
            <button onClick={() => handleDelete(note._id)}>
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(note.content);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy size={16} />
            </button>
            <button onClick={() => handleShare(note)}>
              <Share2 size={16} />
            </button>
          </div>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span className="note-date">
            {new Date(note.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Note;
