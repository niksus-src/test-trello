
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';

import TodoList from '../TodoList/TodoList'
import NavBar from '../NavBar/NavBar';

const App = () => {
  

  return (
  <Router>
    <NavBar/>
    <Switch>
      <Route exact path="/main" component={Main}/>
      <Route path="/:boardId" component={TodoList} />
    </Switch>
  </Router>
  );
}

export default App;
