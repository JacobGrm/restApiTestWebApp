function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var docName = "command_multi_" + randomNumber(100,1000);
var  testResult = '';

function test1() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {

            window.response = xmlhttp.responseText;
            window.status = xmlhttp.status;
            if(xmlhttp.status >= 200 && xmlhttp.status < 300) {
                if (xmlhttp.responseText.indexOf("true") !=-1)
                {
                    testResult = "PASS";
                }
                else
                {
                    testResult = "FAIL";
                }
            }
            else
            {
                testResult = "FAIL";
            }
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

    xmlhttp.open("PUT", "http://pmapi/cdb/predixgo/" + docName, false);
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
                    testResult = "PASS";
                }
                else
                {
                    testResult = "FAIL";
                }
            }
            else
            {
                testResult = "FAIL";
            }
        }
    };

    xmlhttp.open("GET", "http://pmapi/cdb/predixgo/" + docName, false);
    xmlhttp.send();
}


describe('PredixMobile API Tests', function() {

    describe('Create and process a command', function() {

        it("Create a command by posting to the local CouchDb", function () {

            test1();
            expect(testResult).toEqual('PASS');
        });

        it("Verify command synced to the backend, processed and sycned back to the client", function () {

            test2();
            expect(testResult).toEqual('PASS');
        });

    });

});
