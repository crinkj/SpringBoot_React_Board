import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BoardList from "./components/BoardList";
import BoardWrite from "./components/BoardWrite";
import BoardDetail from "./components/BoardDetail";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/Board" exact component={BoardList}></Route>
            <Route path="/" exact component={BoardList}></Route>
            <Route path="/BoardWrite/:idx" component={BoardWrite}></Route>
            <Route path="/BoardDetail/:idx" component={BoardDetail}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
