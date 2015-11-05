function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var docName = "command_multi_" + randomNumber(100,1000);
function test() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            window.response = xmlhttp.responseText;
            window.status = xmlhttp.status;
            if(xmlhttp.status >= 200 && xmlhttp.status < 300){
                if (xmlhttp.responseText.indexOf("true") !=-1)
                {
                    window.testResult = "PASS";
                }
                else
                {
                    window.testResult = "FAIL";
                }
            }
            else
            {
                window.testResult = "FAIL";
            }
            alert(window.testResult);
        }
    };
    var data = {
        "type": "command",
        "~userid": "user1",
        "channels": ["entity_user1"],
        "~status": "pending",
        "request": {
            "uri": "/service1/add-number",
            "method": "PUT",
            "headers": {},
            "body": {
                "a": 1,
                "b": 2
            }
        }
    };

    xmlhttp.open("PUT", "http://pmapi/cdb/predixgo/" + docName, true);
    xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Content-length", data.length);
    xmlhttp.send(JSON.stringify(data));

}

function test2() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            window.response = xmlhttp.responseText;
            if(xmlhttp.status == 200){
                if (xmlhttp.responseText.indexOf(docName) !=-1)
                {
                    window.testResult = "PASS";
                }
                else
                {
                    window.testResult = "FAIL";
                }
            }
            else
            {
                window.testResult = "FAIL";
            }
            alert(window.testResult + ': ' + window.response);
        }
    };

    xmlhttp.open("GET", "http://pmapi/cdb/predixgo/" + docName, true);

    xmlhttp.send();
}
