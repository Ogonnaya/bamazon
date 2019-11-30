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
  if (err) throw err;
  //   console.log("Connected as id: " + connection.threadId);
  showItems();
});

// Show product table when app is started

function showItems() {
  // Construct the db query string
  var query = "SELECT * FROM products";

  // Make the db query
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("Welcome to Bamazon");
    console.log("_____________________________\n");

    // Using cli-table npm package to make table cleaner
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
    console.log("");
    // Function to start ordering process
    start();
  });
}

function start() {
  // Prompt the customer for item they would like to purchase
  inquirer
    .prompt({
      name: "itemID",
      type: "input",
      message: "Please enter the ID of the item you want to buy.",
      filter: Number
    })
    .then(function(ansOne) {
      var item = ansOne.itemID;
      connection.query("SELECT * FROM products WHERE id=?", item, function(
        err,
        res
      ) {
        if (err) throw err;

        // If customer enters ID that does not exist show product table and ask customer to select again.
        if (res.length === 0) {
          console.log(
            "That product does not exist, please enter an ID from the table above"
          );
          start();
        } else {
          // Prompt the customer for quantity they would like to purchase
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many items would you like to buy?",
              filter: Number
            })
            .then(function(ansTwo) {
              var quantity = ansTwo.quantity;
              // If customer selects a quantity that is more than stock quantity, show the message below and ask customer to select again
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "We only have " +
                    res[0].stock_quantity +
                    " of the item you selected"
                );
                console.log("");
                start();
              } else {
                //  If customer order is successful, show item purchased, quantity purchased and total price
                console.log("");
                console.log(res[0].product_name + " purchased");
                console.log(quantity + " qty @ $" + res[0].price + " each");

                var totalQuant = quantity * res[0].price;
                var total = totalQuant.toFixed(2);

                console.log("Your total is: " + "$" + total);
                // Update stock quantity in database
                var newQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity = " +
                    newQuantity +
                    " WHERE id = " +
                    res[0].id,
                  function(err, res) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your Order has been Processed");
                    console.log("Thank you for Shopping with us...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
}
