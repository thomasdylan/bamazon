# bamazon

The bamazon CLI has a basic shopping input for customers,
as well as a view for managers to track, restock and add
items to the inventory.

## How it works

The bamazon application has two available modes.  

The first one is the Customer version that allows a
customer to select an item from the available items and
purchase as many as they wish.    
This can be done by entering ```node bamazonCustomer.js``` in the terminal.  
![customerStart](/images/customerStart.png)  
The customer then enters the ID of the item they wish to purchase
followed by the quantity.  
![customerBuy](/images/customerBuy.png)  
This will give them the total cost for their purchase.
If the customer wishes to buy more items than the store has in stock
they will receive an error and the order will be cancelled.    
![customerInsufficient](/images/customerInsufficient.png)  
  
The second mode is the Manager view.  The manager view is ran by entering
```node bamazonManager.js``` in the terminal.  
This will pull up the managers options.  
![managerStart](/images/managerStart.png)  
From here the user will use the arrow keys to select the command they want.  
By selecting **View Products for Sale** a list of available products will show 
along with the products information.  
![managerProduct](/images/managerProduct.png)  
If the manager wishes to view only products that have only five or less items in stock 
they can do this by selecting **View Low Inventory**  
![managerLow](/images/managerLow.png)  
For adding inventory the user can select **Add Inventory** and they will be prompted to 
enter the item they wish to restock as well as the ammount they wish to add.  
![managerRestock](/images/managerRestock.png)  
The option to add new products to sale is available by selecting **Add New Product** where
the user will be asked to enter the information for the product they wish to add.  
![managerAdd](/images/managerAdd.png)  
After any option is selected and completed the menu will be brought back up.  When finished
select **Exit** and the application will close.

## What it uses

* Node.js
* Inquirer
* MySQL

## Author

[Dylan Thomas] (https://github.com/thomasdylan)
