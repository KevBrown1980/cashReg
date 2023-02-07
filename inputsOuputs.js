// function to get the inputs and send them to the cashRegister function
// this is call from the html button - onclick
// this calls the cashregister function providing a total price, cash given and whats in the till 

function getInputs() {
    // get total price
    let price = document.getElementById("price").value;
    console.log(price)
    //get case paid
    let cash = document.getElementById("cash").value;
    console.log(cash)
    // get whats in the till
    cid = [];
    let pennyValue = document.getElementById("pennyvalue").value;
    
    let penny = ["PENNY", pennyValue];
    cid.push(penny);

    let nickelvalue = document.getElementById("nickelvalue").value;
    
    let nickel = ["NICKEL", nickelvalue];
    cid.push(nickel);

    let dimevalue = document.getElementById("dimevalue").value;
    
    let dime = ["DIME", dimevalue];
    cid.push(nickel);

    let quartervalue = document.getElementById("quartervalue").value;
    
    let quarter = ["QUARTER", quartervalue];
    cid.push(quarter);

    let dollarvalue = document.getElementById("dollarvalue").value;
    
    let dollar = ["ONE", dollarvalue];
    cid.push(dollar);

    let fivedollarvalue = document.getElementById("fivedollarsvalue").value;
    
    let fivedollar = ["FIVE", fivedollarvalue];
    cid.push(fivedollar);

    let tendollarvalue = document.getElementById("tendollarsvalue").value;
    
    let tendollar = ["TEN", tendollarvalue];
    cid.push(tendollar);

    let twentydollarvalue = document.getElementById("twentydollarsvalue").value;
    
    let twentydollar = ["TWENTY", twentydollarvalue];
    cid.push(twentydollar);

    let onehundreddollarsvalue = document.getElementById("onehundreddollarsvalue").value;
    
    let onehundreddollar = ["ONE HUNDRED", onehundreddollarsvalue];
    cid.push(onehundreddollar);

    //calling the cashRegister function
    cashRegister(price, cash, cid)


}

// function recieves inputs from cashRegister function and displays the outputs on HTML
// cashRegister function needs to call this function and send an object

function displayOuput(obj){
    
    
    document.getElementById("status").innerHTML = obj.status;
    document.getElementById("change").innerHTML = obj.change;

}



















// let button = document.querySelector("button");

// button.addEventListener("click", () => {
// let container = document.querySelector("ul");
// let element = document.createElement("li");
// let textNode = document.createTextNode("im adding Li to UL");
// element.appendChild(textNode);
// container.appendChild(element)


// });
