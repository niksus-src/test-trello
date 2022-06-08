import { connect } from "react-redux";
import { counterActions } from "../../actions";
import locale from "../../utils/locale/locale";

import './popup.scss'

const Popup = ({boardId, delBoardTh, close}: any) => {

    return(
        <div className="popup">
            <div className="popup-wrapper">
                <div className="popup-container">
                    <div className="popup-title">{locale("delBoard")} {boardId}</div>
                    {locale("areYouSure")}?
                    <div className="popup-content">
                        <button type="button" className="btn btn-danger" onClick={() => {delBoardTh(boardId); close(false)}}>{locale("confirm")}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => close(false)}>{locale("cancel")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    delBoardTh: counterActions.delBoardTh
};

export default connect(null, mapDispatchToProps)(Popup);