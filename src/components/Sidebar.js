import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Food from "./FoodItems/Food";
import Grocery from "./Grocery/Grocery";
import AddNew from "./FoodItems/AddNew/AddNew";
import AddNewItem from "./Grocery/AddNewItem/AddNewItem";
import FoodItem from "./FoodItems/FoodItem";
import Items from "../reusable/Items/Items";

const Sidebar = () => {
  return (
    <section>
      {/* <!-- main content --> */}
      <div className="container-fluid pt">
        <div className="flex-wrapper">
          <div className="sidebar">
            <ul className="sidebar-list">
              <li className="list-item">
                <NavLink
                  to="/home/dashboard"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i className="fas fa-tachometer-alt"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/dashboard.png"
                    alt="dashboard"
                  />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/profile"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i className="far fa-user"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/user.png"
                    alt="profile"
                  />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/fooditems"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i class="fas fa-utensils"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/cutlery.png"
                    alt="fooditem"
                  />
                  <span>Food Items</span>
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink
                  to="/home/grocery"
                  activeClassName="active"
                  className="list-link"
                >
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  <img
                    className="img-fluid"
                    src="/images/grocery.png"
                    alt="grocery"
                  />
                  <span>Grocery</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="rt">
            <Switch>
              {/* Food */}
              <Route path="/home/fooditems/addnew">
                <AddNew type="food" />
              </Route>
              <Route path="/home/fooditems/breakfast">
                {/* <BreakFast /> */}
                {/* <FoodItem title="BreakFast" type="food" /> */}
                <Items title="BreakFast" type="food" />
              </Route>
              <Route path="/home/fooditems/lunch">
                {/* <Lunch /> */}
                <Items title="Lunch" type="food" />
              </Route>
              <Route path="/home/fooditems/dinner">
                {/* <Dinner /> */}
                <Items title="Dinner" type="food" />
              </Route>
              <Route path="/home/fooditems/starters">
                {/* <Starters /> */}
                <Items title="Starters" type="food" />
              </Route>
              <Route path="/home/fooditems/desserts">
                {/* <Desserts /> */}
                <Items title="Desserts" type="food" />
              </Route>
              <Route path="/home/fooditems/bigdeal">
                {/* <BigDeal /> */}
                <Items title="BigDeal" type="food" />
              </Route>
              <Route path="/home/fooditems/juice">
                {/* <Juice /> */}
                <Items title="Juice" type="food" />
              </Route>
              <Route path="/home/fooditems">
                <Food />
              </Route>

              {/* Grocery */}
              <Route path="/home/grocery/drybaking">
                <Items title="DryBakingGoods" type="grocery" />
              </Route>
              <Route path="/home/grocery/fruitsvegs">
                <Items title="FruitsVegetables" type="grocery" />
              </Route>
              <Route path="/home/grocery/cannedgoods">
                <Items title="CannedGoods" type="grocery" />
              </Route>
              <Route path="/home/grocery/beverages">
                <Items title="Beverages" type="grocery" />
              </Route>
              <Route path="/home/grocery/personalcare">
                <Items title="PersonalCare" type="grocery" />
              </Route>
              <Route path="/home/grocery/cleaners">
                <Items title="Cleaners" type="grocery" />
              </Route>
              <Route path="/home/grocery/others">
                <Items title="Others" type="grocery" />
              </Route>
              <Route path="/home/grocery/addnewitem">
                <AddNewItem type="grocery" />
              </Route>
              <Route path="/home/grocery">
                <Grocery />
              </Route>

              <Route path="/home/profile"></Route>
              <Route path="/home/dashboard">
                <h1>Home</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
