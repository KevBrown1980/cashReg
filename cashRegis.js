function cashRegister(totalPrice, cashPaid, cashInDrawer) {

    // create an object to be returned
    let returnedObject = {};
    
    // create the var change and calc
    let change = cashPaid - totalPrice;
    console.log("change..." + change)

    // calc the total cash in the drawer
    let totalCashInDrawer = 0;
    for (let i = 0; i < cashInDrawer.length; i++) {
     
        totalCashInDrawer = totalCashInDrawer + cashInDrawer[i][1]
        totalCashInDrawer = (Math.round(totalCashInDrawer * 100) / 100);
        console.log("total cash in drawer..." + totalCashInDrawer);
    }
    

    //logic  for output

    // cash paid is less than total price - i.e not paid enough
    if (cashPaid < totalPrice) {
        returnedObject.status = "INCORRECT_PAYMENT";
        returnedObject.change = []
        console.log(returnedObject)
        return returnedObject;
    }
    // if the change is greater than totalCashInDrawer - ie we cant give them enough change
    else if (totalCashInDrawer < change){
        returnedObject.status = "INSUFFICIENT_FUNDS";
        returnedObject.change = []
        console.log(returnedObject)
        return returnedObject;
    }

    // if totalCashInDrawer = change .ie - no money lft in till and we close the till
    else if (totalCashInDrawer === change){
        returnedObject.status = "CLOSED";
        for (let i = 0; i < cashInDrawer.length; i++) {
            cashInDrawer[i][1] = 0;
            
        }
        returnedObject.change = cashInDrawer
        console.log(returnedObject)
        return returnedObject;
    }
    // everything else i.e we have enough change, they have paid enough and we still have funds in the till to stay open
    else {
        returnedObject.status = "OPEN";
        returnedObject.change = change
        console.log(returnedObject)
        return returnedObject;

    }
}

// EXAMPLE INVOCATION, so you can `console.log` the outputs
console.log(cashRegister(18, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));