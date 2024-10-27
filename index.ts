#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Variables for user balance and pincode
let myBalance = 10000;
let myPin = 1234;

console.log(chalk.magentaBright.bold("\n \tWelcome to the ATM!\n"));

let pincode = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blueBright("Enter your pin:")
    }
]);

if (pincode.pin === myPin) {
    console.log(chalk.green("\nLogin Successfully!\n"));

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.blueBright("Select an Operation:"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);

    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawalmethod",
                type: "list",
                message: chalk.blueBright("Select one of the following:"),
                choices: ["Fast Cash", "Enter the Amount"],
            }
        ]);

        if (withdrawAns.withdrawalmethod === "Fast Cash") {
            let cashAns = await inquirer.prompt([
                {
                    name: "cash",
                    type: "list",
                    message: chalk.blueBright("Select an Amount:"),
                    choices: ["1000", "2000", "3000", "5000", "10000", "50000"], // Changed to strings
                }
            ]);

            let withdrawalAmount = Number(cashAns.cash); // Convert to number

            if (withdrawalAmount > myBalance) {
                console.log(chalk.red("Insufficient Balance."));
            } else {
                myBalance -= withdrawalAmount;
                console.log(chalk.green(`${withdrawalAmount} Withdrawn Successfully!`));
                console.log(chalk.yellowBright(`Your Remaining Account Balance is ${myBalance}`));
            }
        } else if (withdrawAns.withdrawalmethod === "Enter the Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.blueBright("Enter the amount:"),
                }
            ]);

            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance."));
            } else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Withdrawn Successfully!`)); 
                console.log(chalk.yellowBright(`Your Remaining Account Balance is ${myBalance}`)); 
            }
        }
    } else if (operationAns.operation === "Check Balance") {
        console.log(chalk.yellowBright(`Your Current Account Balance is ${myBalance}`));
    }
} else {
    console.log(chalk.red("Your Pin is Incorrect, Try Again."));
}
