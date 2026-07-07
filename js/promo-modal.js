(function () {
    const popup = document.getElementById("promo-popup");
    if (!popup) return;

    const storageKey = popup.dataset.storageKey || "particlex-promo-popup";
    const oncePerDay = popup.dataset.oncePerDay !== "false";
    const closeButtons = popup.querySelectorAll("[data-promo-close]");
    const dialog = popup.querySelector(".promo-popup__dialog");
    const today = new Date().toISOString().slice(0, 10);
    const dismissedValue = oncePerDay ? today : "dismissed";

    function getDismissed() {
        try {
            return window.localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function setDismissed() {
        try {
            window.localStorage.setItem(storageKey, dismissedValue);
        } catch (error) {
            return;
        }
    }

    function openPopup() {
        if (getDismissed() === dismissedValue) return;
        popup.classList.add("is-visible");
        popup.setAttribute("aria-hidden", "false");
        document.documentElement.classList.add("promo-popup-lock");
        if (dialog) dialog.focus({ preventScroll: true });
    }

    function closePopup() {
        setDismissed();
        popup.classList.remove("is-visible");
        popup.setAttribute("aria-hidden", "true");
        document.documentElement.classList.remove("promo-popup-lock");
    }

    closeButtons.forEach((button) => {
        button.addEventListener("click", closePopup);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup.classList.contains("is-visible")) closePopup();
    });

    window.addEventListener("load", () => {
        window.setTimeout(openPopup, 450);
    });
})();
