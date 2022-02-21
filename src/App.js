import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MiniDrawer from "./components/Drawer";
import NewProduct from "./components/New";
import FullFeaturedCrudGrid from "./components/Edit";
import ViewItem from "./components/viewitem";
import Orders from "./components/OrderPage";
import Users from "./components/Users";
function App() {
  return (
    <Router>
      <MiniDrawer>
        <Switch>
          <Route path="/edit" exact component={FullFeaturedCrudGrid}></Route>
          <Route path="/users" exact component={Users}></Route>
          <Route path="/viewitem/:id" exact component={ViewItem}></Route>
          <Route path="/newproduct" exact component={NewProduct}></Route>
          <Route path="/order" exact component={Orders}></Route>
        </Switch>
      </MiniDrawer>
    </Router>
  );
}

export default App;
