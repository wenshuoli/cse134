window.onload = function () {
    var popup = document.getElementById('resolve-btn');
    if (popup) {
        popup.addEventListener('click', function () {
            if (this.classList.contains('hidden')) {
                this.classList.remove('hidden');
                this.classList.add('fadein');
            }
        });
    }
}

var deleted;
var resolved;
function deleteIssue(name){
    var paras = document.getElementsByClassName(name);
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
    var el = document.getElementsByClassName('overlay');
    el[1].setAttribute("hidden", true);
}

function resolveIssue(name){
    var paras = document.getElementsByClassName(name);
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
    var el = document.getElementsByClassName('overlay');
    el[0].setAttribute("hidden", true);

    switch(name){
        case 'issue1': 
            open("./listHis1.html");
            break;
        case 'issue2': 
            open("./listHis2.html");
            break;
        case 'issue3': 
            open("./listHis3.html");
            break;
        case 'issue4': 
            open("./listHis4.html");
            break;
        default: 
            break
    }
}

function deleteOverLayON(issueName){
    deleted = issueName;
    var el = document.getElementById('delete-popup');
    el.removeAttribute('hidden');
}

function resolveOverLayON(issueName){
    resolved = issueName;
    var el = document.getElementById('resolve-popup');
    el.removeAttribute('hidden');
}

function overLayOff(){
    deleted = null;
    resolved = null;
    var el = document.getElementsByClassName('overlay');
    el[0].setAttribute("hidden", true);
    el[1].setAttribute("hidden", true);
}