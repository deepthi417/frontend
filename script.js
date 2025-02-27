async function processText(endpoint) {
    const inputText = document.getElementById("inputText").value;
    const tone = document.getElementById("tone").value;
    const style = document.getElementById("style").value;
    const audience = document.getElementById("audience").value;
    const outputText = document.getElementById("outputText");

    if (!inputText.trim()) {
        alert("Please enter some text!");
        return;
    }

    outputText.value = "Processing...";

    try {
        const response = await fetch(`https://writewise-backend.onrender.com/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: inputText,
                tone: tone,
                style: style,
                audience: audience
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        outputText.value = data[Object.keys(data)[0]];
    } catch (error) {
        console.error("Error:", error);
        outputText.value = "Error processing text. Please try again.";
    }
}

