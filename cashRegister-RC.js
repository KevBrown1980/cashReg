/*
price: purchase price
cash: payment
cid: cash in drawer (it is a 2D array listing the available currency)

The cashRegister function should always return an object with a status key and a change key.

 1 - Return {status: "INCORRECT_PAYMENT", change: []} if cash is less than the price.

 2 - Return {status: "INSUFFICIENT_FUNDS", change: []} if cid (cash-in-drawer) is less 
     than the change due or if you cannot return the exact change.

 3 - Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the 
     key change if it is equal to the change due. Include each currency unit in the 
     drawer, even if its value is zero. (i.e. DO display ["NICKEL", 0])

 4 - Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and 
     bills, as the value of the change key. Only include the value of a currency unit if 
     its value is not zero. (i.e. do NOT display ["NICKEL", 0])
 
*/

/* Example: change due is less than the total cid, and exact change can be made */
cashRegister(19.5, 20, [["PENNY", 1.01],["NICKEL", 2.05],["DIME", 3.1],["QUARTER", 4.25],["ONE", 90],["FIVE", 55],["TEN", 20],["TWENTY", 60],["ONE HUNDRED", 100]])

/* Defining an object for the possible till statuses */
const tillStatus = {closed: 'CLOSED', insufficientFunds: 'INSUFFICIENT_FUNDS', open: 'OPEN'}

function cashRegister (price, cash, cid) {
    
    let cashRegister = {status: '', change: cid}

    const changeToCustomer = (cash-price).toFixed(2) //limiting the value to 2 decimals to avoid JS errors

    const changeInTill = totalCashRegisterChange(cid)

    cashRegister.status = retrieveAllCashRegisterStatus(changeToCustomer,changeInTill)

    // when there's no sufficient money in the change array
    if (cashRegister.status === tillStatus.insufficientFunds) {
    
        cashRegister.change = []
    
        return cashRegister
    }

    if (changeToCustomer > totalCashRegisterChange(cashRegister.change)) {
        cashRegister.status = tillStatus.insufficientFunds
        cashRegister.change = []
    }

    cashRegister.change = returnCustomersChange (changeToCustomer, changeInDrawer)

}

function totalCashRegisterChange (changeInDrawer) {
    let total = 0

    for (change of changeInDrawer){
        let changeValue = change[1]
        total += changeValue
    }
    return total.toFixed(2)
}

function retrieveAllCashRegisterStatus (changeToCustomer, changeInTill) {

    if (changeToCustomer > changeInTill) {
        return tillStatus.insufficientFunds
    }

    if (changeToCustomer < changeInTill) {
        return tillStatus.open
    }

    return tillStatus.closed
}

function returnCustomersChange (changeToCustomer, changeInDrawer) {
    const change = []

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
    }

    for (i = changeInDrawer.length -1; i >= 0 ; i--) {
        const coinName = changeInDrawer[i][0]
        
        const coinTotal = changeInDrawer[i][1]
        
        const coinValue = currencyDictionary[coinName]
        
        let coinAmount = (coinTotal / coinValue).toFixed(2)
        
        let coinsToReturn = 0 
        // initilised at zero, it will tell us how many coins are to be returned from each

        while (changeToCustomer >= coinValue && coinAmount >0) {
            changeToCustomer -= coinValue
            changeToCustomer = changeToCustomer.toFixed(2)
            coinAmount--
            coinsToReturn++
        }

        if (coinsToReturn > 0) {
            change.push([coinName, coinsToReturn * coinValue])
        }

    }

    return change
}