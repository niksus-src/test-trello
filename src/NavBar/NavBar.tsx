import { useEffect } from "react";
import { connect } from "react-redux"
import {State} from '../store'
import { Link } from "react-router-dom";
import { counterActions } from '../actions';
import { Board } from "../types"; 

import './NavBar.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = ({boards, add_boardTh, set_boardTh}) => {

    useEffect(() => {
        const localBoards = JSON.parse(localStorage.getItem("boards") || "{}") as Array<Board>
        
        let boards

        if (Object.keys(localBoards).length ) {
            console.log('setBoard');
            
            boards = localBoards
            set_boardTh(boards)
        } 
    }, [])

    return (
        <nav>
            <div className="nav-container">
                <Link to="/main" className="nav-item btn">Главная</Link>
                {
                    boards.map(board => {
                        return <Link to={`/${board.id}`} key={board.id} className="nav-item btn">
                            {`Доска ${board.id}`}
                        </Link>
                    })
                }
                <button className="nav-item btn"
                    onClick={add_boardTh}>
                    Добавить</button>
            </div>
        </nav>
    )
}
const mapStateToProps = (state: State) => ({
    boards: state.boards
})

const mapDispatchToProps = {
    add_boardTh: counterActions.add_boardTh,
    set_boardTh: counterActions.set_boardTh
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)