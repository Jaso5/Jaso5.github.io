const socket = new WebSocket("ws://127.0.0.1:9001");
var socket_state = 0;
const event_queue = [];

socket.addEventListener("open", event => {
    socket_state = 1;
    addLog("Socket Opened")
})

socket.addEventListener("close", event => {
    socket_state = -1;
    addLog("Socket Closed Normally")
})

socket.addEventListener("error", event => {
    socket_state = -1;
    addLog("Socket errored")
})

socket.addEventListener("message", event => {
    if (event.data == '__pong__') {
        pong();
        addLog("Ping pong'd correctly")
        return;
    } else {
        event_queue.push(event.data)
        addLog(event.data)
    }
})

function addLog(content) {
    let p = document.createElement("p");
    p.innerText = content;
    document.body.appendChild(p)
}


function ping() {
    socket.send('__ping__');
    tm = setTimeout(function () {
        addLog("Ping-Pong failed, we have timed out")
        socket_state = -1;
        window.removeEventListener("unload")
    }, 5000);
}

function pong() {
    clearTimeout(tm);
}

window.addEventListener("unload", function () {
    if(socket.readyState == WebSocket.OPEN)
        socket.close();
});