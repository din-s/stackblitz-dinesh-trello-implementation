import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task, TaskState } from '../utils';
import TaskCard from './TaskCard';
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';

export interface SwimlaneProps {
  swimlaneTask: Task[];
  laneType: string;
}

const Swimlane: React.FC<SwimlaneProps> = ({ swimlaneTask: tasks, laneType }) => {
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

  const deleteTask = (id) => {
    const spliceIndex = tasks.findIndex(task => task.id == id)
    tasks.splice(spliceIndex, 1);
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
