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

	// Create git ignore file for node modules
});