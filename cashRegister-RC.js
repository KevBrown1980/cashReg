/* Defining an object for the possible till statuses */
const REGISTER_STATUS = {incorrectPayment: 'INCORRECT_PAYMENT', closed: 'CLOSED', insufficientFunds: 'INSUFFICIENT_FUNDS', open: 'OPEN'};

function cashRegister (price, cash, cid) {
    let cashRegister = { status: '', change: cid};
    const changeNeeded = parseFloat(cash-price).toFixed(2); //limiting the value to 2 decimals to avoid JS errors
    const changeAvailable = getTotalCashRegisterChange(cid);
    
    cashRegister.status = getTotalCashRegisterStatus(changeNeeded, changeAvailable);

    // when there's no sufficient money in the change array
    if(cashRegister.status === REGISTER_STATUS.insufficientFunds){
        cashRegister.change = [];

        return cashRegister;
    }

    cashRegister.change = getCustomersChange(changeNeeded, cid);

    if (changeNeeded > getTotalCashRegisterChange(cashRegister.change)){
        cashRegister.status = REGISTER_STATUS.insufficientFunds;
        cashRegister.change = [];
    }

    if(cashRegister.status === REGISTER_STATUS.closed) {
        cashRegister.change = [...cid]
    }

    return cashRegister;
}

function getCustomersChange(changeNeeded, changeInDrawer) {
    const change = [];

    // Creating a dictionary so JS understands what each currency represent in value
    const currencyDictionary = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };

    //returning from largest value to smallest value
    for (let i = changeInDrawer.length - 1; i >= 0; i--) {

        //defining what we are dealing with (penny, nickel, etc)
        const coinName = changeInDrawer[i][0];

        //total of that particular currency
        const coinTotal = changeInDrawer[i][1];

        //this is what the dictionary above will help with, JS can understand a PENNY is 0.01 and so forth
        const coinValue = currencyDictionary[coinName];

        //how much do we have for that currency
        let coinAmount = (coinTotal / coinValue).toFixed(2);

        // initilised at zero, it will tell us how much of the currency is to be returned from each
        let coinsToReturn = 0;

        /* for each iteration of the for-loop we will have a while-loop
            it evidences that while the changeNeeded is greater or equal
            to the coinValue we are currently on (we have a dolar in change
            needed but it is a five dolar bill we are going to skip over, it
            is not going to hit the while loop because it is too great. but
            if we have a quarter, and while we still have a quarter, go ahead and do that) */
        while(changeNeeded >= coinValue && coinAmount > 0){
            changeNeeded -= coinValue;
            changeNeeded = changeNeeded.toFixed(2);
            coinAmount--;
            coinsToReturn++;
        }

        //only returning values for currencies that are different from zero
        if(coinsToReturn > 0) {
            change.push([coinName, coinsToReturn * coinValue]);
        }
    }
    return change.reverse();
}

function getTotalCashRegisterStatus(changeNeeded, changeAvailable) {
    if(Number(changeNeeded) < 0){
        return REGISTER_STATUS.incorrectPayment;
    }
    
    if(Number(changeNeeded) > Number(changeAvailable)){
        return REGISTER_STATUS.insufficientFunds;
    }

    if(Number(changeNeeded) < Number(changeAvailable)){
        return REGISTER_STATUS.open;
    }

    return REGISTER_STATUS.closed
}

function getTotalCashRegisterChange (changeInDrawer) {
    let total = 0;

    for (let change of changeInDrawer) {
        let changeValue = change[1];
        total += changeValue;
    }

    return total.toFixed(2)
}

//case 1:
console.log(cashRegister(19.5, 18, [
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

//case 4a
console.log(cashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]))
