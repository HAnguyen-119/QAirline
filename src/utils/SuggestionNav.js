export function next() {
    const suggestionWidth = document.querySelector(".suggestionContainer > div").offsetWidth;
    const suggestionContainer = document.querySelector(".suggestionContainer");
    suggestionContainer.style.transform = `translateX(${-2 * (suggestionWidth)}px)`;
    suggestionContainer.style.transition = "transform 0.5s ease";
    setTimeout(() => {
        const first = suggestionContainer.firstChild;
        suggestionContainer.removeChild(first);
        suggestionContainer.appendChild(first);
        suggestionContainer.style.transform = `translateX(${- suggestionWidth}px)`;
        suggestionContainer.style.transition = "none";
    }, 500);
}

export function prev() {
    const suggestionWidth = document.querySelector(".suggestionContainer > div").offsetWidth;
    const suggestionContainer = document.querySelector(".suggestionContainer");
    suggestionContainer.style.transform = `translateX(0)`;
    suggestionContainer.style.transition = "transform 0.5s ease";
    setTimeout(() => {
        const last = suggestionContainer.lastChild;
        suggestionContainer.removeChild(last);
        suggestionContainer.insertBefore(last, suggestionContainer.firstChild);
        suggestionContainer.style.transform = `translateX(${- suggestionWidth}px)`;
        suggestionContainer.style.transition = "none";
    }, 500);
}


