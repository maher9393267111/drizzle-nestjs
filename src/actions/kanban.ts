import type { SWRConfiguration } from 'swr';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { IKanban, IKanbanTask, IKanbanColumn } from 'src/types/kanban';

import useSWR, { mutate } from 'swr';
import { useMemo, startTransition } from 'react';
import axios from 'src/lib/axios';
import { _mock } from 'src/_mock';


// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const _board: IKanban = {
  tasks: {
    '1b123bb-1345b-464b-a3c5-46d522e': [
      {
        id: _mock.id(1),
        name: 'Product Design',
        priority: 'medium',
        status: 'in_progress',
        labels: ['UX', 'UI'],
        due: [new Date().getTime(), new Date().getTime()],
        attachments: [],
        comments: [],
        reporter: {
          id: _mock.id(1),
          name: _mock.fullName(1),
          avatarUrl: _mock.image.avatar(1),
        },
        assignee: [
          {
            id: _mock.id(2),
            name: _mock.fullName(2),
            avatarUrl: _mock.image.avatar(2),
            role: 'Designer',
            email: _mock.email(2),
            status: 'online',
            address: '123 Main St, Anytown, USA',
            phoneNumber: '555-1234',
            lastActivity: new Date().getTime(),
          },
        ],
        description: _mock.description(1),
      },
    ],
    '2b123bb-1345b-464b-a3c5-46d522e': [
      {
        id: _mock.id(2),
        name: 'Product Development',
        priority: 'low',
        status: 'todo',
        labels: ['Backend', 'DevOps'],
        due: [new Date().getTime(), new Date().getTime()],
        attachments: [],
        comments: [],
        reporter: {
          id: _mock.id(2),
          name: _mock.fullName(2),
          avatarUrl: _mock.image.avatar(2),
        },
        assignee: [
          {
            id: _mock.id(3),
            name: _mock.fullName(3),
            avatarUrl: _mock.image.avatar(3),
            role: 'Developer',
            email: _mock.email(3),
            status: 'offline',
            address: '456 Oak Ave, Anytown, USA',
            phoneNumber: '555-5678',
            lastActivity: new Date().getTime(),
          },
        ],
        description: _mock.description(2),
      },
    ],
  },
  columns: [
    { id: '1b123bb-1345b-464b-a3c5-46d522e', name: 'Backlog' },
    { id: '2b123bb-1345b-464b-a3c5-46d522e', name: 'In Progress' },
  ],
};

// ----------------------------------------------------------------------

type BoardData = {
  board: IKanban;
};

export function useGetBoard() {
  const { data, isLoading, error, isValidating } = useSWR<BoardData>('kanban', null, swrOptions);

  const memoizedValue = useMemo(() => {
    const board = data?.board ?? _board;
    const tasks = board.tasks ?? {};
    const columns = board.columns ?? [];

    return {
      board: { tasks, columns },
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !isValidating && !columns.length,
    };
  }, [data?.board, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createColumn(columnData: IKanbanColumn) {
  /**
   * Work in local
   */
  mutate(
    'kanban',
    (currentData: BoardData | undefined) => {
      const board = currentData?.board ?? _board;

      // add new column in board.columns
      const columns = [...board.columns, columnData];

      // add new task in board.tasks
      const tasks = { ...board.tasks, [columnData.id]: [] };

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateColumn(columnId: UniqueIdentifier, columnName: string) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        const columns = board.columns.map((column) =>
          column.id === columnId
            ? {
                // Update data when found
                ...column,
                name: columnName,
              }
            : column
        );

        return { ...currentData, board: { ...board, columns } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function moveColumn(updateColumns: IKanbanColumn[]) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        return { ...currentData, board: { ...board, columns: updateColumns } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function clearColumn(columnId: UniqueIdentifier) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        // remove all tasks in column
        const tasks = { ...board.tasks, [columnId]: [] };

        return { ...currentData, board: { ...board, tasks } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function deleteColumn(columnId: UniqueIdentifier) {
  /**
   * Work in local
   */
  mutate(
    'kanban',
    (currentData: BoardData | undefined) => {
      const board = currentData?.board ?? _board;

      // delete column in board.columns
      const columns = board.columns.filter((column) => column.id !== columnId);

      // delete tasks by column deleted
      const tasks = Object.keys(board.tasks)
        .filter((key) => key !== columnId)
        .reduce((obj: IKanban['tasks'], key) => {
          obj[key] = board.tasks[key];
          return obj;
        }, {});

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createTask(columnId: UniqueIdentifier, taskData: IKanbanTask) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        // add task in board.tasks
        const tasks = { ...board.tasks, [columnId]: [taskData, ...board.tasks[columnId]] };

        return { ...currentData, board: { ...board, tasks } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function updateTask(columnId: UniqueIdentifier, taskData: IKanbanTask) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        // tasks in column
        const tasksInColumn = board.tasks[columnId];

        // find and update task
        const updateTasks = tasksInColumn.map((task) =>
          task.id === taskData.id
            ? {
                // Update data when found
                ...task,
                ...taskData,
              }
            : task
        );

        const tasks = { ...board.tasks, [columnId]: updateTasks };

        return { ...currentData, board: { ...board, tasks } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function moveTask(updateTasks: IKanban['tasks']) {
  /**
   * Work in local
   */
  startTransition(() => {
    mutate(
      'kanban',
      (currentData: BoardData | undefined) => {
        const board = currentData?.board ?? _board;

        // update board.tasks
        const tasks = updateTasks;

        return { ...currentData, board: { ...board, tasks } };
      },
      false
    );
  });
}

// ----------------------------------------------------------------------

export async function deleteTask(columnId: UniqueIdentifier, taskId: UniqueIdentifier) {
  /**
   * Work in local
   */
  mutate(
    'kanban',
    (currentData: BoardData | undefined) => {
      const board = currentData?.board ?? _board;

      // delete task in column
      const tasks = {
        ...board.tasks,
        [columnId]: board.tasks[columnId].filter((task) => task.id !== taskId),
      };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}
