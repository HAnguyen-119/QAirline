export function next() {
    const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
    const suggestionContainer = document.querySelector(".suggestionContainer");
    const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
    suggestionContainer.style.transform = `translateX(${-2 * (suggestionWidth + gap)}px)`;
    suggestionContainer.style.transition = "transform 0.5s ease";
    setTimeout(() => {
        const first = suggestionContainer.firstChild;
        suggestionContainer.removeChild(first);
        suggestionContainer.appendChild(first);
        suggestionContainer.style.transform = `translateX(${- suggestionWidth - gap}px)`;
        suggestionContainer.style.transition = "none";
    }, 500);
}

export function prev() {
    const suggestionWidth = document.querySelector(".suggestion").offsetWidth;
    const suggestionContainer = document.querySelector(".suggestionContainer");
    const gap = parseFloat(getComputedStyle(suggestionContainer).gap)
    suggestionContainer.style.transform = `translateX(0)`;
    suggestionContainer.style.transition = "transform 0.5s ease";
    setTimeout(() => {
        const last = suggestionContainer.lastChild;
        suggestionContainer.removeChild(last);
        suggestionContainer.insertBefore(last, suggestionContainer.firstChild);
        suggestionContainer.style.transform = `translateX(${- suggestionWidth - gap}px)`;
        suggestionContainer.style.transition = "none";
    }, 500);
}