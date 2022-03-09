/******************* CLASS DECLARATIONS *******************/
class Food {
    #name; #price;
    constructor(name, price) {
        this.#name = name;
        this.#price = price;
    }

    getName(){
        return this.#name;
    }

    getPrice(){
        return this.#price;
    }
}

class Order {
    #orderedItems; #total;
    constructor() {
        this.#orderedItems = [];
        this.#total = 0;
    }

    addItemsToOrder(){
        for(let i=0; i<menu.length; i++){
            let menuItem = menu[i].getName();
            let amount = parseFloat(document.getElementById(menuItem).value);
    
            if(!isNaN(amount)){
                this.#orderedItems[menuItem] = amount;
            }
        }
    }

    calculateTotal(){
        Object.keys(this.#orderedItems).forEach((item)=>{
            // for each item in order - find the corresponding object from the menu
            let menuItem;
            for(let i=0; i<menu.length; i++){
                if(menu[i].getName() == item){
                    menuItem = menu[i];
                }else{
                    continue;
                }
            }

            let amount = parseFloat(document.getElementById(menuItem.getName()).value);
            if(!isNaN(amount)){
                // calculate price & add to total
                let price = menuItem.getPrice();
                let subTotal = amount * price;
                this.#total += subTotal;
            }
        });
    }

    getTotal(){
        return this.#total;
    }

    getOrderedItems(){
        return this.#orderedItems;
    }
}

/******************** GLOBAL VARIABLES ********************/
const placeOrderBtn = document.getElementById("begin-order-btn");
const submitOrderBtn = document.getElementById("submit-order-btn");
const modifyOrderBtn = document.getElementById("modify-order-btn");
const calculatedTotal = document.getElementById("calculated-amount");
const finalOrder = document.getElementById("ordered-items");

const hotdogs = new Food("hotdogs", 4);
const fries = new Food("fries", 3.50);
const soda = new Food("soda", 1.50);
const sauerkraut = new Food("sauerkraut", 1);

const menu = [hotdogs, fries, soda, sauerkraut];
/**************** END OF GLOBAL VARIABLES ****************/

window.onload = () => {
    var orderedItems = [];    
    var total = 0;

    placeOrderBtn.addEventListener("click", () =>{
        // hide welcome page content
       updateElementStyle("welcome-page", "none");

        // show order page content
        updateElementStyle("order-content", "block");
    });

    submitOrderBtn.addEventListener("click", ()=>{

        var newOrder = new Order();
        newOrder.addItemsToOrder();
        newOrder.calculateTotal();

        orderedItems = newOrder.getOrderedItems();
        total = newOrder.getTotal();

        displayReceipt(orderedItems, total);
    });

    modifyOrderBtn.addEventListener("click", ()=>{
        // clearing total, order, and final order array
        total = 0;
        orderedItems = [];
        finalOrder.innerHTML = "";

        // hide welcome page content        
        updateElementStyle("welcome-page", "none");
      
        // show order page content
        updateElementStyle("order-content", "block")

        // hide reciept
        updateElementStyle("receipt", "none");
    });
}


/********************* UTILITY METHODS *********************/
/*  Function to display receipt
    Parameters: 
        order - items that are ordered, 
        total - total calculated amount for order
*/   
function displayReceipt(order, total){
    // hide order form
    updateElementStyle("order-content", "none");
    
    // display receipt
    updateElementStyle("receipt", "inline");

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    calculatedTotal.innerHTML = dollarUS.format(total);

    for(item in order){
        let foodDiv = document.createElement("div");
        foodDiv.innerHTML = item + " x " + order[item];
        finalOrder.appendChild(foodDiv);
    }
}

/*  Function to show/hide specific page based on element ID
    Parameters: 
        elementID - corresponds to html element id
        styleType - corresponds to css display type
    */
function updateElementStyle(elementID, styleType){
    let elementDiv = document.getElementById(elementID);
    elementDiv.style.display = styleType;
}