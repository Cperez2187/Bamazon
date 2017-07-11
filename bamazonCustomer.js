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

// Make the connection to the database
connection.connect((err) => {
	if (err) throw err;

	console.log(`Connected as id ${connection.threadId}`);

	displayProducts();
});

function displayProducts() {

	connection.query('SELECT * FROM products', (error, results) => {
		if (error) throw error;

		productsTable(results);
	});
}

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




















