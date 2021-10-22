import { db, firebase } from "../services/firebase";

// read all
const getGrocery = (groceryType, setItems) => {
  console.log("groceryType", groceryType);
  let list = [];
  db.collection("grocery")
    .doc("groceryTypes")
    .collection(groceryType) // BreakFast, Lunch, Dinner
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        list.push(doc.data());
      });
    })
    .then(() => {
      setItems(list);
    })
    .catch((e) => console.log("getGrocery()", e));
};

// add food item
const addGroceryItem = (item, price, isAdded) => {
  console.log("item", item);
  let type;
  if (item.category === "bakingGoods") {
    type = "DryBakingGoods";
  } else if (item.category === "vegetables") {
    type = "FruitsVegetables";
  } else if (item.category === "cannedgoods") {
    type = "CannedGoods";
  } else if (item.category === "beverages") {
    type = "Beverages";
  } else if (item.category === "personalCare") {
    type = "PersonalCare";
  } else if (item.category === "cleaners") {
    type = "Cleaners";
  } else if (item.category === "others") {
    type = "Others";
  }

  let priceData = "";
  if (price === "normalPrice") {
    priceData = {
      quaterPrice: 0,
      halfPrice: 0,
      fullPrice: 0,
      cquaterPrice: 0,
      chalfPrice: 0,
      cfullPrice: 0,
      actual_price: parseFloat(item.actualPrice),
      current_price: parseFloat(item.currentPrice)
    };
  } else if (price === "quantityPrice") {
    priceData = {
      quaterPrice: parseFloat(item.quaterPrice),
      halfPrice: parseFloat(item.halfPrice),
      fullPrice: parseFloat(item.fullPrice),
      cquaterPrice: parseFloat(item.cquaterPrice),
      chalfPrice: parseFloat(item.chalfPrice),
      cfullPrice: parseFloat(item.cfullPrice),
      actualPrice: 0,
      currentPrice: 0
    };
  }

  let bucketName = "Grocery";
  let storageRef = firebase.storage().ref();
  let groceryTimestamp = +new Date().getTime() + "-" + item.img.file.name;
  let groceryImgRef = storageRef.child(`${bucketName}/${groceryTimestamp}`);
  // console.log("submit", subCategoryTimestamp, priceData);
  groceryImgRef.put(item.img.file).then(() => {
    groceryImgRef
      .getDownloadURL()
      .then((groceryImg) => {
        db.collection("grocery")
          .doc("groceryTypes")
          .collection(type)
          .add({
            Name: item.name,
            image: groceryImg,
            description: item.desc,
            category: item.category,
            isproductavaliable: item.isProductAvailable,
            Bestseller: item.bestSeller,
            dealoftheday: item.dealOfTheDay,
            Type: item.foodType,
            currency: item.currencyCode,
            unit: parseInt(item.minimumUnit),
            quantityPerUnit: parseInt(item.quantityPerUnit),
            price: priceData
          })
          .then((docRef) => {
            console.log("docRef", docRef);
            db.collection("grocery")
              .doc("groceryTypes")
              .collection(type)
              .doc(docRef.id)
              .update({
                id: docRef.id
              })
              .then(() => {
                isAdded(true);
                console.log("Food added");
              })
              .catch((e) => {
                isAdded(false);
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
            isAdded(false);
          });
      })
      .catch((e) => {
        console.log(e);
        isAdded(false);
      });
  });
};

// update food item
const updateGroceryItem = (groceryType, itemId) => {
  // which need to be update -> price, name, image, quantity
  db.collection("Grocery")
    .doc("Grocery_Types")
    .collection(groceryType)
    .doc(itemId)
    .update()
    .then()
    .catch((e) => console.log("updateFoodItem()", e));
};

// delete food item
const deleteGroceryItem = (groceryType, itemId) => {
  db.collection("Grocery")
    .doc("Grocery_Types")
    .collection(groceryType)
    .doc(itemId)
    .delete()
    .then(() => {
      console.log("successfully deleted");
    })
    .catch((e) => console.log("deleteGroceryItem()", e));
};

// rare case - scenario
// const getAllGroceries = () => {};

export { addGroceryItem, getGrocery, updateGroceryItem, deleteGroceryItem };
