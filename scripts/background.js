"use strict";

function getTask() {}

function handleStateChange() {
    
}

var API = "https://slack.com",
xhr = new XMLHttpRequest;

function submitMsg(input, responseFunc) {
    var TOKEN = localStorage.getItem("token"); // xoxp-2297680975-2399884767-4756015220-ef6786
    var USER = localStorage.getItem("username");
    var CHANNEL = localStorage.getItem("channel"); // dailylog

    var xhrr = new XMLHttpRequest,
    textArg = "text=" + input;
    if (TOKEN && USER && CHANNEL) {
        xhrr.open("GET", API + "/api/chat.postMessage?token=" + TOKEN + "&channel=%23"+ CHANNEL + "&" + textArg + "&username=" + USER + "&as_user=" + USER + "&pretty=1", 
            xhrr.onreadystatechange = function() {
                if (4 === xhrr.readyState) {
                    var response = JSON.parse(xhrr.responseText);
                    if (response.error) {
                        var resp = JSON.parse('{"title" : "Error", "text"  : "' + response.error + '"}');
                        responseFunc(resp);
                    } else {
                        var resp = JSON.parse('{"title" : "Message sent", "text"  : "' + input + '"}');
                        responseFunc(resp);
                    }
                } else {
                    void 0;
                }
        });
        xhrr.send();
    } else {
        // show notificiation
        chrome.notifications.create("error-id", 
            {
                iconUrl: "../images/icon-128.png",
                type: "basic",
                message: "You need to set options",
                title: "SlackFaster error"
            },
            function(a) {
                chrome.runtime.lastError && console.log("Last error:", chrome.runtime.lastError), setTimeout(function() {
                    chrome.notifications.clear(a, function() {})
                }, 2500)
            }
        );
    }
}

xhr.onreadystatechange = handleStateChange, chrome.omnibox.onInputEntered.addListener(function(text) {
    submitMsg(text, function(response) {
        getTask(), chrome.notifications.create("task-saved-id", {
            iconUrl: "../images/icon-128.png",
            type: "basic",
            message: response.text,
            title: response.title
        }, function(a) {
            chrome.runtime.lastError && console.log("Last error:", chrome.runtime.lastError), setTimeout(function() {
                chrome.notifications.clear(a, function() {})
            }, 2500)
        })})
});