export async function checkVerification(cardNumber) {
    console.log("Checking verification for card number:", cardNumber);
    try {
        const response = await fetch(
            `https://onlinechecker.io/api/v1/card/check/?card=${encodeURIComponent(cardNumber)}`
        );

        if (!response.ok) {
            return false;
        }

        const data = await response.text();

        console.log("OnlineChecker response:", data);

        const lines = data
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);

        const validIndex = lines.findIndex(
            line => line.toUpperCase() === "VALID"
        );

        if (validIndex === -1) {
            return false;
        }
        console.log(data);

        const validValue = lines[validIndex + 1]?.toUpperCase();

        return validValue === "YES";

    } catch (error) {
        console.error("Verification error:", error);
        return false;
    }
}