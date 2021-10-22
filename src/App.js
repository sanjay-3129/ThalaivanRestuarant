import "./styles.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./ui/404Error";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}
