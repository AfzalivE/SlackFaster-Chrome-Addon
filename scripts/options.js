"use strict";
var $ = $ || {};
//     analytics = window.analytics || null;
// if (analytics) {
//     var service = analytics.getService("slackfaster-chrome"),
//         tracker = service.getTracker("UA-xxxxxxxx");
//     tracker.sendAppView("Options"), service.getConfig().addCallback(function(config) {
//         var analytics = document.getElementById("analytics");
//         analytics.checked = config.isTrackingPermitted(), analytics.onchange = function() {
//             config.setTrackingPermitted(analytics.checked)
//         }
//     })
// }

var API = "https://slack.com";

// TODO define google analytics tracker
$(document).ready(function() {
    var username = localStorage.getItem("username");
    var channel = localStorage.getItem("channel");
    var token = localStorage.getItem("token");

    $('#username').val(username);
    $('#token').val(token);
    $('#channel').val(channel);

    //Load animation if fields containing data on page load
    $(".login-input").each(function() { 
        if ($(this).val() != "") {
          $(this).parent().addClass("animation");
        }
    });
    var channelList = $('#channellist');
    var request = new XMLHttpRequest;
    if (token) {
        request.open("GET", API + "/api/channels.list?token=" + token + "&pretty=1", 
            request.onreadystatechange = function() {
                if (4 === request.readyState) {
                    if (request.status === 200) {
                        var jsonOptions = JSON.parse(request.responseText);
                        var channels = jsonOptions.channels;
                        if (Array.isArray(channels)) {
                            // Loop over the JSON array.
                            channels.forEach(function(item) {
                                var option = "<option value='" + item.name + "'</option>";
                                channelList.append(option);
                            })
                        }
                    }
                }
            }
        );
        request.send();
    }

    $(".button").on("click", function(b) {
        localStorage.setItem("username", $('#username').val()),
        localStorage.setItem("token", $('#token').val()),
        localStorage.setItem("channel", $('#channel').val()), b.preventDefault() 
    })
});

//Add animation when input is focused
$(".login-input").focus(function(){
  $(this).parent().addClass("animation animation-color");
});

//Remove animation(s) when input is no longer focused
$(".login-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("animation");
  $(this).parent().removeClass("animation-color");
})
// function(a, b, c) {
//     var d, e = a.getElementsByTagName(b)[0];
//     a.getElementById(c) || (d = a.createElement(b), d.id = c, d.src = "https://platform.twitter.com/widgets.js", e.parentNode.insertBefore(d, e))
// }(document, "script", "twitter-wjs");