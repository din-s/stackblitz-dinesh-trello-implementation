import * as React from 'react';
import { useState } from 'react';
import { Task } from '../utils';

export interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  updateTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onDelete,
  updateTask,
}) => {
  let [editMode, setEditMode] = useState(false);
  let [newTitle, setTitle] = useState(task.title);
  const handleDelete = () => {
    onDelete(index);
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleSaveClick = () => {
    task.title = newTitle;
    updateTask(task);
    toggleEdit();
  };

  return (
    <div className="task-card-content">
      {editMode || !task.title ? (
        <input
          type="text"
          maxLength={150}
          value={newTitle}
          onChange={handleTitleChange}
          className="title-input"
        />
      ) : (
        <h5>{task.title}</h5>
      )}
      <div className="task-card-actions">
        {editMode || !task.title ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={toggleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
