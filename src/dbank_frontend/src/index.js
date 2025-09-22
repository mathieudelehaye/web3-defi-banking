import { dbank_backend as dbank } from "../../declarations/dbank_backend"

window.addEventListener("load", function() {
    // console.log("Finished loading");
    const currentAmount = dbank.checkBalance();
    document.getElementById("value").innerText = currentAmount;
});