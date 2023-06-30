import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task, TaskState } from '../utils';
import TaskCard from './TaskCard';
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';

interface SwimlaneProps {
  tasks: Task[];
  laneType: string;
}

const Swimlane: React.FC<SwimlaneProps> = ({ tasks, laneType }) => {
  const [state, setState] = useState({
    tasks,
    laneType,
  });

  const addCardToSwimlane = () => {
    const newTask: Task = {
      id: uuidV4(),
      title: '',
      state: laneType,
    };
    tasks.push(newTask);
    updateTasks(tasks);
  };

  const updateTasks = (updatedTasks) => {
    setState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));
  };

  const updateTask = (updatedTask) => {
    const oldTaskIndex = tasks.findIndex((task) => task.id == updatedTask.id);
    if (oldTaskIndex > -1) {
      tasks.splice(oldTaskIndex, 1, updatedTask);
    }
    updateTasks(tasks);
  };

  const deleteTask = (index) => {
    // TODO: to pass taskId
    tasks.splice(index, 1);
    updateTasks(tasks);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable draggableId={`${task.id}`} index={index} key={task.id}>
          {(provided) => (
            <div
              className="task-card"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <TaskCard
                task={task}
                index={index}
                onDelete={deleteTask}
                updateTask={updateTask}
              />
            </div>
          )}
        </Draggable>
      ))}
      <button
        onClick={() => {
          addCardToSwimlane();
        }}
      >
        Add task
      </button>
    </div>
  );
};

export default Swimlane;
