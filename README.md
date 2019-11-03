# bamazon

The bamazon CLI has a basic shopping input for customers,
as well as a view for managers to track, restock and add
items to the inventory.

## How it works

The bamazon application has two available modes.
The first one is the Customer version that allows a
customer to select an item from the available items and
purchase as many as they wish.  This can be done by entering
```node bamazonCustomer.js``` in the terminal.
![customerStart](/images/customerStart.png)
The customer then enters the ID of the item they wish to purchase
followed by the quantity.
![customerBuy](/images/customerBuy.png)
This will give them the total cost for their purchase.
If the customer wishes to buy more items than the store has in stock
they will receive an error and the order will be canceled.
![customerInsufficient](/images/customerInsufficient.png)

## What it uses

* Node.js
* Inquirer
* MySQL

## Author

[Dylan Thomas] (https://github.com/thomasdylan)
