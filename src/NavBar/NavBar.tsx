import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { State } from "../store";
import { Link } from "react-router-dom";
import { counterActions } from "../actions";
import { Board } from "../types";

import "./NavBar.scss";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = ({
  boards,
  addBoardTh,
  setStateTh,
  delBoardTh,
}) => {
    
  useEffect(() => {
    const localBoards = JSON.parse(
      localStorage.getItem("boards") || "{}"
    ) as Array<Board>;

    let boards;

    if (Object.keys(localBoards).length) {
      boards = localBoards;
      setStateTh(boards, null);
    }
  }, []);

  const boardsRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const viewBoards = () => {
    const boardsWrapperClass = boardsRef.current.classList,
      btnClass = btnRef.current.classList;

    btnClass.toggle("open");

    if (boardsWrapperClass.contains("show-boards")) {
      boardsWrapperClass.add("slide-in-right");
      setTimeout(() => {
        boardsWrapperClass.remove("slide-in-left");
        boardsWrapperClass.remove("show-boards");
      }, 500);
    } else {
      boardsWrapperClass.remove("slide-in-right");
      boardsWrapperClass.toggle("slide-in-left");
      boardsWrapperClass.add("show-boards");
    }
  };

  return (
    <>
      <div className="nav-boards_wrapper" ref={boardsRef}>
        {boards.map((board) => {
          return (
            <div className="nav-item board-item" key={board.id}>
              <Link
                to={`/${board.id}`}
                className="nav-item-link"
                key={board.id}
              >
                {`Доска ${board.id}`}
              </Link>
              <span className="board-del" onClick={() => delBoardTh(board.id)}>
                ✖
              </span>
            </div>
          );
        })}
        <button className="nav-item btn board" onClick={addBoardTh}>
          Добавить
        </button>
      </div>
      <nav>
        <div className="nav-container">
          <div className="nav-icon1" onClick={viewBoards} ref={btnRef}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Link to="/main" className="nav-item btn btn-main">
            Главная
          </Link>
          <hr className="nav-line_decoration" />
        </div>
      </nav>
    </>
  );
};
const mapStateToProps = (state: State) => ({
  boards: state.boards,
});

const mapDispatchToProps = {
  addBoardTh: counterActions.addBoardTh,
  setStateTh: counterActions.setStateTh,
  delBoardTh: counterActions.delBoardTh,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
