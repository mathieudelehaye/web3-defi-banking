import { dbank_backend as dbank } from "../../declarations/dbank_backend"
import { showOnboardingModal } from "./onboarding"

async function update() {
    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount*100)/100;

    // Load current interest configuration
    const config = await dbank.getInterestConfig();
    const ratePercent = (config.rate - 1.0)*100; // Convert 1.01 to 1.0%
    document.getElementById("interest-rate").value = Math.round(ratePercent * 100) / 100;
    document.getElementById("periodicity").value = config.periodSec.toString();
} 

window.addEventListener("load", async function() {
    // console.log("Finished loading");
    update();

    // Check if it's the user's first visit
    if (!localStorage.getItem('dbank_onboarded')) {
        showOnboardingModal();
    }
});

document.querySelector("form").addEventListener("submit", async function(event) {
    // console.log("Submitted");
    event.preventDefault(); // prevent form submission

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    const interestRatePercent = parseFloat(document.getElementById("interest-rate").value);
    const periodicity = parseInt(document.getElementById("periodicity").value);

    button.setAttribute("disabled", true);

    // Update interest configuration
    const interestRateMultiplier = 1.0 + (interestRatePercent / 100); // Convert 1.0% to 1.01
    await dbank.setInterestConfig(interestRateMultiplier, periodicity);

    if (document.getElementById("input-amount").value.length != 0) {
        await dbank.topUp(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
        await dbank.withdraw(withdrawalAmount);
    }

    const compoundResult = await dbank.compound();

    if (compoundResult && compoundResult.includes("reset")) {
        alert(compoundResult);
    }

    update();

    document.getElementById("input-amount").value='';
    document.getElementById("withdrawal-amount").value='';

    button.removeAttribute("disabled");
});