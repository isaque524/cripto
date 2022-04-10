function novacoin(){
    let ws_coinbase = new WebSocket('wss://ws-feed.pro.coinbase.com');
    let last_price_coinbase = null;
    var novamoeda =  document.getElementById("moeda").value;
    novamoeda = novamoeda + '-USD'
    var table = document.getElementById("table")
    var tr =  document.createElement("tr");
    var td = document.createElement("td");
    var html_element_coinbase =  document.createElement("td");
    
    tr.appendChild(td)
    tr.appendChild(html_element_coinbase)
 
 
    table.appendChild(tr)
    ws_coinbase.onopen = function () {
        ws_coinbase.send(JSON.stringify ({
            'type': 'subscribe',
            'channels': [{'name': 'ticker', 'product_ids': [novamoeda]}]
        }))
        
    };

    ws_coinbase.onmessage = function (event) {
        let current_price_coinbase = JSON.parse(event.data);
        if(current_price_coinbase.type == 'error'){
                alert("Moeda Incorreta")
                $(tr).remove();
        }
        else{
       console.log(current_price_coinbase.type)
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
        
    } }

        td.innerHTML = novamoeda


          
};