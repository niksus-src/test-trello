import { connect } from 'react-redux';
import { counterActions } from '../actions';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import './todoItem.scss'

function TodoItem(props: any) {

    const { title, tasks, id, up_titleTh, up_descTh, add_itemTh, del_listTh, dal_taskTh } = props;

    return (
        <div className="item-container">
            <div className="item-top">
                <input
                    className="form-control item-title"
                    value={
                        title==='Введите заголовок' ? '' : title
                    }
                    placeholder={
                        title==='Введите заголовок' ? 'Введите заголовок' : ''
                    }
                    type="text"
                    id={id}
                    onChange={(e) => { up_titleTh(id, e.target.value) }}
                />
                <div className="item-delete"
                    onClick={() => del_listTh(id)}>
                    &#10006;
                </div>
            </div>

            <Droppable droppableId={`${id}`}>
                { provided => 
                    (<div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="item-content" >
                    {
                        tasks.map((task: any, index: number) => (
                        <Draggable key={task.id} draggableId={`${id}_${task.id}`} index={index}>
                            { provided => (
                                <div ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className='input-cont'>
                                    <input
                                        key={task.id}
                                        value={
                                            task.text==='Введите описание' ? '' : task.text
                                        }
                                        placeholder={
                                            task.text==='Введите описание' ? 'Введите описание' : ''
                                        }
                                        className="form-control item-desc"
                                        id={id}
                                        onChange={(e) => up_descTh(task.id - 1, id, e.target.value)}
                                    />
                                <div className="dragg"></div>
                                <div className="del-task"
                                    onClick={()=>dal_taskTh(task.id, id)}
                                    >
                                    &#9746;</div>
                                </div>
                            )
                        }
                        </Draggable>
                    ))}   
                    {provided.placeholder}  
                </div>)
                }
                
            </Droppable>
    
            <button
                type="button"
                className="btn item-addCard"
                onClick={() => add_itemTh(id - 1)}>
                Добавить задачу</button>
        </div>
    )
}


const mapDispatchToProps = {
    up_titleTh: counterActions.up_titleTh,
    up_descTh: counterActions.up_taskTh,
    add_itemTh: counterActions.add_itemTh,
    del_listTh: counterActions.del_listTh,
    dal_taskTh: counterActions.del_taksTh
}

export default connect(null, mapDispatchToProps)(TodoItem)