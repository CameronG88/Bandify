var artist = prompt("search for artist here")


if (artist != null) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    })
}


if (artist != null) {
    var queryURL = "https://itunes.apple.com/search?term=" + artist + "&country=us&media=music&";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(JSON.parse(response))
    })
}

window.onload = function () {
    if (window.jQuery) {
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}