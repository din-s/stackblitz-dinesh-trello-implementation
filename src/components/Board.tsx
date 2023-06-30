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

  /* const [state, setState] = useState({
    tasks,
    swimlanes,
  }); */

  const [tasks, setTasks] = useState(initialTasks);
  const [swimlanes, setSwimlanes] = useState(initialSwimlanes);

  const updateTasks = (updatedTasks) => {
    setTasks((prevState) => updatedTasks);
  };

  const updateSwimlanes = (updatedSwimlanes) => {
    setSwimlanes((prevState) => updatedSwimlanes);
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
      // silent loggingp
      console.log('same location destination');
      return;
    }

    // for new location

    // update the swimlanes
    const updatedSourceSwimlane = swimlanes.find(
      (swimlane) => swimlane.id == sourceSwimlaneId
    );
    console.log('source swimlane:', updatedSourceSwimlane);
    updatedSourceSwimlane.taskIds.splice(source.index, 1);

    const updatedDestinationSwimlane = swimlanes.find(
      (swimlane) => swimlane.id == destinationSwimlaneId
    );

    updatedDestinationSwimlane.taskIds.splice(
      destination.index,
      0,
      draggableId
    );
    console.log('destination swimlane:', updatedDestinationSwimlane);

    /*    const updatedSourceSwimlane = {
      ...sourceSwimlane,
    };

    const updatedDestinationSwimlane = {
      ...destinationSwimlane,
    }; */

    console.log('Yaha issue hai', swimlanes);
    const updatedSwimlanes = swimlanes.map((swimlane) => {
      if (swimlane.id == updatedSourceSwimlane.id) {
        return updatedSourceSwimlane;
      }

      if (swimlane.id == updatedDestinationSwimlane.id) {
        return updatedDestinationSwimlane;
      }
      return swimlane;
    });
    // setState((prevState) => ({
    //   ...prevState,
    //   swimlanes: updatedSwimlanes,
    // }));
    updateSwimlanes(updateSwimlanes);

    // also update task state
    console.log('new location');
    const updatedTasks = tasks.map((task) => {
      if (task.id == draggableId) {
        return {
          ...task,
          state: destinationSwimlaneId,
        };
      }
      return task;
    });
    /* setState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    })); */
    updateTasks(updatedTasks);
    console.log(updatedTasks, updatedSwimlanes);
    // console.log(state)
    console.log('This is onComplete');
  };

  return (
    <div>
      <div className="header">
        <h3>Welcome to JEERU</h3> <span>Clone of JIRA</span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {swimlanes.map((swimlane) => (
            <Droppable droppableId={swimlane.id} key={swimlane.type.toString()}>
              {(provided) => (
                <div
                  className="swimlane"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h4>{swimlane.title}</h4>
                  <Swimlane
                    tasks={tasks.filter((task) => task.state === swimlane.id)}
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
