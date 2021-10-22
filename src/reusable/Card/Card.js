import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <>
      <div class="col-lg-3 col-md-4 col-sm-3">
        <div class="card">
          <div class="overlay">{props.item.Type}</div>
          <img src={props.item.image} alt={props.item.Name} />
          <div class="card-body">
            <h3 class="card-title">
              {props.item.Name}
              {/* {props.item.Name}<span>({props.item.Name})</span> */}
            </h3>
            <div class="edit-option">
              <i class="fa fa-pencil-square-o"></i>
            </div>
            <div class="trash-option">
              <i class="fa fa-trash"></i>
            </div>
            <p>Product Description</p>
            <p>
              Style:{" "}
              <span style={{ fontFamily: "sans-serif" }}>
                {props.item.style}
              </span>
            </p>
            <p class="time" style={{ textTransform: "capitalize" }}>
              {props.item.category}
            </p>
            {/* <p class="time">Dinner</p> */}
            <form class="quantity">
              <label for="quantity">Qty Per Unit :</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                max=""
                value={props.item.quantityPerUnit}
              />
              <label for="quantity">Min Unit :</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                max=""
                value={props.item.unit}
              />
            </form>
            {/* <form></form> */}

            <hr />
            {/* <p class="food-rating">
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
              <span class="fa fa-star" aria-hidden="true"></span>
            </p> */}

            <p class="price ">
              <i class=" fa fa-inr" aria-hidden="true "></i>5
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
