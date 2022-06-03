import { connect } from "react-redux";
import { counterActions } from "../actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { List } from "../types";

import "./todoItem.scss";

function TodoItem(props: any) {
  const {
    title,
    tasks,
    id,
    upTitleTh,
    upTaskTh,
    addItemTh,
    delListTh,
    delTaksTh,
    setStateTh,
  } = props;

  useEffect(() => {
    const localLists = JSON.parse(
      localStorage.getItem("lists") || "{}"
    ) as Array<List>;

    let listsBefore;

    if (Object.keys(localLists).length) {
      listsBefore = localLists;
      setStateTh(null, listsBefore);
    }
  }, []);

  return (
    <div className="item-container">
      <div className="item-top">
        <input
          className="form-control item-title"
          value={title === "Введите заголовок" ? "" : title}
          placeholder={title === "Введите заголовок" ? "Введите заголовок" : ""}
          type="text"
          id={id}
          onChange={(e) => {
            upTitleTh(id, e.target.value);
          }}
        />
        <div className="item-delete" onClick={() => delListTh(id)}>
          &#10006;
        </div>
      </div>

      <Droppable droppableId={`${id}`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="item-content"
          >
            {tasks.map((task: any, index: number) => (
              <Draggable
                key={task.id}
                draggableId={`${id}_${task.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="input-cont"
                  >
                    <input
                      key={task.id}
                      value={task.text === "Введите описание" ? "" : task.text}
                      placeholder={
                        task.text === "Введите описание"
                          ? "Введите описание"
                          : ""
                      }
                      className="form-control item-desc"
                      id={id}
                      onChange={(e) =>
                        upTaskTh(task.id - 1, id, e.target.value)
                      }
                    />
                    <div className="dragg"></div>
                    <div
                      className="del-task"
                      onClick={() => delTaksTh(task.id, id)}
                    >
                      &#9746;
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        type="button"
        className="btn item-addCard"
        onClick={() => addItemTh(id - 1)}
      >
        Добавить задачу
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  upTitleTh: counterActions.upTitleTh,
  upTaskTh: counterActions.upTaskTh,
  addItemTh: counterActions.addItemTh,
  delListTh: counterActions.delListTh,
  delTaksTh: counterActions.delTaksTh,
  setStateTh: counterActions.setStateTh,
};

export default connect(null, mapDispatchToProps)(TodoItem);
