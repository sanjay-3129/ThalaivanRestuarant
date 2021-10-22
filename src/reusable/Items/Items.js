import React, { useEffect, useState } from "react";
// import { getFood } from "../../api/FoodDB";
import { getItems } from "../../api/ItemDB";
import Card from "../Card/Card";

const Items = (props) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems(props.title, props.type, (res) => {
      setItems(res);
    });
  }, []);

  let ui = null;
  if (items === null) {
    ui = <p>Loading!!!</p>;
  } else {
    if (items.length <= 0) {
      ui = <p>No Items!!!</p>;
    } else {
      ui = items.map((item) => <Card key={item.id} item={item} />);
    }
  }

  return (
    <>
      <h1>{props.title}</h1>
      <div class="row item-card">{ui}</div>
    </>
  );
};

export default Items;
