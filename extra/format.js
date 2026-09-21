const numberInput = document.getElementById("cardNumber");
const cvcInput = document.getElementById("cardCvc");
const expiryInput = document.getElementById("cardExpiry");

// Card number: 1234 5678 9012 3456
numberInput.addEventListener("input", () => {
    let value = numberInput.value.replace(/\D/g, "");

    value = value.match(/.{1,4}/g)?.join(" ") || "";

    numberInput.value = value;
});

// CVC: numbers only
cvcInput.addEventListener("input", () => {
    cvcInput.value = cvcInput.value
        .replace(/\D/g, "")
        .slice(0, 3);
});

// Expiry: MM/YY
expiryInput.addEventListener("input", () => {
    let value = expiryInput.value.replace(/\D/g, "").slice(0, 4);

    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }

    expiryInput.value = value;
});