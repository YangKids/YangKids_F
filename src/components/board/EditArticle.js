import React, { useState } from "react";

const EditArticle = ({ article, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(article.title);
  const [editedContent, setEditedContent] = useState(article.content);

  const handleSave = async () => {
    const updateData = {
      ...article,
      title: editedTitle,
      content: editedContent,
    };
    try {
      const response = await fetch(`http://localhost:8080/api-article/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update article.");
      }
      onSave(updateData);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      ></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditArticle;
