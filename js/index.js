/******************** GLOBAL VARIABLES ********************/
const placeOrderBtn = document.getElementById("begin-order-btn");
const submitOrderBtn = document.getElementById("submit-order-btn");
const modifyOrderBtn = document.getElementById("modify-order-btn");
const calculatedTotal = document.getElementById("calculated-amount");
const finalOrder = document.getElementById("ordered-items");

/* Constructor for food function object */
function Food(name, price){
    this.name = name;
    this.price = price;
}

/* Constructor for order function object */
function Order(){
    this.orderItems = addItemsToOrder;
    this.total = calculateTotal;
}

const hotdogs = new Food("hotdogs", 4);
const fries = new Food("fries", 3.50);
const soda = new Food("soda", 1.50);
const sauerkraut = new Food("sauerkraut", 1);

const menu = [hotdogs, fries, soda, sauerkraut];

/***************** END OF GLOBAL VARIABLES *****************/

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
        orderedItems = newOrder.orderItems();
        total = newOrder.total(orderedItems);

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
/*  Function to calculate final order
    Parameters: 
        order - list of menu items that were ordered
*/
function calculateTotal(order){
    let sum = 0;
    for(item in order){
        // for each item in order - find the corresponding object from the menu
        let menuItem;
        for(let i=0; i<menu.length; i++){
            if(menu[i].name == item){
                menuItem = menu[i];
            }else{
                continue;
            }
        }
        
        let amount = parseFloat(document.getElementById(menuItem.name).value);
        if(!isNaN(amount)){
            // calculate price & add to total
            let price = menuItem.price;
            let subTotal = amount * price;
            sum += subTotal;
        }
    }
    return sum;
}

/*  Function to retrieve items that were orderd & return order list
    Parameters: none
*/
function addItemsToOrder(){
    let orderList = [];
    for(let i=0; i<menu.length; i++){
        let menuItem = menu[i].name;
        let amount = parseFloat(document.getElementById(menuItem).value);

        if(!isNaN(amount)){
            orderList[menuItem] = amount;
        }
    }
    return orderList;
}

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