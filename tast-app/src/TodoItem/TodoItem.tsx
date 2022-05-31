import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { counterActions } from '../actions';
import { State } from '../store';
import './todoItem.scss'
import { hover } from '@testing-library/user-event/dist/hover';

function TodoItem(props: any) {

    const { title, tasks, id, up_titleTh, up_descTh, add_itemTh, del_listTh } = props;

    // const [{ isDragging }, dragRef] = useDrag({
    //         type: 'TodoItem',
    //         collect: (monitor) => ({
    //             isDragging: monitor.isDragging(),
    //           })
    // })

    const [{ isOver }, dropRef] = useDrop({
        accept: 'TodoItem',
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
        drop: (item, monitor) => {
            const target = monitor.didDrop()
            console.log(item, target)
        }
    })

    return (
        <div className="item-container">
            <div className="item-top">
                <input
                    className="form-control item-title"
                    value={title}
                    type="text"
                    id={id}
                    onChange={(e) => { up_titleTh(id, e.target.value) }}
                />
                <div className="item-delete"
                    onClick={() => del_listTh(id)}
                >&#10006;</div>
            </div>

            <div
                ref={dropRef}
                className="item-content" >

                {
                    tasks.map((task: any) =>
                        <Input
                            listId={id}
                            key={task.id}
                            value={task.text}
                            id={task.id}
                            onChange={up_descTh}
                            dragIsOver={isOver}
                        />)
                }

            </div>

            <button
                type="button"
                className="btn item-addCard"
                onClick={() => add_itemTh(id - 1)}
            >Добавить задачу</button>
        </div>
    )
}

const Input = (props: any) => {
    const { value, id, onChange, dragIsOver, listId } = props

    const [{ isDragging }, dragRef] = useDrag({
        type: 'TodoItem',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end:(item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
            
        }
    })

    return (
        <div
            ref={dragRef}
        >
            <input
                value={value}
                style={{ backgroundColor: dragIsOver ? 'yellow' : '#ebecf0' }}
                className="form-control item-desc"
                id={id}
                onChange={(e) => onChange(id - 1, listId, e.target.value)}
            />
        </div>

    )
}

const mapDispatchToProps = {
    up_titleTh: counterActions.up_titleTh,
    up_descTh: counterActions.up_taskTh,
    add_itemTh: counterActions.add_itemTh,
    del_listTh: counterActions.del_listTh
}

export default connect(null, mapDispatchToProps)(TodoItem)