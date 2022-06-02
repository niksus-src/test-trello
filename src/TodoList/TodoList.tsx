import TodoItem from '../TodoItem/TodoItem'
import './todoList.scss'
import { connect } from "react-redux"
import {State} from '../store'
import { counterActions } from '../actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TodoList: React.FC<Props> = ({ lists, add_listTh, reorder_taskTh}) => {
    const onDragEnd = (result:any) => {
        
        if (!result.destination) {
          return;

        }
        const drag =  result.draggableId,
              drop = result.destination,
              indexSymb = drag.indexOf('_'),
              idList = drag.slice(0, indexSymb) - 1,
              idTask = drag.slice(indexSymb+1, drag.length) - 0,
              currentIdList = drop.droppableId - 1,
              currentIdTask = drop.index + 1
        
        reorder_taskTh(idList, idTask, currentIdList, currentIdTask)

      }

    let { boardId } = useParams() as any;
    console.log(boardId);
    
    return(
    <>
        <div className="list-container">
            <DragDropContext onDragEnd={onDragEnd}>
                    {   
                        lists.map(list => 
                            <TodoItem
                                key={list.id} 
                                title={list.title} 
                                tasks={list.tasks} 
                                id={list.id}
                                />
                        )
                    }
                <div className="btn list-addList"
                    onClick={()=>add_listTh()}>
                    Добавить колонку</div>
            </DragDropContext>
        </div>
    </> )
}

const mapStateToProps = (state: State) => ({
    lists: state.lists
})

const mapDispatchToProps = {
    add_listTh: counterActions.add_listTh,
    reorder_taskTh: counterActions.reorder_taskTh
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)