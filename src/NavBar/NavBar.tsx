
import { connect } from "react-redux"
import {State} from '../store'
import { Link } from "react-router-dom";
import './NavBar.scss'


type Props = ReturnType<typeof mapStateToProps>;

const NavBar: React.FC<Props> = ({boards}) => {
    return (
        <nav>
            <div className="nav-container">
                {
                    boards.map(board => {
                        return <Link to={`/${board.id}`} key={board.id} className="nav-item btn">
                            {board.title}
                        </Link>
                    })
                }
            </div>
        </nav>
    )
}
const mapStateToProps = (state: State) => ({
    boards: state.boards
})

export default connect(mapStateToProps)(NavBar)