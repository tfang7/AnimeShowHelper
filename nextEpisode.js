// ==UserScript==
// @name         nextEpisode
// @namespace    www2.gogoanime.se
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at     document-start
// @match        http://*/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant      GM_registerMenuCommand
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// ==/UserScript==
window.addEventListener('keydown', function(event){
        console.log(event);
        switch (event.key){
            case ("n"):
                nextEpisode();
        }
    });
window.addEventListener('load', function() {
    // your code here
    var logger = document.createElement("div");
    logger.id = "log";
    var tempText = {};
            var copy = function(){ return window.location.href; };

    tempText.url = copy();
    logger.textContent = tempText.url;
    console.log(tempText.url);
$( window.location ).bind(
    "change",
    function( objEvent, objData ){
        var jLog = $( "#log" );
        // Add the URL change.
        jLog.append(
            "<li>" +
            "Hash changed from " +
            "<strong>" + objData.previousHash + "</strong>" +
            " to " +
            "<strong>" + objData.currentHash + "</strong>" +
            "</li>"
        );
        console.log(jLog);
    }
);
    var nextFlag = false;
    var url = {};
    url.href = window.location.href;
    var link = document.createElement("div");
    link.innerHTML = url.href;
    var all = document.body.getElementsByTagName('*');
    for (var j = 0; j < all.length; j++){
        if (all[j].className.includes("ads")){
            (all[j].parentElement.removeChild(all[j]));
        }
    }
    //   console.log(player);
    // console.log($('.play-video')[0]);
    var checkExist = setInterval(function(){
        var video = videojs('my-video-player');
        if (video !== undefined){
            video.play();
            clearInterval(checkExist);
        }
    }, 200);
    var checkThemeSong = setInterval(function(){
        video = videojs('my-video-player');
        var whereYouAt = video.currentTime();
        if (whereYouAt >= 76){
            video.currentTime(whereYouAt + 90);
            clearInterval(checkThemeSong);
        }
    },300);
    var checkEnd = setInterval(function(){
        video = videojs('my-video-player');
        if (window.location.hostname == "gogoanime.io") console.log(window.location);
        console.log(window.location.href);
        var whereYouAt = video.currentTime();
        var videoLength = video.duration();
        var ended = whereYouAt >= videoLength - 2;
        if (ended){
            /*    if (window.location.hostname === ("gogoanime.io")){
                if (window.location.hostname && window.location.pathname){
                    var path = window.location.hostname + window.location.pathname;
                    console.log(path);
                    window.location.href = path;
                }
            }*/
            nextFlag = true;
            //nextEpisode();
            clearInterval(checkEnd);
        }
    },2000);
    //    console.log(video);
    setInterval(function(){
        if (nextFlag) {
            console.log(logger.textContent);
            nextEpisode();
            if (window.location.href.includes("disqus") )return;
            /*   var next = (parseInt(window.location.href.replace(/\D/g,'')) + 1);
            var temp = window.location.href;
            temp = temp.replace(/[0-9]/g, next);
            console.log(temp);
            window.location.href = temp;*/
        }
        else nextFlag = false;
    }, 2000);

    var elements = document.getElementsByClassName("ads");
    for (var i = 0; i < elements.length; i++){
        elements[i].parentNode.removeChild(elements[i]);
    }

}, false);
GM_registerMenuCommand('nextEpisode', nextEpisode, 'r');
GM_registerMenuCommand('lastEpisode', lastEpisode, 'r');
function lastEpisode(){
    var len = window.location.href.length;
    var next = (parseInt(window.location.href.replace(/\D/g,'')) - 1);
    var t = window.location.href.slice(0,len-next.length);
    t += next;
    window.location.href = t;
}
function nextEpisode(){
    var len = window.location.href.length;
    var next = (parseInt(window.location.href.replace(/\D/g,'')) + 1);
    var t = window.location.href.slice(0,len-next.toString().length+1);
        alert(t);

    if (t.includes("&typesub=SUB")){
        t = window.location.href.slice(0,len-"&typesub=SUB".length-next.toString().length);
        t = t.slice(0,t.length-"&typesub=SUB".length+1);
    }
    t += next;
    window.location.href = t;
    //  window.location.href[len-1] = window.location.href.replace(/\D/g,'')++;
    // Your code here...

}
function nextEpisodeEnd(path){
    console.log(window.domain);
    var len = path.length;
    var next = (parseInt(path.replace(/\D/g,'')) + 1);
    var t = path.slice(0,len-next.toString().length);
    if (t.includes("&typesub=SUB")){
        t = window.location.href.slice(0,len-"&typesub=SUB".length-next.toString().length);
        //   t = t.slice(0,t.length-"&typesub=SUB".length + 1);
    }
    t += next;

    window.location.href = t;
    //  window.location.href[len-1] = window.location.href.replace(/\D/g,'')++;
    // Your code here...

}
