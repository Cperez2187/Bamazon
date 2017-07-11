const mysql = require('mysql');
const inquirer = require('inquirer');
// Used to create CLI tables
const Table = require('cli-table2');

// Input connection info for the mysql database 
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'raptor22',
	database: 'bamazon_DB'
});

// Make the connection to the database and engage with the customer
connection.connect((err) => {
	if (err) throw err;

	console.log(`Connected as id ${connection.threadId}`);

	connection.query('SELECT * FROM products', (error, results) => {
		if (error) throw error;

		// Display products in table form
		productsTable(results);

		buyProduct(results);
	});
	
});


function buyProduct(products) {

	inquirer
	  .prompt([
	    // Here we create a basic text prompt.
	    {
	      type: "input",
	      name: "id",
	      message: "What is the ID of the product you would like to buy?",
	      validate: (value) => {
	      	if (value <= products.length) {
	      		return true;
	      	}
	      	return false;
	      }
	    },
	    {
	      type: "input",
	      name: "units",
	      message: "How many units of the product would you like to buy?",
	      validate: (value) => {
	      	if (value > 0) {
	      		return true;
	      	}
	      	return false;
	      }
	    }
	])
	.then((answer) => {

		let productId = answer.id;
		let unitsRequested = answer.units;

		// Retrieve product name, price and stock quantity
		let query = 'SELECT product_name, price, stock_quantity FROM products WHERE id=?';
		connection.query(query, [answer.id], (error, results) => {
			if (error) throw error;

			let productName = results[0].product_name;
			let productPrice = results[0].price;
			let stockQuantity = results[0].stock_quantity;
			// console.log(results);
			
			// console.log(`ID: ${productId} Units: ${unitsRequested} Quantity: ${stockQuantity}`);

			if (unitsRequested <= stockQuantity) {
				updateProducts(productId, unitsRequested, productName, productPrice, stockQuantity);
			} else {
				throw 'Insufficient quantity';
			}
			
		});
	});
}


// Update database when purchase is made
function updateProducts(id, units, name, price, stockQty) {
	// console.log(`ID: ${id} Units: ${units}`);

	let query = 'UPDATE products SET ? WHERE ?';

	connection.query(query,
	[
		{
			stock_quantity: stockQty - units
		},
		{
			id: id
		}
	], (error, results) => {
		if (error) throw error;

		// Show customer their purchase
		purchaseTable = new Table({
			head: ['Product', 'Units', 'Total Cost']
		});

		purchaseTable.push([name, `${units}X`, `$${units*price}`]);
		console.log('\nThank you for your purchase, here is your receipt...');
		console.log(purchaseTable.toString());
	});
}


// Creates a table to display products
function productsTable(results) {

	// Create table with headers
	const table = new Table({
		head: ['ID', 'Product Name', 'Department Name', 'Price', 'Stock Qty']
	});

	// Populate the table by looping through the database
	results.forEach((product) => {
		table.push([product.id, product.product_name, product.department_name, product.price, product.stock_quantity]);
	});

	// Display table
	console.log(table.toString());
}




















