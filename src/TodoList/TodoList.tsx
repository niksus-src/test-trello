import TodoItem from "../TodoItem/TodoItem";
import "./todoList.scss";
import { connect } from "react-redux";
import { State } from "../store";
import { counterActions } from "../actions";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Board, List } from "../types";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TodoList: React.FC<Props> = ({
  lists,
  addListTh,
  reorderTaskTh,
  setStateTh,
}) => {
  useEffect(() => {
    const localBoards = JSON.parse(
        localStorage.getItem("boards") || "{}"
      ) as Array<Board>,
      localLists = JSON.parse(
        localStorage.getItem("lists") || "{}"
      ) as Array<List>;

    let boards, listsBefore;

    if (Object.keys(localBoards).length && Object.keys(localLists).length) {
      boards = localBoards;
      listsBefore = localLists;
      setStateTh(boards, listsBefore);
    }
  }, []);

  let { boardId } = useParams() as any;
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const drag = result.draggableId,
      drop = result.destination,
      indexSymb = drag.indexOf("_"),
      idList = drag.slice(0, indexSymb) - 1,
      idTask = drag.slice(indexSymb + 1, drag.length) - 0,
      currentIdList = drop.droppableId - 1,
      currentIdTask = drop.index + 1;

    reorderTaskTh(idList, idTask, currentIdList, currentIdTask);
  };

  return (
    <>
      <div className="list-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list) => (
            <TodoItem
              key={list.id}
              title={list.title}
              tasks={list.tasks}
              id={list.id}
              idBoard={boardId}
            />
          ))}
          <div className="btn list-addList" onClick={() => addListTh(boardId)}>
            Добавить колонку
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

const mapStateToProps = (state: State, boardId: any) => {
  const boardIdlast = boardId.match.params.boardId;
  const board = state.boards.find((board) => board.id === Number(boardIdlast));
  const lists = state.lists.filter((list) => board?.listIds.includes(list.id));
  return { lists };
};

const mapDispatchToProps = {
  addListTh: counterActions.addListTh,
  reorderTaskTh: counterActions.reorderTaskTh,
  setStateTh: counterActions.setStateTh,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
