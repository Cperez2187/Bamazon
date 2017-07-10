const mysql = require('mysql');
const inquirer = require('inquirer');

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

		// console.log(results);
		console.log('id   | Product Name       | Department Name     | Price    | Stock Quantity');
		// Loop through table and display products
		results.forEach((product) => {
			console.log(`${product.id}   | ${product.product_name}       | ${product.department_name}     | ${product.price}    | ${product.stock_quantity}`);
		});
	});
}