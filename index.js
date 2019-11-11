const fs = require('fs');
const dh = require('./distanceHelper.js')
const distanceHelper = new dh(); //Helper to handle all distance related functionality
const intercom = {
    latitude: 53.339428,
    longitude: -6.257664
}
/*
* Core functionality, takes a path to the file of customers and max distance and prints a list of all customers that are in the range
 */
function getCustomersInRange (path, maxDistance) {
    let customersInRange = {};
    const customers = getCustomersFromFile(path);
    for (let customer in customers) {
        if(customerIsInRange(customers[customer], maxDistance)) {
            customersInRange[customer] = customers[customer];
        }
    }
   try {
        fs.writeFileSync('./output.txt', JSON.stringify(customersInRange));
   } catch (e){
        throw e;
   }
}

/*
* Uses the Distance helper to determine if the customer is in the range. If the customer does not have valid coordinates, it will be skipped.
* For the purpose of this exercise I also print this information
 */
function customerIsInRange (customer, range) {
    let hasValidCoords = distanceHelper.hasValidCoords(customer)
    if (hasValidCoords === true) {
        if(distanceHelper.getDistance(customer, intercom) <= 100) {
          return true;
        } else {
            return false;
        }
    } else {
        console.log("Customer " + customer.name + " will be skipped because: " + hasValidCoords);
    }
}

/*
* Reads the input file and returns a formatted JSON object.
 */
function getCustomersFromFile(path){
    try {
         let customers = {};
         let rawInput = fs.readFileSync(path, 'utf8').toString().split('\n');
         for (let input in rawInput) {
             let customer = JSON.parse(rawInput[input]);
             if (customer.user_id) {
                 customers[customer.user_id] = customer;
             }
        }
         return customers;
    } catch (e) {
        throw e;
    }
}

getCustomersInRange( "./customers.txt", 100 );
