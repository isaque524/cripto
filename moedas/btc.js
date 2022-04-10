/* Bitcoin */
let ws_coinbase = new WebSocket('wss://ws-feed.pro.coinbase.com');
let html_element_coinbase = document.getElementById('show_price_btc');

let last_price_coinbase = null;

ws_coinbase.onopen = function () {
    ws_coinbase.send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ['BTC-USD']}]
    }))
};

ws_coinbase.onmessage = function (event) {
    let current_price_coinbase = JSON.parse(event.data);
    let price_coinbase = parseFloat(current_price_coinbase.price).toFixed(2);
    html_element_coinbase.innerText = price_coinbase;

    if ((price_coinbase < last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        html_element_coinbase.innerText = '↓' + price_coinbase;
        html_element_coinbase.style.color = 'red';
    } else if ((price_coinbase > last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        html_element_coinbase.innerText = '↑' + price_coinbase;
        html_element_coinbase.style.color = 'green';
    } else if ((price_coinbase == last_price_coinbase) && (isNaN(price_coinbase) == false)) {
        html_element_coinbase.innerText = price_coinbase;
        html_element_coinbase.style.color = 'black';
    }

    last_price_coinbase = price_coinbase;
    /* fim Bitcoin */
};

