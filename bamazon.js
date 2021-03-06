// import the required npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");
const cTable = require('console.table');

// var table = require()
// connect to the database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "pASSWORD",
  database: "bamazon_db"
});
// initialise the connection to database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayItems()
});
function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
   
    console.table(res);
    startPrompt()
  });
}

var responseInq
var quantity
function startPrompt() {

  inquirer.prompt([
    {
      type: "input",
      message: "Enter the ID of the product you would like to buy",
      name: "item_id"
    },
    {
      type: "input",
      message: "How many units of the product they would like to buy?",
      name: "quantity"
    }
  ]).then(function (response) {
    responseInq = response.item_id
    quantity = response.quantity
    console.log("Your Order:")
    getItemData()

  })
}
function getItemData() {
  connection.query("SELECT * FROM products WHERE ?", {
    id: responseInq
  }, function (err, result) {
    if (err) throw err
    console.log("ID: " + result[0].id)
    console.log("Product name: " + result[0].product_name)
    console.log("Department: " + result[0].department_name)
    console.log("Price: " + result[0].price)
    if (quantity < result[0].stock_quantity) {
      console.log("Quantity: " + quantity)
      console.log(result[0].stock_quantity)
      result[0].stock_quantity -= quantity
      console.log(result[0].stock_quantity+"after")
      updateQuantity(result[0].id, result[0].stock_quantity)
      console.log("Total amount: " + quantity * (result[0].price))
    } else {
      console.log("insufficient quantity..")
      startPrompt()
    }

    // startPrompt()

  })
}
function updateQuantity(sel_id, new_Quantity){
  console.log("here"+sel_id)
  console.log("here5"+new_Quantity)
  var query = connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      // quantity: 
      stock_quantity: new_Quantity
    },
    {
      id:sel_id
    }
  ],function(err){
    if (err) throw err
  })
}