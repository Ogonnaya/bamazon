// Require MySQl & Inquirer

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// Connecting CLI to SQL Database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "1234567890",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  showItems();
});

function showItems() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  var query = "SELECT * FROM products";

  // Make the db query
  connection.query(query, function(err, res) {
    if (err) throw err;

    console.log("Welcome to Bamazon");
    console.log("_____________________________\n");

    var showTable = new Table({
      head: ["ID", "Product", "Deparment", "Price"],
      colWidths: [10, 15, 15, 10]
    });

    for (var i = 0; i < res.length; i++) {
      showTable.push([
        res[i].id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price
      ]);
    }
    console.log(showTable.toString());
    console.log("_____________________________\n");
    //Prompt the user for item/quantity they would like to purchase
    start();
  });
}

function start() {
  inquirer
    .prompt({
      name: "itemID",
      type: "input",
      message: "Please enter the ID of the item you want to buy.",
      filter: Number
    })
    .then(function(answer) {
      var item = input.itemID;
    });
}
