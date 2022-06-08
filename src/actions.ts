import { Board, Thunk, List } from "./types";
import { Axios } from "axios";
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
const setBgBoard = (copyState: any) => createAction("SET_BG_BOARD", copyState);
const setLang = (copyState: any) => createAction("SET_LANG", copyState);
const reorderList = (copyState: any) => createAction("REORDER_LIST", copyState);

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
    const newDate = new Date();
    const indexList = lists.findIndex(list => {
      if (list.id === id) return true
      return false 
    })
    console.log(lists[indexList].tasks.length + 1,id,indexList);
    
    const newItem = {
      id: lists[indexList].tasks.length + 1,
      text: "",
      dateCreate: `${newDate.getDate()}-${newDate.getHours()}`
    };
    console.log(newItem);
    
    const newLists = lists.map((list) => {
      if (list.id === id) {
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
    const lists = getState().lists
    const  boards = getState().boards
    const indexBoard = boards.findIndex(board => {
      if (board.id === Number(boardId)) return true
      return false 
    })
    const  newDate = new Date()
    const  listIds = getState().boards[indexBoard].listIds ? getState().boards[indexBoard].listIds.sort((a,b) => a - b) : [],
      lastId = listIds.length ? listIds.at(-1) as number : Number(`${Number(boardId)}00`)
    
    let newList = {
        id: lastId + 1,
        title: "",
        tasks: [{ id: 1, text: "", dateCreate: `${newDate.getDate()}-${newDate.getHours()}`}],
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
    dispatch(addList(newLists.sort((a,b) => a.id - b.id), newBoards));
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
    console.log('idList: ',idList, 'idTask: ',idTask, 'currentIdList: ',currentIdList, 'currentIdTask: ',currentIdTask);

    console.log('LOLIK', idList);
    console.log('DOLBOEBIK', idTask);

    const lists = getState().lists
    //@ts-ignore
    const copyTask = { ...lists.find(list => list.id === idList).tasks[idTask - 1] }
    const equallyList = idList === currentIdList;
    console.log(copyTask);
    
    switch (equallyList) {
      case false: {
        const newBeforeList = lists.map((list) => {
          if (list.id === idList) {
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
            if (list.id === currentIdList) {
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
          if (list.id === idList) {
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
    id: boards.length !== 0 ? boards[boards.length - 1].id + 1 : 1,
    listIds: []
  };

  const newBoards = [...boards, newBoard];

  localStorage.setItem("boards", JSON.stringify(newBoards));
  dispatch(addBoard(newBoards));
};

const setStateTh =
  (boards: Array<Board> | null, lists: Array<List> | null): Thunk =>
  (dispatch, getState) => {
    let newState = {...getState(), lists: lists, boards: boards };

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

const setBgBoardTh =
  (idBoard: number, url: string): Thunk =>
  (dispatch, getState) => {
    const boards = getState().boards,
      newBoards = boards.map((board) => {
        if (board.id === Number(idBoard)) {
          console.log({ ...board, background: url });

          return { ...board, background: url };
        }

        return { ...board };
      });

    localStorage.setItem("boards", JSON.stringify(newBoards));
    dispatch(setBgBoard(newBoards));
  };

const setLangTh =
  (lang: string): Thunk =>
  (dispatch, getState) => {
    dispatch(setLang(lang));
  };

const reorderListTh = (drag: number, drop: number, boardId: number, curIndex: number):Thunk => (dispatch, getState) => {
  console.log('drag: ', drag, 'drop: ', drop, 'boardId: ', boardId, 'curInd: ', curIndex);  
  const indexBoard = getState().boards.findIndex(board => {
    if (board.id === Number(boardId)) return true
    return false 
  })
  const listsIds = getState().boards[indexBoard].listIds
  const  orderIds = Number(`${boardId + 1}00`)
  const  actLists = getState().lists.filter(list => list.id !== drag && list.id < orderIds && list.id > orderIds - 100? true : false)

  const  lists = getState().lists.filter(list => listsIds.indexOf(list.id) === -1? true : false)
  const  copyIndex: any = getState().lists.findIndex((list,i) => {
          if (list.id === curIndex) return true
          return false
        }),
        copyList = {...getState().lists[copyIndex], id: drop}
      console.log(copyList, copyIndex);

      const newLists = actLists.map(list => {
        if (
          drag <= drop &&
          list.id > drag &&
          list.id <= drop
        ) {
          return { ...list, id: list.id - 1 };
        } else if (
          drag >= drop &&
          list.id < drag &&
          list.id >= drop
        ) {
          return { ...list, id: list.id + 1 };
        } else if (list.id === drag) {
          return { ...list, id: drop };
        } else {
          return { ...list };
        }
      })
      console.log([...newLists, copyList]);
      const newListsForDesk = [...newLists, copyList];
      const newBeforeList = [...newListsForDesk.sort((a,b)=>a.id-b.id), ...lists]
      localStorage.setItem("lists", JSON.stringify(newBeforeList));
    dispatch(reorderList([...newBeforeList]))
}

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
  setBgBoardTh,
  setLangTh,
  reorderListTh
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
  setBgBoard: "SET_BG_BOARD",
  setLang: "SET_LANG",
  reorderList: "REORDER_LIST"
};
