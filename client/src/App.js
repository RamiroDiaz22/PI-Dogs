import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage/LandingPage.jsx";
import Home from "./component/Home/Home.jsx";
import CreateDog from "./component/CreateDog/CreateDog.jsx";
import Details from "./component/Details/Details.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreateDog} />
          <Route path="/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
