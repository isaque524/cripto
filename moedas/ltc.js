/* Litecoin */
let ws_coinbase_ltc = new WebSocket('wss://ws-feed.pro.coinbase.com');
let html_element_coinbase_ltc = document.getElementById('show_price_ltc');

let last_price_coinbase_ltc = null;

ws_coinbase_ltc.onopen = function () {
    ws_coinbase_ltc.send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ['LTC-USD']}]
    }))
};

ws_coinbase_ltc.onmessage = function (event) {
    let current_price_coinbase_ltc = JSON.parse(event.data);
    let price_coinbase_ltc = parseFloat(current_price_coinbase_ltc.price).toFixed(2);
    html_element_coinbase_ltc.innerText = price_coinbase_ltc;

    if ((price_coinbase_ltc < last_price_coinbase_ltc) && (isNaN(price_coinbase_ltc) == false)) {
        html_element_coinbase_ltc.innerText = '↓' + price_coinbase_ltc;
        html_element_coinbase_ltc.style.color = 'red';
    } else if ((price_coinbase_ltc > last_price_coinbase_ltc) && (isNaN(price_coinbase_ltc) == false)) {
        html_element_coinbase_ltc.innerText = '↑' + price_coinbase_ltc;
        html_element_coinbase_ltc.style.color = 'green';
    } else if ((price_coinbase_ltc == last_price_coinbase_ltc) && (isNaN(price_coinbase_ltc) == false)) {
        html_element_coinbase_ltc.innerText = price_coinbase_ltc;
        html_element_coinbase_ltc.style.color = 'black';
    }

    last_price_coinbase_ltc = price_coinbase_ltc;
    /* fim Litecoin */
};