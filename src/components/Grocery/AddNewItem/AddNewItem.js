import React, { useState } from "react";
import AddNewForm from "./AddNewForm";
// import { db, firebase } from "../../../services/firebase";
// import BreakFast from "../BreakFast/BreakFast";
import $ from "jquery";
import { addGroceryItem } from "../../../api/GroceryDB";
import { addItem } from "../../../api/ItemDB";

const AddNewItem = (props) => {
  const [item, setItem] = useState({
    id: "",
    productId: "", // we generate it
    name: "",
    img: {
      file: null,
      url: ""
    },
    altName: "",
    desc: "",
    category: "", // breakfase, lunch, dinner

    foodType: "", // nonveg, veg
    offer: 0, // actual price - offer price = current price
    bestSeller: false,
    currencyCode: 356, // 356 - INR
    dealOfTheDay: false,
    onSale: false,
    minimumUnit: 0,
    quantityPerUnit: 1,
    isProductAvailable: false,
    quaterPrice: 0,
    halfPrice: 0,
    fullPrice: 0,
    cquaterPrice: 0,
    chalfPrice: 0,
    cfullPrice: 0,
    actualPrice: 0,
    currentPrice: 0 // doubt
    // categories: ["dhosa"]
    // foodAvailable: [
    //   {
    //     branch: "vellore",
    //     minimumUnit: 0,
    //     quantityPerUnit: 0,
    //     isProductAvailable: false
    //   }
    // ],
  });
  const [price, setPrice] = useState(null);

  const onChangeHandler = (event) => {
    // console.log("event.name", event.target.name, event.target.value);

    // setChecked((prevState) => !prevState);

    let value = event.target.value;
    let ename = event.target.name;

    if (ename === "img") {
      value = event.target.files[0];
      // console.log("url", URL.createObjectURL(value));
      setItem((prevState) => {
        return {
          ...prevState,
          img: {
            file: value,
            url: URL.createObjectURL(value)
          }
        };
      });
    } else if (
      ename === "dealOfTheDay" ||
      ename === "onSale" ||
      ename === "isProductAvailable" ||
      ename === "bestSeller"
    ) {
      setItem((prevState) => {
        value = !prevState[event.target.name];
        // console.log(event.target.name, value);
        return {
          ...prevState,
          [event.target.name]: value
        };
      });
    } else if (ename === "price") {
      setPrice(value);
    }
    // else if (ename === "actualPrice" || ename === "currentPrice") {
    //   setItem((prevState) => {
    //     return {
    //       ...prevState,
    //       [event.target.name]: value
    //     };
    //   });
    // }
    else {
      setItem((prevState) => {
        return {
          ...prevState,
          [event.target.name]: value
        };
      });
    }
  };

  const clearHandler = () => {
    document.getElementById("img").value = "";
    $(":checkbox").attr("checked", false);
    setPrice(null);
    setItem({
      id: "",
      productId: "", // we generate it
      name: "",
      img: {
        file: null,
        url: ""
      },
      altName: "",
      desc: "",
      category: "", // breakfase, lunch, dinner
      style: "", // southindian, northindian
      foodType: "", // nonveg, veg
      offer: 0, // actual price - offer price = current price
      bestSeller: false,
      currencyCode: 356, // 356 - INR
      dealOfTheDay: false,
      onSale: false,
      minimumUnit: 0,
      quantityPerUnit: 1,
      isProductAvailable: false,
      quaterPrice: 0,
      halfPrice: 0,
      fullPrice: 0,
      cquaterPrice: 0,
      chalfPrice: 0,
      cfullPrice: 0,
      actualPrice: 0,
      currentPrice: 0 // doubt
      // categories: ["dhosa"]
      // foodAvailable: [
      //   {
      //     branch: "vellore",
      //     minimumUnit: 0,
      //     quantityPerUnit: 0,
      //     isProductAvailable: false
      //   }
      // ],
    });
  };

  const draftHandler = (e) => {
    e.preventDefault();
    // console.log("draft", item);
    clearHandler();
    addItem(item, price, props.type, (isAdded) => {
      if (isAdded) {
        // db added
        alert("Successfully Added!!!");
        clearHandler();
      } else {
        // error not adding
        alert("Not Added... Try Again!!!");
      }
    });
    // addGroceryItem(item, price, (isAdded) => {
    //   if (isAdded) {
    //     // db added
    //     alert("Successfully Added!!!");
    //     clearHandler();
    //   } else {
    //     // error not adding
    //     alert("Not Added... Try Again!!!");
    //   }
    // });
  };

  return (
    <div class="add-new">
      <h2>Add one or more items</h2>
      <div class="add-form">
        <AddNewForm
          item={item}
          onChangeHandler={onChangeHandler}
          draftHandler={draftHandler}
          clearHandler={clearHandler}
          price={price}
        />
        ;
      </div>
    </div>
  );
};

export default AddNewItem;
