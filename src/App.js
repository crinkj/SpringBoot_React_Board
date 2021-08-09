import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BoardList from "./components/BoardList";
import BoardWrite from "./components/BoardWrite";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={BoardList}></Route>
            <Route path="/BoardWrite" component={BoardWrite}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
