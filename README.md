# Bamazon

## Description

This app is a command line based Amazon-like store front. It will will take in orders from customers and deplete stock from the store's inventory.

## Getting Started

#### Demo

[Bamazon Customer Demo](https://drive.google.com/file/d/1mOTz7dgAlD8tFQI2oEPRs3LLUV6fgyts/view?usp=sharing)

### Customer View

1. When the application starts, display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. Show the customer 2 messages:

   - The first should ask them the ID of the product they would like to buy.
   - The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, check if your store has enough of the product to meet the customer's request.

   - If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

4. However, if your store _does_ have enough of the product, fulfill the customer's order.
   - Update your SQL database to reflect the remaining quantity.
   - Once the update goes through, show the customer the total cost of their purchase.

## Built With

- Javascript
- Node.js
- MySQL

### NPM Packages

- [MySQL](https://www.npmjs.com/package/mysql)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [CLI Table](https://www.npmjs.com/package/cli-table)

## Author

- **[Ogonnaya Oshagbemi](https://github.com/Ogonnaya)**
