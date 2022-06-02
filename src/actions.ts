import { Thunk } from "./types"
import {createAction} from './actionFactory'

const up_title = (copyState: any) => createAction('UP_TITLE', copyState)
const up_task = (copyState: any) => createAction('UP_TASK', copyState)
const add_item = (copyState: any) => createAction('ADD_ITEM', copyState)
const add_list = (copyState: any) => createAction('ADD_LIST', copyState)
const del_list = (copyState: any) => createAction('DEL_LIST', copyState)
const reorder_task = (copyState: any) => createAction('REORDER_TASK', copyState)

const up_titleTh = (id:number, title:string):Thunk => (dispatch, getState) => {
    const lists = getState().lists
    
    const newlists = lists.map((list) => {
        if (list.id === id) {
           return {
               ...list,
               title
            }
        } else {
            return list
        }
    })

    dispatch(up_title(newlists))
}

const up_taskTh = (id:number, idList:number, desc:string):Thunk => (dispatch, getState) => {
    const lists = getState().lists

    const newLists = lists.map(list => {
        
        if (list.id === idList) {
            
            list.tasks = list.tasks.map((task) => {
                if (task.id === id+1) {
                    task.text = desc
                }
                return {
                    ...task
                }
            })
        }
        return {
            ...list
        }
    })
    console.log('tasks', newLists)
    dispatch(up_task(newLists))
}

const add_itemTh = (id:number):Thunk => (dispatch, getState) => {
    const lists = getState().lists
    
    const newItem = {
        id: lists[id].tasks.length+1,
        text: 'Введите описание'
    } 

    const newLists = lists.map(list => {
        if (list.id === id+1) {
            list.tasks = [...list.tasks, newItem]
        } 
        return { ...list }
    })

    

    dispatch(add_item(newLists))
}

const add_listTh = ():Thunk => (dispatch, getState) => {
    const state = getState(),
          newList = {id: state.lists.length + 1, title: 'Введите заголовок', tasks: [
            {id: 1, text: 'Введите описание'}
        ]},
        newLists = [...state.lists, newList]
        
    dispatch(add_list(newLists))
    
}

const del_listTh = (id:number):Thunk => (dispatch, getState) => {

    const lists = getState().lists,
          newLists = lists.filter(list => list.id !== id)

    dispatch(del_list(newLists))
}

const reorder_taskTh = (idList:number, idTask:number, currentIdList:number, currentIdTask:number):Thunk => (dispatch, getState) => {
    console.log('idList: ', idList, 'idTask: ', idTask, 'currentIdList: ', currentIdList, 'currentIdTask: ', currentIdTask);
    
    const lists = getState().lists,
          copyTask = {...lists[idList].tasks[idTask-1]},
          equallyList = idList === currentIdList
    console.log(equallyList);
    switch (equallyList) {

        case false:
            {const newBeforeList = lists.map((list, index) => {
                if (index === idList) { 
                    //Удаление task из старого листа
                    let newTasks = list.tasks.filter(task => {
                        return task.id!==idTask});
                    if (idTask === 1) {
                        newTasks = newTasks.map(task => {
                            return {...task, id: task.id-1}
                        })
                    }
                    //Изменение индексов в старом листе
                    if (idTask>1 && idTask !== list.tasks.length) {
                        newTasks = newTasks.map((task, i) => {
                            
                            if (idTask<=i+1) { 
                                return {...task, id: task.id-1}
                            } else {
                                return {...task}
                            }
                        })
                    }
                    return {...list, tasks: newTasks}
                } else {
                    //Действия в листе, куда падает task
                    if (index === currentIdList) {
                        copyTask.id = currentIdTask
                        let newTasks = [...list.tasks]
                        if (currentIdTask === 1) {
                            newTasks = newTasks.map(task => ({...task, id: task.id + 1}))
                        }
                        // Если task падает в центр листа
                        if (currentIdTask !== 1 && currentIdTask !== newTasks.length + 1) {
                            newTasks = newTasks.map((task) => {
                                if (task.id >= currentIdTask) 
                                {
                                    return {...task, id: task.id + 1}
                                }
                                if (task.id <= currentIdTask) {
                                    return {...task, id: task.id} 
                                }
                                return {...task}
                            });
                        }
                        return {...list, tasks: [...newTasks, copyTask].sort((prev,next) => prev.id-next.id)}
                    } else return { ...list }
                }
            })
            dispatch(reorder_task(newBeforeList))
            break;}

        case true:
            const newBeforeList = lists.map(list => {
                if (list.id === idList + 1) {
                    const newTasks = list.tasks.map((task) => {
                        if (idTask <= currentIdTask && task.id > idTask && task.id <= currentIdTask) {
                            return {...task, id: task.id - 1}
                        } else if (idTask >= currentIdTask && task.id < idTask && task.id >= currentIdTask) {
                            return {...task, id: task.id + 1}
                        } else if (task.id === idTask) {
                            return {...task, id: currentIdTask}
                        } else {
                            return {...task}
                        }
                    });
                
                return {...list, tasks:newTasks.sort((prev,next) => prev.id-next.id)}
                } else {
                    return {...list}
                }
            })
            console.log(newBeforeList);
            
            dispatch(reorder_task(newBeforeList))
            break;
        default:
            break;
    }
    
}

export const counterActions = {
    up_titleTh,
    up_taskTh,
    add_itemTh,
    add_listTh,
    del_listTh,
    reorder_taskTh
}

export const todoActionsConstants = {
    up_title: "UP_TITLE",
    up_task: "UP_TASK",
    add_item: "ADD_ITEM",
    add_list: "ADD_LIST",
    del_list: "DEL_LIST",
    reorder_task: "REORDER_TASK"
}