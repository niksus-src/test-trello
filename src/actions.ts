import { Thunk } from "./types"
import {createAction} from './actionFactory'

const up_title = (copyState: any) => createAction('UP_TITLE', copyState)
const up_task = (copyState: any) => createAction('UP_TASK', copyState)
const add_item = (copyState: any) => createAction('ADD_ITEM', copyState)
const add_list = (copyState: any) => createAction('ADD_LIST', copyState)
const del_list = (copyState: any) => createAction('DEL_LIST', copyState)

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

export const counterActions = {
    up_titleTh,
    up_taskTh,
    add_itemTh,
    add_listTh,
    del_listTh
}

export const todoActionsConstants = {
    up_title: "UP_TITLE",
    up_task: "UP_TASK",
    add_item: "ADD_ITEM",
    add_list: "ADD_LIST",
    del_list: "DEL_LIST"
}