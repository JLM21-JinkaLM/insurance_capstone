import { useState } from "react";

export default function ClaimNotes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const addNote = () => {
    if (!text) return;
    setNotes([...notes, { text, date: new Date() }]);
    setText("");
  };

  return (
    <div className="mt-4">
      <h6>Notes</h6>

      <div className="mb-2">
        <textarea
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-sm btn-primary mt-2" onClick={addNote}>
          Add Note
        </button>
      </div>

      {notes.map((n, i) => (
        <div key={i} className="alert alert-light">
          {n.text}
        </div>
      ))}
    </div>
  );
}
