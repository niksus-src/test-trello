import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../components/Main/Main";
import { useEffect } from "react";
import { Board, List } from "../types";
import { counterActions } from "../actions";
import { connect } from "react-redux";

import TodoList from "./TodoList/TodoList";
import NavBar from "../components/NavBar/NavBar";
import { State } from "../store";

const App = ({ setStateTh }: any) => {
  useEffect(() => {
    setStateTh(
      localStorage.getItem("boards") ? 
      JSON.parse(localStorage.getItem("boards") || "{}") as Array<Board> : null,
      localStorage.getItem("lists") ? 
      JSON.parse(localStorage.getItem("lists") || "{}") as Array<List> : null
    )
  });

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route path="/:boardId" component={TodoList} />
      </Switch>
    </Router>
  );
};


const mapStateToProps = (state: State) => {
  return {
    lang: state.language
  }
}

const mapDispatchToProps = {
  addListTh: counterActions.addListTh,
  reorderTaskTh: counterActions.reorderTaskTh,
  setStateTh: counterActions.setStateTh,
  setBgBoardTh: counterActions.setBgBoardTh,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
