import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MiniDrawer from "./components/Drawer";
import NewProduct from "./components/New";
import FullFeaturedCrudGrid from "./components/Edit";
import ViewItem from "./components/viewitem";

function App() {
  return (
    <Router>
      <MiniDrawer>
        <Switch>
          <Route path="/edit" exact component={FullFeaturedCrudGrid}></Route>

          <Route path="/viewitem/:id" exact component={ViewItem}></Route>
          <Route path="/newproduct" exact component={NewProduct}></Route>
        </Switch>
      </MiniDrawer>
    </Router>
  );
}

export default App;
