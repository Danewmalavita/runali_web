document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href.endsWith(".html")) {
            e.preventDefault();
            fetch(href)
                .then((res) => res.text())
                .then((html) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newMain = doc.querySelector("main");
                    document.querySelector("main").replaceWith(newMain);
                    history.pushState(null, "", href);

                    // 🔁 Reiniciar scripts necesarios
                    if (typeof initSlider === "function") initSlider();
                });
        }
    });
});

function loadPage(href, addToHistory = true) {
    fetch(href)
        .then((res) => res.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newMain = doc.querySelector("main");
            if (newMain) {
                document.querySelector("main").replaceWith(newMain);
                if (addToHistory) {
                    history.pushState({ href }, "", href);
                }

                // 🔁 Reiniciar scripts necesarios
                if (typeof initSlider === "function") initSlider();
            }
        });
}
