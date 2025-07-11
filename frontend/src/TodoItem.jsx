import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, editedTitle); 
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ flex: 1, marginRight: "10px" }}
          />
          <button type="button" onClick={handleSave}>💾</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <div>
            <button type="button" onClick={handleEdit}>✏️</button>
            <button type="button" onClick={() => onDelete(todo.id)}>❌</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
