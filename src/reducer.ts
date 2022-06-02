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
            {id: 3, text: 'desc-3.3'}
        ]},
        {id:4, title: 'test-4', tasks: [
            {id: 1, text: 'desc-4.1'},
            {id: 2, text: 'desc-4.2'},
            {id: 3, text: 'desc-4.3'}
        ]},
        {id:5, title: 'test-5', tasks: [
            {id: 1, text: 'desc-5.1'},
            {id: 2, text: 'desc-5.2'},
            {id: 3, text: 'desc-5.3'}
        ]},
        {id:6, title: 'test-6', tasks: [
            {id: 1, text: 'desc-6.1'},
            {id: 2, text: 'desc-6.2'},
            {id: 3, text: 'desc-6.3'}
        ]}
    ],
    boards: [
        {id:1, listIds: [1, 2], title:'Доска 1'},
        {id:2, listIds: [3, 4], title:'Доска 2'},
        {id:3, listIds: [5, 6], title:'Доска 3'}
    ]
}

function reducer(state = initialState, action:any) {
    switch (action.type) {
        case todoActionsConstants.up_title: 
            return {...state, lists: action.payload}
        case todoActionsConstants.up_task:
            return {...state, lists: action.payload}
        case todoActionsConstants.add_item: 
            return {...state, lists: action.payload}
        case todoActionsConstants.add_list: 
            return {...state, lists: action.payload.newLists, boards:action.payload.newBoards}
        case todoActionsConstants.del_list: 
            return {...state, lists: action.payload} 
        case todoActionsConstants.reorder_task:
            return {...state, lists: action.payload}
        case todoActionsConstants.add_board:
            return {...state, boards: action.payload}
        case todoActionsConstants.set_state:
            return {...action.payload}
        case todoActionsConstants.set_board:
            return {...action.payload}
        default:
          return state
      }
  }

export default reducer