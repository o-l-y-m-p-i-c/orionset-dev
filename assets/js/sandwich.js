let sandwich = document.querySelector(".sandwich")
let navigation = document.querySelector(".header__nav-wrap")
let navigationOuter = document.querySelector(".header__nav-inner")
sandwich.onclick = () => {
    
    navigation.classList.toggle("active");
}
navigationOuter.onclick = (e) => {
    if (e.target == navigationOuter) {
        navigation.classList.toggle("active");
    }
}
