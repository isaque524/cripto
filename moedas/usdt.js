/* Tether */
let ws_coinbase_usdt = new WebSocket('wss://ws-feed.pro.coinbase.com');
let html_element_coinbase_usdt = document.getElementById('show_price_usdt');

let last_price_coinbase_usdt = null;

ws_coinbase_usdt.onopen = function () {
    ws_coinbase_usdt.send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ["USDT-USD"]}]
    }))
};

ws_coinbase_usdt.onmessage = function (event) {
    let current_price_coinbase_usdt = JSON.parse(event.data);
    let price_coinbase_usdt = parseFloat(current_price_coinbase_usdt.price).toFixed(2);
    html_element_coinbase_usdt.innerText = price_coinbase_usdt;

    if ((price_coinbase_usdt < last_price_coinbase_usdt) && (isNaN(price_coinbase_usdt) == false)) {
        html_element_coinbase_usdt.innerText = '↓' + price_coinbase_usdt;
        html_element_coinbase_usdt.style.color = 'red';
    } else if ((price_coinbase_usdt > last_price_coinbase_usdt) && (isNaN(price_coinbase_usdt) == false)) {
        html_element_coinbase_usdt.innerText = '↑' + price_coinbase_usdt;
        html_element_coinbase_usdt.style.color = 'green';
    } else if ((price_coinbase_usdt == last_price_coinbase_usdt) && (isNaN(price_coinbase_usdt) == false)) {
        html_element_coinbase_usdt.innerText = price_coinbase_usdt;
        html_element_coinbase_usdt.style.color = 'black';
    }

    last_price_coinbase_usdt = price_coinbase_usdt;
    /* fim de Tether */
};