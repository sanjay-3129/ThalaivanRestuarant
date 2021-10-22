import { db, firebase } from "../services/firebase";

// read all
const getFood = (title, type, setItems) => {
  console.log("foodType", title);
  let list = [];
  db.collection(type)
    .doc(type + "Types")
    .collection(title) // BreakFast, Lunch, Dinner
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        list.push(doc.data());
      });
    })
    .then(() => {
      setItems(list);
    })
    .catch((e) => console.log("getFood()", e));
};

// add food item
const addFoodItem = (item, price, isAdded) => {
  console.log("item", item);
  let type;
  if (item.category === "breakfast") {
    type = "BreakFast";
  } else if (item.category === "lunch") {
    type = "Lunch";
  } else if (item.category === "dinner") {
    type = "Dinner";
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

  let bucketName = "Foods";
  let storageRef = firebase.storage().ref();
  let subCategoryTimestamp = +new Date().getTime() + "-" + item.img.file.name;
  let foodImgRef = storageRef.child(`${bucketName}/${subCategoryTimestamp}`);
  // console.log("submit", subCategoryTimestamp, priceData);
  foodImgRef.put(item.img.file).then(() => {
    foodImgRef
      .getDownloadURL()
      .then((foodImg) => {
        db.collection("food")
          .doc("foodTypes")
          .collection(type)
          .add({
            Name: item.name,
            image: foodImg,
            description: item.desc,
            category: item.category,
            isproductavaliable: item.isProductAvailable,
            Bestseller: item.bestSeller,
            dealoftheday: item.dealOfTheDay,
            Type: item.foodType,
            style: item.style,
            currency: item.currencyCode,
            unit: parseInt(item.minimumUnit),
            quantityPerUnit: parseInt(item.quantityPerUnit),
            price: priceData
          })
          .then((docRef) => {
            console.log("docRef", docRef);
            db.collection("food")
              .doc("foodTypes")
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
const updateFoodItem = (foodType, itemId) => {
  // which need to be update -> price, name, image, quantity
  db.collection("Food")
    .doc("Food_Types")
    .collection(foodType)
    .doc(itemId)
    .update()
    .then()
    .catch((e) => console.log("updateFoodItem()", e));
};

// delete food item
const deleteFoodItem = (foodType, itemId) => {
  db.collection("Food")
    .doc("Food_Types")
    .collection(foodType)
    .doc(itemId)
    .delete()
    .then(() => {
      console.log("successfully deleted");
    })
    .catch((e) => console.log("deleteFoodItem()", e));
};

// rare case - scenario
// const getAllFoods = () => {};

export { getFood, addFoodItem, updateFoodItem, deleteFoodItem };
