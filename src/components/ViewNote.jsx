import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "./ViewNote.css";

const Viewnote = () => {
  const { id } = useParams();
  const allnotes = useSelector((state) => state.note.notes);
  const note = allnotes.find((p) => p._id === id);

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    toast.success("Copied to clipboard");
  };

  if (!note) return <div>Note not found</div>;

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>{note.title}</h2>
        <div>
          <button className="copy-btn" onClick={handleCopy}>
            Copy
          </button>
          <button
            className="share-btn"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: note.title,
                    text: note.content,
                    url: window.location.href,
                  })
                  .catch(() => toast.error("Share failed"));
              } else {
                toast("Sharing not supported on this device");
              }
            }}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Share
          </button>
        </div>
      </div>
      <div>
        <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>
      </div>
      <textarea
        className="view-textarea"
        value={note.content}
        readOnly
        rows={20}
      />
    </div>
  );
};

export default Viewnote;
