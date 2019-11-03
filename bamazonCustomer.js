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
Shows all items in database and the price.
Runs the purchasePrompt function.
*/
connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        for(var i = 0; i < res.length; i++){
            console.log(`ID: ${res[i].item_id} | Product: ${res[i].product_name} | Price: ${res[i].price} \n`);
        };
        purchasePrompt();
    });
});

/*
Prompts the user using inqirer for which item they want and the quantity.
Sets the answers to variables and passes them into the purchase function.
*/
function purchasePrompt() {
    inquirer.prompt([{
        type: 'number',
        name: 'item_id',
        message: 'What is the id of the item you wish to buy?'
    },
    {
        type: 'number',
        name: 'quantity',
        message: 'How many of the item do you wish to buy?'
    }]).then(function(answer) {
        const id = answer.item_id;
        const quantity = answer.quantity;
        if(quantity <= 0 || id === NaN) {
            console.log("Invalid selection or quantity"); 
            connection.end();           
        } 
        else validatePurchase(id, quantity);
    });
};

//Checks to ensure there is enough quantity for the order.  If not it logs so and ends the connection.
function validatePurchase(item, ammount) {
    connection.query(`SELECT product_name, price, stock_quantity FROM products WHERE item_id = ${item} AND stock_quantity >= ${ammount}`, function(err, res) {
        if (err) throw err;
        if(res.length === 0) {
            console.log("Insufficient quantity");
            connection.end();
        } else {
        transaction(item, ammount);
        updateInventory(item, ammount); 
        connection.end();
        }
    });
}

//Processes the transaction showing the total.
function transaction(item, ammount) {
    connection.query(`SELECT product_name, price FROM products WHERE item_id = ${item}`,function(err, res) {
        if (err) throw err;
        const product = res[0].product_name;
        const total = res[0].price * ammount;
        console.log(`Your total for ${ammount} ${product}('s) is ${total}`);
    });
};

//Updates the value of stock in the database.
function updateInventory(item, ammount) {
    connection.query(`UPDATE products SET stock_quantity = (stock_quantity - ${ammount}) WHERE item_id = ${item}`,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item's quantity adjusted.");
        }
    );
};

