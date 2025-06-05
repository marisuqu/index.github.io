document.addEventListener('DOMContentLoaded', function() {
    const ticketList = document.getElementById('ticket-list');
    const ticketTotalSpan = document.getElementById('ticket-total');
    const printButton = document.getElementById('print-button');
    const returnButton = document.getElementById('return-button');

    const cartData = JSON.parse(localStorage.getItem('shoppingCart'));

    if (!cartData || cartData.length === 0) {
        ticketList.innerHTML = '<li>No hay productos en el ticket.</li>';
        printButton.disabled = true;
    } else {
        let total = 0;
        cartData.forEach(item => {
            const listItem = document.createElement('li');
            const itemName = document.createElement('span');
            const itemPrice = document.createElement('span');

            itemName.textContent = item.nombre;
            itemPrice.textContent = `$${item.precio}`;
            
            listItem.appendChild(itemName);
            listItem.appendChild(itemPrice);
            ticketList.appendChild(listItem);

            total += item.precio;
        });
        ticketTotalSpan.textContent = total;
    }

    printButton.addEventListener('click', function() {
        window.print();
    });

    returnButton.addEventListener('click', function() {
        localStorage.removeItem('shoppingCart');
        alert("Gracias por tu visita. El carrito ha sido vaciado.");
        window.location.href = 'index.html';
    });
});