/* Ethereum */
let ws_coinbase_esth = new WebSocket('wss://ws-feed.pro.coinbase.com');
let html_element_coinbase_esth = document.getElementById('show_price_esth');

let last_price_coinbase_esth = null;

ws_coinbase_esth.onopen = function () {
    ws_coinbase_esth.send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ['ETH-USD']}]
    }))
};

ws_coinbase_esth.onmessage = function (event) {
    let current_price_coinbase_esth = JSON.parse(event.data);
    let price_coinbase_esth = parseFloat(current_price_coinbase_esth.price).toFixed(2);
    html_element_coinbase_esth.innerText = price_coinbase_esth;

    if ((price_coinbase_esth < last_price_coinbase_esth) && (isNaN(price_coinbase_esth) == false)) {
        html_element_coinbase_esth.innerText = '↓' + price_coinbase_esth;
        html_element_coinbase_esth.style.color = 'red';
    } else if ((price_coinbase_esth > last_price_coinbase_esth) && (isNaN(price_coinbase_esth) == false)) {
        html_element_coinbase_esth.innerText = '↑' + price_coinbase_esth;
        html_element_coinbase_esth.style.color = 'green';
    } else if ((price_coinbase_esth == last_price_coinbase_esth) && (isNaN(price_coinbase_esth) == false)) {
        html_element_coinbase_esth.innerText = price_coinbase_esth;
        html_element_coinbase_esth.style.color = 'black';
    }

    last_price_coinbase_esth = price_coinbase_esth;
    /* fim de Ethereum */
};