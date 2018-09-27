const hc = require("./http-count.js")
window.onload() = function() {
    document.getElementById("send").onclick = function() { hc.reset(); }
}