/* Cardano */
let ws_coinbase_ada  = new WebSocket('wss://ws-feed.pro.coinbase.com');
let html_element_coinbase_ada = document.getElementById('show_price_ada');

let last_price_coinbase_ada  = null;

ws_coinbase_ada .onopen = function () {
    ws_coinbase_ada .send(JSON.stringify ({
        'type': 'subscribe',
        'channels': [{'name': 'ticker', 'product_ids': ['ADA-USD']}]
        
    }))
};

ws_coinbase_ada .onmessage = function (event) {
    let current_price_coinbase_ada = JSON.parse(event.data);
    let price_coinbase_ada  = parseFloat(current_price_coinbase_ada .price).toFixed(2);
    html_element_coinbase_ada .innerText = price_coinbase_ada ;

    if ((price_coinbase_ada  < last_price_coinbase_ada ) && (isNaN(price_coinbase_ada ) == false)) {
        html_element_coinbase_ada .innerText = '↓' + price_coinbase_ada ;
        html_element_coinbase_ada .style.color = 'red';
    } else if ((price_coinbase_ada  > last_price_coinbase_ada ) && (isNaN(price_coinbase_ada ) == false)) {
        html_element_coinbase_ada .innerText = '↑' + price_coinbase_ada ;
        html_element_coinbase_ada .style.color = 'green';
    } else if ((price_coinbase_ada  == last_price_coinbase_ada ) && (isNaN(price_coinbase_ada ) == false)) {
        html_element_coinbase_ada .innerText = price_coinbase_ada ;
        html_element_coinbase_ada .style.color = 'black';
    }



    last_price_coinbase_ada  = price_coinbase_ada ;

    

    /* fim de Cardano */
};




