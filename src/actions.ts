import { Board, Thunk, List } from "./types";
import { createAction } from "./actionFactory";

const upTitle = (copyState: any) => createAction("UP_TITLE", copyState);
const upTask = (copyState: any) => createAction("UP_TASK", copyState);
const addItem = (copyState: any) => createAction("ADD_ITEM", copyState);
const addList = (newLists: any, newBoards: any) =>
  createAction("ADD_LIST", { newLists, newBoards });
const deLlist = (newLists: any, newBoards: any) =>
  createAction("DEL_LIST", { newLists, newBoards });
const reorderTask = (copyState: any) => createAction("REORDER_TASK", copyState);
const addBoard = (copyState: any) => createAction("ADD_BOARD", copyState);
const setState = (copyState: any) => createAction("SET_STATE", copyState);
const delTask = (copyState: any) => createAction("DEL_TASK", copyState);
const delBoard = (copyState: any) => createAction("DEL_BOARD", copyState);

const upTitleTh =
  (id: number, title: string): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists;

    const newlists = lists.map((list) => {
      if (list.id === id) {
        return {
          ...list,
          title,
        };
      } else {
        return list;
      }
    });
    localStorage.setItem("lists", JSON.stringify(newlists));
    dispatch(upTitle(newlists));
  };

const upTaskTh =
  (id: number, idList: number, desc: string): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists;

    const newLists = lists.map((list) => {
      if (list.id === idList) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === id + 1) {
            task.text = desc;
          }
          return {
            ...task,
          };
        });
      }
      return {
        ...list,
      };
    });
    localStorage.setItem("lists", JSON.stringify(newLists));
    dispatch(upTask(newLists));
  };

const addItemTh =
  (id: number): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists;

    const newItem = {
      id: lists[id].tasks.length + 1,
      text: "Введите описание",
    };

    const newLists = lists.map((list) => {
      if (list.id === id + 1) {
        list.tasks = [...list.tasks, newItem];
      }
      return { ...list };
    });

    localStorage.setItem("lists", JSON.stringify(newLists));
    dispatch(addItem(newLists));
  };

const addListTh =
  (boardId: string): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists,
      boards = getState().boards;

    let newList = {
        id: lists.length + 1,
        title: "Введите заголовок",
        tasks: [{ id: 1, text: "Введите описание" }],
      },
      newLists = [...lists, newList];

    let newBoards = boards.map((board) => {
      if (board.id === Number(boardId)) {
        return { ...board, listIds: [...board.listIds, newList.id] };
      }
      return { ...board };
    });

    localStorage.setItem("lists", JSON.stringify(newLists));
    localStorage.setItem("boards", JSON.stringify(newBoards));
    dispatch(addList(newLists, newBoards));
  };

const delListTh =
  (id: number): Thunk =>
  (dispatch, getState) => {
    let lists = getState().lists,
      boards = getState().boards,
      newLists = lists.filter((list) => list.id !== id),
      newBoards = boards.map((board) => {
        if (board.listIds.includes(id)) {
          const newTaskIds = board.listIds.filter((listId) => listId !== id);
          console.log({ ...board, listIds: newTaskIds });

          return { ...board, listIds: newTaskIds };
        }
        console.log("board: ", board);

        return { ...board };
      });

    newLists = newLists.map((list) => {
      if (list.id > id) return { ...list, id: list.id - 1 };
      return { ...list };
    });

    newBoards = newBoards.map((board) => {
      let newListIds = board.listIds.map((listId) => {
        if (listId > id) return listId - 1;
        return listId;
      });

      return { ...board, listIds: newListIds };
    });

    localStorage.setItem("lists", JSON.stringify(newLists));
    localStorage.setItem("boards", JSON.stringify(newBoards));
    dispatch(deLlist(newLists, newBoards));
  };

const reorderTaskTh =
  (
    idList: number,
    idTask: number,
    currentIdList: number,
    currentIdTask: number
  ): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists,
      copyTask = { ...lists[idList].tasks[idTask - 1] },
      equallyList = idList === currentIdList;

    switch (equallyList) {
      case false: {
        const newBeforeList = lists.map((list, index) => {
          if (index === idList) {
            //Удаление task из старого листа
            let newTasks = list.tasks.filter((task) => {
              return task.id !== idTask;
            });
            if (idTask === 1) {
              newTasks = newTasks.map((task) => {
                return { ...task, id: task.id - 1 };
              });
            }
            //Изменение индексов в старом листе
            if (idTask > 1 && idTask !== list.tasks.length) {
              newTasks = newTasks.map((task, i) => {
                if (idTask <= i + 1) {
                  return { ...task, id: task.id - 1 };
                } else {
                  return { ...task };
                }
              });
            }
            return { ...list, tasks: newTasks };
          } else {
            //Действия в листе, куда падает task
            if (index === currentIdList) {
              copyTask.id = currentIdTask;
              let newTasks = [...list.tasks];
              if (currentIdTask === 1) {
                newTasks = newTasks.map((task) => ({
                  ...task,
                  id: task.id + 1,
                }));
              }
              // Если task падает в центр листа
              if (
                currentIdTask !== 1 &&
                currentIdTask !== newTasks.length + 1
              ) {
                newTasks = newTasks.map((task) => {
                  if (task.id >= currentIdTask) {
                    return { ...task, id: task.id + 1 };
                  }
                  if (task.id <= currentIdTask) {
                    return { ...task, id: task.id };
                  }
                  return { ...task };
                });
              }
              return {
                ...list,
                tasks: [...newTasks, copyTask].sort(
                  (prev, next) => prev.id - next.id
                ),
              };
            } else return { ...list };
          }
        });

        localStorage.setItem("lists", JSON.stringify(newBeforeList));
        dispatch(reorderTask(newBeforeList));
        break;
      }

      case true:
        const newBeforeList = lists.map((list) => {
          if (list.id === idList + 1) {
            const newTasks = list.tasks.map((task) => {
              if (
                idTask <= currentIdTask &&
                task.id > idTask &&
                task.id <= currentIdTask
              ) {
                return { ...task, id: task.id - 1 };
              } else if (
                idTask >= currentIdTask &&
                task.id < idTask &&
                task.id >= currentIdTask
              ) {
                return { ...task, id: task.id + 1 };
              } else if (task.id === idTask) {
                return { ...task, id: currentIdTask };
              } else {
                return { ...task };
              }
            });

            return {
              ...list,
              tasks: newTasks.sort((prev, next) => prev.id - next.id),
            };
          } else {
            return { ...list };
          }
        });

        localStorage.setItem("lists", JSON.stringify(newBeforeList));
        dispatch(reorderTask(newBeforeList));
        break;
      default:
        break;
    }
  };

const addBoardTh = (): Thunk => (dispatch, getState) => {
  const boards = getState().boards;

  const newBoard = {
    id: boards.length + 1,
    listIds: [],
    title: `Доска ${boards.length + 1}`,
  };

  const newBoards = [...boards, newBoard];

  localStorage.setItem("boards", JSON.stringify(newBoards));
  dispatch(addBoard(newBoards));
};

const setStateTh =
  (boards: Array<Board> | null, lists: Array<List> | null): Thunk =>
  (dispatch, getState) => {
    let newState = { lists: lists, boards: boards };

    if (!boards) {
      newState = { ...newState, boards: getState().boards };
    }

    if (!lists) {
      newState = { ...newState, lists: getState().lists };
    }

    dispatch(setState(newState));
  };

const delTaksTh =
  (idTask: number, idList: number): Thunk =>
  (dispatch, getState) => {
    const lists = getState().lists;

    const newLists = lists.map((list) => {
      if (list.id === idList) {
        let newTasks = list.tasks.filter((task) => task.id !== idTask);
        newTasks = newTasks.map((task) => {
          if (idTask === 1) return { ...task, id: task.id - 1 };
          if (task.id > idTask) return { ...task, id: task.id + 1 };
          return { ...task };
        });

        return { ...list, tasks: newTasks };
      }

      return { ...list };
    });

    localStorage.setItem("lists", JSON.stringify(newLists));
    dispatch(delTask(newLists));
  };

const delBoardTh =
  (idBoard: number): Thunk =>
  (dispatch, getState) => {
    const boards = getState().boards,
      newBoards = boards.filter((board) => board.id !== idBoard);

    localStorage.setItem("boards", JSON.stringify(newBoards));
    dispatch(delBoard(newBoards));
  };

export const counterActions = {
  upTitleTh,
  upTaskTh,
  addItemTh,
  addListTh,
  delListTh,
  reorderTaskTh,
  addBoardTh,
  setStateTh,
  delTaksTh,
  delBoardTh,
};

export const todoActionsConstants = {
  upTitle: "UP_TITLE",
  upTask: "UP_TASK",
  addItem: "ADD_ITEM",
  addList: "ADD_LIST",
  delList: "DEL_LIST",
  reorderTask: "REORDER_TASK",
  addBoard: "ADD_BOARD",
  setState: "SET_STATE",
  delTask: "DEL_TASK",
  delBoard: "DEL_BOARD",
};
