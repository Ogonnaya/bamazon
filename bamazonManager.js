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
  console.log("");

  inquirer
    .prompt({
      name: "getStarted",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.getStarted) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          newProduct();
          break;

        case "Exit":
          exitApp();
          break;

        default:
          console.log("That is not a valid option. Please try again");
          managerView();
      }
    });
};

var showTable = function(err, res) {
  if (err) throw err;
  console.log("");
  var table = new Table({
    head: ["ID", "Product", "Department", "Price", "Stock Quantity"],
    colWidths: [10, 15, 15, 10, 10]
  });

  for (var i = 0; i < res.length; i++) {
    table.push([
      res[i].id,
      res[i].product_name,
      res[i].department_name,
      "$" + res[i].price,
      res[i].stock_quantity
    ]);
  }
  console.log(table.toString());
  console.log("");
};

// View product table information
var viewProducts = function() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    showTable(err, res);
    managerView();
  });
};

// View items with low inventory - in this case, items with stock quantity below 100
var lowInventory = function() {
  //   console.log("This lets you see products that are low");
  var query = "SELECT * FROM products WHERE stock_quantity < 100";
  connection.query(query, function(err, res) {
    showTable(err, res);
    managerView();
  });
};

// Add items to the inventory
var addInventory = function() {
  //   console.log("This lets you see add to the inventory of current items")
};
// Add new product to inventory
var newProduct = function() {
  //   console.log("This lets you see add new products");
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the product name:"
      },
      {
        name: "department",
        type: "input",
        message: "Enter the product department:"
      },
      {
        name: "price",
        type: "input",
        message: "Enter the product price:",
        validate: value => {
          if (!isNaN(value) && value > 0) {
            return true;
          } else {
            console.log("Oops, please enter a number greater than 0");
          }
          return false;
        }
      },
      {
        name: "stockNum",
        type: "input",
        message: "Enter the number of items in stock:",
        validate: value => {
          if (!isNaN(value) && value > 0) {
            return true;
          } else {
            console.log("Oops, please enter a number greater than 0");
            return false;
          }
        }
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answers.name,
          department_name: answers.department,
          price: answers.price,
          stock_quantity: answers.stockNum
        },
        (err, res) => {
          if (err) throw err;
          console.log("\n\tItem successfully added!");
          viewProducts();
        }
      );
    });
};

var exitApp = function() {
  connection.end();
};
