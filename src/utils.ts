export interface Task {
  id: string;
  title: string;
  state: string;
}

export interface Swimlane {
  id: string;
  type: TaskState;
  title: string;
  taskIds: string[];
}

export interface InitialData {
  tasks: Task[];
  swimlanes: Swimlane[];
}

export enum TaskState {
  TODO = 1,
  IN_PROGRESS = 2,
  QA = 3,
  DONE = 4,
}

export const initialData: InitialData = {
  tasks: [
    {
      id: 'cef76c24-171f-11ee-be56-0242ac120002',
      title: 'Offer letter',
      state: 'TODO',
    },
    {
      id: 'cef76ecc-171f-11ee-be56-0242ac120002',
      title: 'Interview',
      state: 'IN_PROGRESS',
    },
    {
      id: 'cef7700c-171f-11ee-be56-0242ac120002',
      title: 'UI Assignment',
      state: 'QA',
    },
    {
      id: 'cef7712e-171f-11ee-be56-0242ac120002',
      title: 'Joining Date',
      state: 'TODO',
    },
    {
      id: 'cef77120-171f-11ee-be56-0242ac120002',
      title: 'Apply to Deep Intent',
      state: 'DONE',
    },
  ],
  swimlanes: [
    {
      id: 'TODO',
      type: TaskState.TODO,
      title: 'TODO',
      taskIds: [
        'cef76c24-171f-11ee-be56-0242ac120002',
        'cef7712e-171f-11ee-be56-0242ac120002',
      ],
    },
    {
      id: 'IN_PROGRESS',
      type: TaskState.IN_PROGRESS,
      title: 'IN PROGRESS',
      taskIds: ['cef76ecc-171f-11ee-be56-0242ac120002'],
    },
    {
      id: 'QA',
      type: TaskState.QA,
      title: 'QA',
      taskIds: ['cef7700c-171f-11ee-be56-0242ac120002'],
    },
    {
      id: 'DONE',
      type: TaskState.DONE,
      title: 'DONE',
      taskIds: ['cef77120-171f-11ee-be56-0242ac120002'],
    },
  ],
};
