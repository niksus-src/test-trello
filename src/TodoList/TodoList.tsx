import TodoItem from '../TodoItem/TodoItem'
import './todoList.scss'
import { connect } from "react-redux"
import {State} from '../store'
import { counterActions } from '../actions';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect } from 'react';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TodoList: React.FC<Props> = ({ lists, add_listTh}) => {
    const onDragEnd = (result:any) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        // const items = reorder(
        //   state.items,
        //   result.source.index,
        //   result.destination.index
        // );
    
        // setState({
        //   items
        // });
      }
    return(
        
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
             onClick={()=>add_listTh()}
        >Добавить колонку</div>
    </DragDropContext>
    </div>
    )
}

const mapStateToProps = (state: State) => ({
    lists: state.lists
    
})

const mapDispatchToProps = {
    add_listTh: counterActions.add_listTh
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)