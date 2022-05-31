import { todoActionsConstants } from "./actions"

const initialState = {
    lists: [
    {id:1, title: 'test-1', tasks: [
        {id: 1, text: 'desc-1.1'},
        {id: 2, text: 'desc-1.2'},
        {id: 3, text: 'desc-1.3'},
        {id: 4, text: 'desc-1.4'}
    ]},
    {id:2, title: 'test-2', tasks: [
        {id: 1, text: 'desc-2.1'},
        {id: 2, text: 'desc-2.2'}
    ]},
    {id:3, title: 'test-3', tasks: [
        {id: 1, text: 'desc-3.1'},
        {id: 2, text: 'desc-3.2'},
        {id: 3, text: 'desc-3.3'},
    ]}
],
kekw: false
}
function reducer(state=initialState, action:any) {
    switch (action.type) {
        case todoActionsConstants.up_title: 
            return {...state, lists: action.payload}
        case todoActionsConstants.up_task:
            return {...state, lists: action.payload}
        case todoActionsConstants.add_item: 
            return {...state, lists: action.payload}
        case todoActionsConstants.add_list: 
            return {...state, lists: action.payload}
        case todoActionsConstants.del_list: 
            return {...state, lists: action.payload} 
        
        default:
          return state
      }
  }

export default reducer