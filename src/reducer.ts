import { todoActionsConstants } from "./actions";

const initialState = {
  lists: [
    {
      id: 101,
      title: "test-1",
      tasks: [
        { id: 1, text: "desc-1.1", dateCreate: "13-05" },
        { id: 2, text: "desc-1.2", dateCreate: "14-12" },
        { id: 3, text: "desc-1.3", dateCreate: "15-23" },
        { id: 4, text: "desc-1.4", dateCreate: "10-53" },
      ],
    },
    {
      id: 102,
      title: "test-2",
      tasks: [
        { id: 1, text: "desc-2.1", dateCreate: "11-33" },
        { id: 2, text: "desc-2.2", dateCreate: "13-11" },
      ],
    },
    {
      id: 103,
      title: "test-3",
      tasks: [
        { id: 1, text: "desc-3.1", dateCreate: "17-15" },
        { id: 2, text: "desc-3.2", dateCreate: "21-53" },
        { id: 3, text: "desc-3.3", dateCreate: "19-43" },
      ],
    },
    {
      id: 104,
      title: "test-4",
      tasks: [
        { id: 1, text: "desc-4.1", dateCreate: "16-14" },
        { id: 2, text: "desc-4.2", dateCreate: "16-00" },
        { id: 3, text: "desc-4.3", dateCreate: "15-14" },
      ],
    },
    {
      id: 201,
      title: "test-5",
      tasks: [
        { id: 1, text: "desc-5.1", dateCreate: "14-14" },
        { id: 2, text: "desc-5.2", dateCreate: "13-14" },
        { id: 3, text: "desc-5.3", dateCreate: "12-14" },
      ],
    },
    {
      id: 202,
      title: "test-6",
      tasks: [
        { id: 1, text: "desc-6.1", dateCreate: "11-14" },
        { id: 2, text: "desc-6.2", dateCreate: "10-14" },
        { id: 3, text: "desc-6.3", dateCreate: "16-14" },
      ],
    },
    {
      id: 301,
      title: "test-7",
      tasks: [
        { id: 1, text: "desc-7.1", dateCreate: "11-14" },
        { id: 2, text: "desc-7.2", dateCreate: "10-14" },
        { id: 3, text: "desc-7.3", dateCreate: "16-14" },
      ],
    },
    {
      id: 302,
      title: "test-8",
      tasks: [
        { id: 1, text: "desc-8.1", dateCreate: "11-14" }
      ],
    }
  ],
  boards: [
    { id: 1, listIds: [101, 102, 103, 104], background: '' },
    { id: 2, listIds: [201, 202], background: '' },
    { id: 3, listIds: [301, 302], background: '' },
  ],
  language: 'Rus'
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case todoActionsConstants.upTitle:
      return { ...state, lists: action.payload };
    case todoActionsConstants.upTask:
      return { ...state, lists: action.payload };
    case todoActionsConstants.addItem:
      return { ...state, lists: action.payload };
    case todoActionsConstants.addList:
      return {
        ...state,
        lists: action.payload.newLists,
        boards: action.payload.newBoards,
      };
    case todoActionsConstants.delList:
      return { ...state, lists: action.payload.newLists, boards: action.payload.newBoards};
    case todoActionsConstants.reorderTask:
      return { ...state, lists: action.payload };
    case todoActionsConstants.addBoard:
      return { ...state, boards: action.payload };
    case todoActionsConstants.setState:
      return { ...state, ...action.payload };
    case todoActionsConstants.delTask:
      return { ...state, lists: action.payload };
    case todoActionsConstants.delBoard:
      return { ...state, boards: action.payload };
    case todoActionsConstants.setBgBoard:
      return { ...state, boards: action.payload };
    case todoActionsConstants.setLang:
      return { ...state, language: action.payload };
    case todoActionsConstants.reorderList:
      return { ...state, lists: action.payload };
    default:
      return state;
  }
}

export default reducer;
