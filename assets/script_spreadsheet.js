document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    const img = document.createElement("img");
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    document.querySelectorAll(".thumbnail").forEach(thumb => {
        thumb.addEventListener("click", e => {
            e.preventDefault();
            img.src = thumb.src;
            img.classList.remove("zoomed");
            img.style.transformOrigin = "center center"; // reset to center
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    img.addEventListener("click", e => {
        e.stopPropagation();

        if (!img.classList.contains("zoomed")) {
            // Calculate cursor position for smooth zoom
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.classList.add("zoomed");
        } else {
            // Smooth unzoom: set transform-origin to center first, then remove zoomed
            img.style.transformOrigin = "center center";
            // Force reflow to ensure the transition picks up the new origin
            img.getBoundingClientRect();
            img.classList.remove("zoomed");
        }
    });

    // Update transform-origin while moving mouse during zoom
    img.addEventListener("mousemove", e => {
        if (img.classList.contains("zoomed")) {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
        }
    });

	// Close on Esc key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
});
