import TodoItem from "../TodoItem/TodoItem";
import "./todoList.scss";
import { connect } from "react-redux";
import { State } from "../../store";
import { counterActions } from "../../actions";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import Popup from '../Popup/Popup'
import locale from "../../utils/locale/locale";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TodoList: React.FC<Props> = ({
  lists,
  addListTh,
  reorderTaskTh,
  setStateTh,
  setBgBoardTh,
  reorderListTh
}) => {
  
  let { boardId } = useParams() as any;

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    console.log(result.type);
    switch (result.type) {
      case 'task':{
        const drag = result.draggableId,
          drop = result.destination,
          indexSymb = drag.indexOf("_"),
          idList = drag.slice(0, indexSymb) - 0,
          idTask = drag.slice(indexSymb + 1, drag.length) - 0,
          currentIdList = drop.droppableId - 0,
          currentIdTask = drop.index + 1;

        reorderTaskTh(idList, idTask, currentIdList, currentIdTask);
        break;
      }
      case 'list':{
        console.log(result);
        
        const drag = Number(result.draggableId),
              drop = Number(result.destination.index) < 10 ? Number(`${boardId}0${Number(result.destination.index)}`) : Number(`${boardId}${Number(result.destination.index)}`),
              curIndex =  Number(result.source.index) < 10 ? Number(`${boardId}0${ Number(result.source.index)}`) : Number(`${boardId}${ Number(result.source.index)}`)
          
        reorderListTh(drag, drop, Number(boardId), curIndex)
        break;
      }
    }
    
  };

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableList" direction="horizontal" type={'list'}>
        {(provided) => (
          <div
          {...provided.droppableProps}
          ref={provided.innerRef} 
          className="list-container" >
          {
          lists.map((list, index) => (
            <Draggable key={list.id}
            draggableId={`${list.id}`}
            index={index + 1}>
            {provided => (
              <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
                <TodoItem
                key={list.id}
                title={list.title}
                tasks={list.tasks}
                id={list.id}
                idBoard={boardId}
                />
              </div>
              
            )}
            
            </Draggable>
          ))
          }
          {provided.placeholder}
          <div className="btn list-addList" onClick={() => addListTh(boardId)}>
            {locale("addList")}
          </div>
          
      </div>
        )}
      </Droppable>
    </DragDropContext>
    </>
  );
};

const mapStateToProps = (state: State, boardId: any) => {
  const boardIdlast = boardId.match.params.boardId;
  const board = state.boards.find((board) => board.id === Number(boardIdlast));
  const lists = state.lists.filter((list) => board?.listIds.includes(list.id));
  
  return { lists, lang: state.language };
};

const mapDispatchToProps = {
  addListTh: counterActions.addListTh,
  reorderTaskTh: counterActions.reorderTaskTh,
  setStateTh: counterActions.setStateTh,
  setBgBoardTh: counterActions.setBgBoardTh,
  reorderListTh: counterActions.reorderListTh
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
