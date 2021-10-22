import React from "react";
import { Link } from "react-router-dom";
import Card from "../../reusable/Card/Card";

const Food = () => {
  return (
    <section>
      <div className="row fooditem">
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Add New Item</p>
            <Link
              to="/home/grocery/addnewitem"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Dry/Baking Goods</p>
            <Link
              to="/home/grocery/drybaking"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Fruits/Vegetables</p>
            <Link
              to="/home/grocery/fruitsvegs"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Canned goods</p>
            <Link
              to="/home/grocery/cannedgoods"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Beverages</p>
            <Link
              to="/home/grocery/beverages"
              className="stretched-link"
            ></Link>
          </div>
        </div>{" "}
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/supermarket.png"
              alt="addnew"
            />
            <p className="title">Personal Care </p>
            <Link
              to="/home/grocery/personalcare"
              className="stretched-link"
            ></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img
              className="img-fluid"
              src="/images/harvest.png"
              alt="breakfast"
            />
            <p className="title">Cleaners</p>
            <Link to="/home/grocery/cleaners" className="stretched-link"></Link>
          </div>
        </div>
        <div className="col-sm-4 col-md-3 col-lg-3">
          <div className="cards">
            <img className="img-fluid" src="/images/rice.png" alt="lunch" />
            <p className="title">Others</p>
            <Link to="/home/grocery/others" className="stretched-link"></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Food;
