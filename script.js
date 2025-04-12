document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shortenForm");
    const copyNotification = document.getElementById("copy-notification");
    const recentUrlContainer = document.getElementById("recentUrlContainer");
    const historyList = document.getElementById("historyList");
    const historyDiv = document.getElementById("history");
    const originalUrlInput = document.getElementById("originalUrl"); // AÑADIDO

    let history = [];

    const showNotification = (message, type = "success") => {
        copyNotification.textContent = message;
        copyNotification.classList.remove("error");
        if (type === "error") {
            copyNotification.classList.add("error");
        }
        copyNotification.classList.add("show");
        setTimeout(() => copyNotification.classList.remove("show"), 2000);
    };

    // Función global para copiar al portapapeles
    window.copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => showNotification("¡Enlace copiado!"))
            .catch(() => showNotification("Error al copiar", "error"));
    };

    const renderRecentUrl = (url) => {
        recentUrlContainer.innerHTML = `
            <h3>Enlace reciente:</h3>
            <a href="${url}" target="_blank">${url}</a>
            <button class="copy-button" onclick="copyToClipboard('${url}')">📋 Copiar</button>
        `;
    };

    const renderHistory = () => {
        if (history.length > 0) {
            historyDiv.classList.remove("hidden");
            historyList.innerHTML = history.slice(0, 5).map(url => `
                <li>
                    <a href="${url}" target="_blank">${url}</a>
                    <button class="copy-button" onclick="copyToClipboard('${url}')">📋</button>
                </li>
            `).join("");
        } else {
            historyDiv.classList.add("hidden");
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const originalUrl = form.originalUrl.value;

        grecaptcha.ready(() => {
            grecaptcha.execute('6LdhAL0qAAAAAGuwyxS2aqXeC6ntpbPBOwONl4QU', { action: "submit" })
                .then(token => {
                    fetch("shorten.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({ originalUrl, recaptcha_token: token })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            const shortUrl = data.shortUrl;
                            renderRecentUrl(shortUrl);
                            history.unshift(shortUrl);
                            renderHistory();
                            originalUrlInput.value = ""; // AÑADIDO: Limpiar el input
                        } else {
                            showNotification("Error al acortar el enlace", "error");
                        }
                    });
                });
        });
    });

    renderHistory();
});