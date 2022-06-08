import { connect } from "react-redux";
import { counterActions } from "../../actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { List } from "../../types";

import "./todoItem.scss";
import locale from "../../utils/locale/locale";
import { State } from "../../store";

function TodoItem(props: any) {
  const {
    title,
    tasks,
    id,
    upTitleTh,
    upTaskTh,
    addItemTh,
    delListTh,
    delTaksTh
  } = props;

  function num_word(value: number){  
    value = Math.abs(value) % 100; 
    var num = value % 10;
    if(value > 10 && value < 20) return locale("hours"); 
    if(num > 1 && num < 5) return locale("hour's");
    if(num === 1) return locale("hour"); 
    return locale("hours");
  }

  const getPassedTime = (date: string) => {
    const oldDate: number = Number(date.slice(0, date.indexOf('-'))) * 24,
          oldHours: number = Number(date.slice(date.indexOf('-') + 1)) ,
          actDate = new Date,
          newDate: number = Number(actDate.getDate()) * 24,
          newHours: number = Number(actDate.getHours())

    return Math.abs((newDate + newHours) - (oldDate + oldHours))
  }

  return (
    <div className="item-container">
      <div className="item-top">
        <input
          className="form-control item-title"
          value={title === "Введите заголовок" ? "" : title}
          placeholder={title === "" ? locale("enterTitle") : ""}
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

      <Droppable droppableId={`${id}`} type={'task'} direction="vertical">
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
                  >
                    <div className="input-cont">
                      <input
                        key={task.id}
                        value={task.text === "" ? "" : task.text}
                        placeholder={
                          task.text === "" ? locale("еnterDesc") : ""
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
                  <div className="item-date">{locale('timePassed')} {getPassedTime(task.dateCreate)} {num_word(getPassedTime(task.dateCreate))}</div>
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
        onClick={() => addItemTh(id)}
      >
        {locale("addTask")}
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
