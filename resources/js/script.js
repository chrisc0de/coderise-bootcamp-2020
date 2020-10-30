/*
==================================
=  Powered by: @chrisc0de        =
=  For: Coderise Bootcamp        =
==================================
=  Shopping cart code reference: =
=  Navis Code                    =
==================================
*/

// Selection buttons
const addShoppingButtons = document.querySelectorAll('.--js-addToCart');
addShoppingButtons.forEach(addToCartButtton => {
    addToCartButtton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer');

function addToCartClicked(event) {
    // Capturamos el target del event
    const button = event.target;
    const item = button.closest('.--js-item')

    const itemTitle = item.querySelector('.--js-item-title').textContent;
    const itemPrice = item.querySelector('.--js-item-price').textContent;
    const itemImage = item.querySelector('.--js-item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.
                querySelector(
                    '.shoppingCartItemQuantity'
                );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return; // Termina de ejecutar para evitar duplicar el item
        }
    }
    // Creamos el elemento para añadir al carrito
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}
                </h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);


    updateShoppingCartTotal()
}

// Actualizamos el total de compra
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem => {
        // Seleccionar elemento
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );

        // Seleccionar valor del elemento
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );

        // Seleccionar cantidad
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );

        // Operamos
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$${total.toFixed(0)}`;
}

// Llega un event del EventListener para remover
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    // Actualizamos el total
    updateShoppingCartTotal();
}

// Cantidad
function quantityChanged(event) {
    const input = event.target;
    // if (input.value <= 0){
    //    input.value = 1;
    // }
    input.value <= 0 ? (input.value = 1) : null; // Ternario
    updateShoppingCartTotal();
}

// Botòn comprar
function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = ''; // Limpiamos el carrito
    updateShoppingCartTotal();
}
















