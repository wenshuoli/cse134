function getHistoryRest(solved){
    var xmlhttp = new XMLHttpRequest();
    var url = "/db/db.json";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data  = JSON.parse(this.responseText);
            extractJson(data, solved);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function extractJson(data, solved){

    for(var key in data)
    {
        if(key!='nextId'){
            var issueVal= data[key];
            if((!solved && !issueVal.solved) || (solved && issueVal.solved))
                createHomeElement(key, issueVal);
        }
    }
}