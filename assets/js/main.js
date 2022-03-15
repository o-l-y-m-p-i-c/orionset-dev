let list = document.querySelector(".whats-inside__list")
more(list, 6)
function more(listItem, num) {
    let listCount = listItem.childElementCount
    if (listCount > num) {
        list.classList.add("sixAndMore")
        let child = document.createElement("div")
        child.className = "sixAndMoreChild";
        let span = document.createElement("span")
        span.className = "--title"
        span.innerHTML = "read more"
        child.appendChild(span)
        
        list.appendChild(child)
        let div = document.createElement("div")
        div.className="moreSix"
        console.log(listItem.children)
        for (let i = listCount -1; i >= num; i--) {
            div.appendChild(listItem.children[i])
        }
        listItem.appendChild(div)
        
        span.onclick = () => {
            console.log(div)
            div.style.maxHeight = `${div.scrollHeight}px`;
            child.style.transition = ` opacity 0.5s linear`
            child.style.opacity = "0"
            setTimeout(() =>{
                child.remove()
            },500)
        }
    }
}
