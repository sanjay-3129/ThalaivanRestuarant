import { db, firebase } from "../services/firebase";

// read all - food & grocery
const getItems = (title, type, setItems) => {
  console.log("ItemDB", title);
  let list = [];
  db.collection(type)
    .doc(type + "Types")
    .collection(title) // BreakFast, PersonalCare
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

// add item - food & grocery
const addItem = (item, price, type, isAdded) => {
  console.log("item", item);
  let title = "";
  if (type === "food") {
    if (item.category === "breakfast") {
      title = "BreakFast";
    } else if (item.category === "lunch") {
      title = "Lunch";
    } else if (item.category === "dinner") {
      title = "Dinner";
    }
  } else {
    if (item.category === "bakingGoods") {
      title = "DryBakingGoods";
    } else if (item.category === "vegetables") {
      title = "FruitsVegetables";
    } else if (item.category === "cannedgoods") {
      title = "CannedGoods";
    } else if (item.category === "beverages") {
      title = "Beverages";
    } else if (item.category === "personalCare") {
      title = "PersonalCare";
    } else if (item.category === "cleaners") {
      title = "Cleaners";
    } else if (item.category === "others") {
      title = "Others";
    }
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

  let bucketName = type === "food" ? "Foods" : "Grocery";
  let storageRef = firebase.storage().ref();
  let subCategoryTimestamp = +new Date().getTime() + "-" + item.img.file.name;
  let imgRef = storageRef.child(`${bucketName}/${subCategoryTimestamp}`);
  // console.log("submit", subCategoryTimestamp, priceData);
  imgRef.put(item.img.file).then(() => {
    imgRef
      .getDownloadURL()
      .then((img) => {
        let data = "";
        if (type === "food") {
          data = {
            Name: item.name,
            image: img,
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
          };
        } else {
          data = {
            Name: item.name,
            image: img,
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
          };
        }

        db.collection(type)
          .doc(type + "Types")
          .collection(title)
          .add(data)
          .then((docRef) => {
            console.log("docRef", docRef);
            db.collection(type)
              .doc(type + "Types")
              .collection(title)
              .doc(docRef.id)
              .update({
                id: docRef.id
              })
              .then(() => {
                isAdded(true);
                console.log("Item added");
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

// update item - food & grocery
const updateItem = (foodType, itemId, title, type) => {
  // which need to be update -> price, name, image, quantity
  db.collection(type)
    .doc(type + "Types")
    .collection(title)
    .doc(itemId)
    .update()
    .then()
    .catch((e) => console.log("updateItem()", e));
};

// delete item - food & grocery
const deleteItem = (foodType, itemId, title, type) => {
  db.collection(type)
    .doc(type + "Types")
    .collection(title)
    .doc(itemId)
    .delete()
    .then(() => {
      console.log("successfully deleted");
    })
    .catch((e) => console.log("deleteItem()", e));
};

export { getItems, addItem, deleteItem, updateItem };
