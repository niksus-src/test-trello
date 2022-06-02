import { useEffect, useRef } from "react";
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

    const boardsRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const viewBoards = () => {
        const boardsWrapperClass = boardsRef.current.classList,
              btnClass = btnRef.current.classList

        btnClass.toggle('open')


        if(boardsWrapperClass.contains('show-boards')){
            boardsWrapperClass.add('slide-in-right')
            setTimeout(() => {
                boardsWrapperClass.remove('slide-in-left')
                boardsWrapperClass.remove('show-boards') 
            }, 500);
        } else {
            boardsWrapperClass.remove('slide-in-right')
            boardsWrapperClass.toggle('slide-in-left')
            boardsWrapperClass.add('show-boards') 
        }

    }

    return (
        <>
          <div className="nav-boards_wrapper" ref={boardsRef} >
                {
                    boards.map(board => {
                        return <Link to={`/${board.id}`} key={board.id} className="nav-item btn board">
                            {`Доска ${board.id}`}
                        </Link>
                    })
                }
                <button className="nav-item btn board"
                    onClick={add_boardTh}>
                    Добавить</button>
            </div>
            <nav>
                <div className="nav-container">
                <div className="nav-icon1" onClick={viewBoards} ref={btnRef}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {/* <div className="nav-btn_wrapper">
                        <div className="nav-btn" onClick={()=>viewBoards()}>
                            <span className="nav-btn_line"></span>
                            <span className="nav-btn_line"></span>
                            <span className="nav-btn_line"></span>
                        </div>
                </div> */}

                    <Link to="/main" className="nav-item btn btn-main">Главная</Link>
                    <hr className='nav-line_decoration'/>
                </div>
            </nav>
        </>
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