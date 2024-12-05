//From my previous workshop
function loadAndPopulateCard() {
    const urlParams = new URLSearchParams(location.search)
    console.log(urlParams.get('productId'))
    let productId = urlParams.get('productId')
    document.addEventListener('DOMContentLoaded',
    fetch(`http://localhost:8081/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        console.log(product)
        showCard(product)
    }))
}
loadAndPopulateCard()

function showCard(product) {
    let main = document.querySelector('main')

    let cardContainer = document.createElement('div')
    cardContainer.style.width = '18rem'
    cardContainer.className = 'card'
    main.append(cardContainer)

    
    let ui = document.createElement('ui')
    ui.className = 'list-group list-group-flush'
    cardContainer.append(ui)

    for (key in product) {
        let li = document.createElement('li')
        li.className = 'list-group-item'
        li.textContent = `${key}: ${product[key]}`
        ui.append(li)
    }
}