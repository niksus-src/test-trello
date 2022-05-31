import TodoItem from '../TodoItem/TodoItem'
import './todoList.scss'
import { connect } from "react-redux"
import {State} from '../store'
import { counterActions } from '../actions';
import { useEffect } from 'react';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TodoList: React.FC<Props> = ({ lists, add_listTh}) => {

    return(
        <div className="list-container">
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