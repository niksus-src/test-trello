import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import { Link, useHistory } from "react-router-dom";
import { counterActions } from "../../actions";
import Popup from "../Popup/Popup";

import "./NavBar.scss";
import locale from "../../utils/locale/locale";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = ({
  boards,
  addBoardTh,
  setStateTh,
  delBoardTh,
  setLangTh
}) => {
  let history = useHistory();
  useEffect(() => {
    if (boards.length === 0) {
      history.push("/main");
    }
  }, [boards]);

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

  type modalOpenType = {
    isVisible: boolean;
    id: number | null;
  };

  const [modalOpen, setOpenModal] = useState<modalOpenType>({
    isVisible: false,
    id: null,
  });

  return (
    <>
      {modalOpen.isVisible && (
        <Popup
          boardId={modalOpen.id}
          close={(isVisible: boolean) => setOpenModal({ isVisible, id: null })}
        />
      )}
      <div className="nav-boards_wrapper" ref={boardsRef}>
        {boards.map((board) => {
          return (
            <div className="nav-item board-item" key={board.id}>
              <Link
                to={`/${board.id}`}
                className="nav-item-link"
                key={board.id}
              >
                {`${locale("board")} ${board.id}`}
              </Link>
              <span
                className="board-del"
                onClick={() => setOpenModal({ isVisible: true, id: board.id })}
              >
                ✖
              </span>
            </div>
          );
        })}
        <button className="nav-item btn board" onClick={addBoardTh}>
          {locale("add")}
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
            {locale("main")}
          </Link>
          <select name="lang" className="form-select nav-select" onChange={(e)=>setLangTh(e.target.value)}>
            <option value="Rus">Ru</option>
            <option value="Eng">Eng</option>
          </select>
          <hr className="nav-line_decoration" />
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  boards: state.boards,
  lang: state.language
});

const mapDispatchToProps = {
  addBoardTh: counterActions.addBoardTh,
  setStateTh: counterActions.setStateTh,
  delBoardTh: counterActions.delBoardTh,
  setLangTh: counterActions.setLangTh
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
