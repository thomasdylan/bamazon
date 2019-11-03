const mysql = require('mysql');
const inquirer = require('inquirer');

//MySQL config
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '****', //Changed when posted to repo
    database: 'bamazon'
});

/*
Connecting to database on start.
Runs the menu function.
*/
connection.connect(function (err) {
    if (err) throw err;
    menu();
});

function menu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'Which option would you like?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add Inventory', 'Add New Product', 'Exit']
    }).then(function(answer) {
        switch (answer.menu) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInv();
                break;
            case 'Add Inventory':
                addInv();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                connection.end();
                break;
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: ${res[i].price} | Stock: ${res[i].stock_quantity}\n`);
        };
        menu();
    });
};

function lowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        if(res.length <= 0) {
            console.log("No low stock items.");
            menu();
        } else {
            for (var i = 0; i < res.length; i++) {
                console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Stock: ${res[i].stock_quantity}\n`);
            };
            menu();
        };
    });
};

function addInv() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'item',
            message: 'Enter the ID of the item you wish to restock.'
        }, 
        {
            type: 'number',
            name: 'ammount',
            message: 'How many would you like to add?'
        }
    ]).then(function (answer) {
        if(answer.number < 1 || answer.number === NaN) {
            console.log("Not a valid input");
        } else {
            connection.query(`UPDATE products SET stock_quantity = (stock_quantity + ${answer.ammount}) WHERE item_id = ${answer.item}`, 
            function(err, res){
                if (err) throw err;
                console.log(`Successfully added ${answer.ammount} to ID: ${answer.item}\n${res.affectedRows} item's quantity adjusted`);
            });
            menu();
        };
    });
};

function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What is the products name?'
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the department name for this product?'
        },
        {
            type: 'number',
            name: 'price',
            message: 'What is the products price? (eg. 9.99)'
        },
        {
            type: 'number',
            name: 'stock_quantity',
            message: 'How many of this item are in stock?'
        }
    ]).then(function(answer) {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
                            VALUES ("${answer.product_name}", "${answer.department_name}", ${answer.price}, ${answer.stock_quantity})`,
        function(err, res) {
            if (err) throw err;
            console.log(`Successfully added ${answer.product_name}`);
            menu();
        });
    });
};
