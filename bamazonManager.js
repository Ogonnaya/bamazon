// Require MySQl & Inquirer

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// Connecting to SQL Database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "1234567890",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  //   console.log("Connected as id: " + connection.threadId);
  managerView();
});

var managerView = function() {
  inquirer
    .prompt({
      name: "getStarted",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      if (answer.getStarted === "View Products for Sale") {
        viewProducts();
      } else if (answer.getStarted === "View Low Inventory") {
        lowInventory();
      } else if (answer.getStarted === "Add to Inventory") {
        addInventory();
      } else if (answer.getStarted === "Add New Product") {
        newProduct();
      } else {
        console.log("Please try again");
        managerView();
      }
    });
};

var viewProducts = function() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("Welcome to your Dashboard");
    console.log("_____________________________\n");

    var showTable = new Table({
      head: ["ID", "Product", "Department", "Price", "Stock Quantity"],
      colWidths: [10, 15, 15, 10, 10]
    });

    for (var i = 0; i < res.length; i++) {
      showTable.push([
        res[i].id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(showTable.toString());
    console.log("");
    managerView();
  });
};
var lowInventory = function() {
  console.log("This lets you see products that are low");
};

var addInventory = function() {
  console.log("This lets you see add to the inventory of current items");
};

var newProduct = function() {
  console.log("This lets you see add new products");
};
