// Container for BandsInTown
var mainBandsContainer = $("#mainBandsContainer");
var bandsTableContainer = $("<div>").attr("class", "bandsTableContainer");
// Container for Deezer
var mainDeezerContainer = $("#mainDeezerContainer");
var deezerTableContainer = $("<div>").attr("class", "deezerTableContainer");
start();
// Gives life to search button
$("#searchBtn").on("click", function (e) {
    event.preventDefault();
    $("#bandsList").show();
    $(".containerEdge").show();
    $("#songsList").empty();
    $("#bandsList").empty();
    $("#titleDiv").empty();
    var search = $("#searchInput").val();
    console.log(search);
    var searchCrit = $("select option:selected").text();
    if (searchCrit == "Artist") {
        // Call to BandsInTown API for image of artist searched, displayed on page with css dynamically
        var queryURL = "https://cors-anywhere.herokuapp.com/rest.bandsintown.com/artists/" + search + "?app_id=codingbootcamp";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // set function variables
            var newImg = $("<img>");
            var newTitle = $("<h1>");
            var eventText = $("<p>");
            var linkText = $("<a>");
            var socialLink = $("<a>");
            // Creates and appends image of artist searched to BandsInTown container
            newImg.attr("src", response.image_url);
            newImg.css({ "width": "200", "height": "200", "border-radius": "10px 10px 10px 10px", "float": "left" });
            newImg.addClass("centerpic");
            $("#bandsList").prepend(newImg);
            // creates and appends artist Title
            newTitle.text(response.name);
            newTitle.addClass("artTitle");
            $("#titleDiv").append(newTitle);
            // creates and appends amount of artist upcoming events
            if (response.upcoming_event_count != null) {
                eventText.text("Number of upcoming events: " + response.upcoming_event_count);
                eventText.addClass("text-right")
                $("#bandsList").append(eventText)
                linkText.text("Click here for event info");
                linkText.attr("href", response.url);
                linkText.addClass("text-right")
                $("#bandsList").append(linkText);
            } else {
                eventText.text("No upcoming events scheduled")
            }
            if (response.facebook_page_url != null) {
                socialLink.text(response.name + " Facebook");
                socialLink.addClass("text-right");
                socialLink.attr("href", response.facebook_page_url);
                $("#bandsList").append(socialLink);


            }
        })
        // Call to Deezer API to display artists top 25 songs in Deezer container
        var deezerURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search?q=" + search + "&secret=575cd86916cf1a434b588d36676b3ef8";
        console.log(deezerURL);
        $.ajax({
            url: deezerURL,
            method: "GET"
        }).then(function (response) {
            for (let index = 0; index < response.data.length; index++) {
                var newLi = $("<li>").text(response.data[index].title);
                newLi.addClass("songId");
                newLi.data("songId", response.data[index].id)
                // Prepends song list created to Deezer song list container
                $("#songsList").prepend(newLi);
            }
            console.log(response)
        });
        // begin search by album functions
    } else {
        var deezerURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search/album?q=" + search + "&secret=575cd86916cf1a434b588d36676b3ef8";
        console.log(deezerURL);
        $.ajax({
            url: deezerURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var albumArtist = $("<h1>").text(response.data[0].title + " by: " + response.data[0].artist.name);
            albumArtist.addClass("artTitle");
            var albumImg = $("<img>").attr("src", response.data[0].cover_medium);
            albumImg.addClass("centerpic");
            albumImg.css({ "width": "200", "height": "200", "border-radius": "10px 10px 10px 10px", "float": "left" });
            $("#bandsList").prepend(albumImg);
            $("#titleDiv").append(albumArtist);

            var albumListURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/album/" + response.data[0].id + "/tracks"
            $.ajax({
                url: albumListURL,
                method: "GET"
            }).then(function (response) {
                for (let index = 0; index < response.data.length; index++) {
                    var newLi = $("<li>").text(response.data[index].title);
                    newLi.addClass("songId");
                    newLi.data("songId", response.data[index].id)
                    // Prepends song list created to Deezer song list container
                    $("#songsList").prepend(newLi);
                }
                var bandsURL = "https://cors-anywhere.herokuapp.com/rest.bandsintown.com/artists/" + response.data[0].artist.name + "?app_id=codingbootcamp";
                $.ajax({
                    url: bandsURL,
                    method: "GET"
                }).then(function (response) {
                    var albumeventText = $("<p>");
                    var albumlinkText = $("<a>");
                    var albumsocialLink = $("<a>");
                    if (response.upcoming_event_count != null) {
                        albumeventText.text("Number of upcoming events: " + response.upcoming_event_count);
                        albumeventText.addClass("text-right")
                        $("#bandsList").append(albumeventText)
                        albumlinkText.text("Click here for event info");
                        albumlinkText.attr("href", response.url);
                        albumlinkText.addClass("text-right")
                        $("#bandsList").append(albumlinkText);
                    } else {
                        albumeventText.text("No upcoming events scheduled")
                    }
                    if (response.facebook_page_url != null) {
                        albumsocialLink.text(response.name + " Facebook");
                        albumsocialLink.addClass("text-right");
                        albumsocialLink.attr("href", response.facebook_page_url);
                        $("#bandsList").append(albumsocialLink);
        
        
                    }


                    console.log(response);

                })
            })
        });
    }
});
// Call to Deezer API to display song player on page
$(document).on("click", ".songId", function (e) {
    var id = $(this).data("songId");
    console.log(id);
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/api.deezer.com/oembed?url=http://www.deezer.com/track/" + id,
        method: "GET"
    }).then(function (response) {
        $("#player").html(response.html);
        console.log(response.html)
    })
})
// Gives mouse pointer in Deezer and BandsInTown containers
function start() {
    $("#bandsList").hide();
    $(".containerEdge").hide();
    $("#pointer").focus();
    var searchCrit = $("select option:selected").text();
    console.log(searchCrit);
    if (searchCrit == "Album") {
        console.log("hi");
    } else {
        console.log("bye")
    }
}