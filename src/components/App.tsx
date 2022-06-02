import TodoList from '../TodoList/TodoList'
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

const App = () => {
  

  return (
  <Router>
    <NavBar/>
    <Switch>
      <Route path="/:boardId" component={TodoList} />
    </Switch>
  </Router>
  );
}

export default App;
