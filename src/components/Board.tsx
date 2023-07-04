import * as React from 'react';
import { useState } from 'react';
import Swimlane from './Swimlane';
import { InitialData, TaskState } from './../utils';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../styles/styles.scss';

interface BoardProps {
  initialData: InitialData;
}

const Board: React.FC<BoardProps> = ({ initialData }) => {
  const { tasks: initialTasks, swimlanes: initialSwimlanes } = initialData;

  const [sourceDroppableIndex, setSourceDroppableIndex] = useState(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [swimlanes, setSwimlanes] = useState(initialSwimlanes);

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const updateSwimlanes = (updatedSwimlanes) => {
    setSwimlanes(updatedSwimlanes);
  };

  const onDragEnd = (result: any): void => {
    console.log('This is an end of Drag action', result);
    /**
       * {
              "draggableId": "task-0",
              "type": "DEFAULT",
              "source": {
                  "index": 0,
                  "droppableId": "swimlane-TODO"
              },
              "reason": "DROP",
              "mode": "FLUID",
              "destination": {
                  "droppableId": "swimlane-IN_PROGRESS",
                  "index": 1
              },
              "combine": null
          }
       */

    const { draggableId, source, destination } = result;

    // if it is an invalid destination
    if (!destination) {
      // silent logging
      console.log('unknown destination');
      return;
    }
    const sourceSwimlaneId = source.droppableId;
    const destinationSwimlaneId = destination?.droppableId;

    // dropped in same location
    if (
      destinationSwimlaneId == sourceSwimlaneId &&
      source.index == destination.index
    ) {
      // silent logging
      console.log('same origin and destination');
      return;
    }

    // for new location
    // A: update task state
    const updatedTasks = tasks.map((task) => {
      if (task.id == draggableId) {
        return {
          ...task,
          state: destinationSwimlaneId,
        };
      }
      return task;
    });
    updateTasks(updatedTasks);

    // B: update the swimlanes
    const updatedSourceSwimlane = swimlanes.find(
      (swimlane) => swimlane.id == sourceSwimlaneId
    );
    updatedSourceSwimlane.taskIds.splice(source.index, 1);

    const updatedDestinationSwimlane = swimlanes.find(
      (swimlane) => swimlane.id == destinationSwimlaneId
    );

    updatedDestinationSwimlane.taskIds.splice(
      destination.index,
      0,
      draggableId
    );

    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id == updatedSourceSwimlane.id) {
        return updatedSourceSwimlane;
      }

      if (swimlane.id == updatedDestinationSwimlane.id) {
        return updatedDestinationSwimlane;
      }
      return swimlane;
    });
    updateSwimlanes(updatedSwimlanes);

    console.log(tasks, swimlanes);
  };

  const onDragStart = (startObj) => {
    const sourceDroppableId = startObj?.source?.droppableId;
    const index = swimlanes.findIndex(swimlane => swimlane.id == sourceDroppableId)
    setSourceDroppableIndex(index);
    console.log("drag start", startObj.source);
  };

  return (
    <div>
      <div className="header">
        <h3>Welcome to JEERU</h3> <span>Clone of JIRA</span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}
      onDragStart={onDragStart}>
        <div className="board">
          {swimlanes?.map((swimlane, index) => (
            <Droppable
              droppableId={swimlane.id.toString()}
              key={swimlane.type.toString()}
              isDropDisabled={index < sourceDroppableIndex}
            >
              {(provided) => (
                <div
                  className="swimlane"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h4>{swimlane.title}</h4>
                  <Swimlane
                    swimlaneTask={swimlane.taskIds.map((id) => tasks.find(task => task.id == id)
                    )}
                    laneType={swimlane.id}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
