// Container for BandsInTown
var mainBandsContainer = $("#mainBandsContainer");
var bandsTableContainer = $("<div>").attr("class", "bandsTableContainer");
// Container for Deezer
var mainDeezerContainer = $("#mainDeezerContainer");
var deezerTableContainer = $("<div>").attr("class", "deezerTableContainer");
var searchField = $("#searchInput");
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

    var searchCrit = $("select option:selected").text();
    if (searchCrit == "Artist") {
        // Call to BandsInTown API for image of artist searched, displayed on page with css dynamically
        var queryURL = "https://cors-anywhere.herokuapp.com/rest.bandsintown.com/artists/" + search + "?app_id=codingbootcamp";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // set function variables
            var newTitle = $("<h1>");
            var linkText = $("<a>");
            var socialLink = $("<a>");
            var imageurl = response.image_url
            // Creates and appends image of artist searched to BandsInTown container
            $("#bandsList").css({ "background": "url(" + imageurl + ")", "background-size": "100% 100%" });
            // creates and appends artist Title
            newTitle.text(response.name);
            newTitle.addClass("artTitle");
            $("#titleDiv").append(newTitle);
            // creates and appends amount of artist upcoming events

            linkText.text("Upcoming Events: " + response.upcoming_event_count + " 📅 Event Info");
            linkText.attr({
                type: "button",
                href: response.url,
                target: "_blank"
            });
            linkText.addClass("text-right bandsBtn")
            $("#bandsList").append(linkText);

            if (response.facebook_page_url != null) {
                socialLink.text(response.name + " Facebook");
                socialLink.addClass("text-right bandsBtn");
                socialLink.attr({
                    type: "button",
                    href: response.facebook_page_url,
                    target: "_blank"
                });
                $("#bandsList").append(socialLink);

            }
        }).then(function () {
            // Call to Deezer API to display artists top 25 songs in Deezer container
            var deezerURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search/artist?q=" + search + "&secret=575cd86916cf1a434b588d36676b3ef8";

            $.ajax({
                url: deezerURL,
                method: "GET"
            }).then(function (response) {
                var artId = response.data[0].id
                $.ajax({
                    url: "https://cors-anywhere.herokuapp.com/api.deezer.com/artist/" + artId + "/top?limit=25",
                    method: "GET"
                }).then(function (response) {

                    for (let index = 0; index < response.data.length; index++) {
                        var newLi = $("<li>").text("▶    " + response.data[index].title);
                        newLi.addClass("songId");
                        newLi.data("songId", response.data[index].id)
                        // Prepends song list created to Deezer song list container
                        $("#songsList").append(newLi);
                    }

                });
            })
        })
    } else {
        var deezerURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search/album?q=" + search + "&secret=575cd86916cf1a434b588d36676b3ef8";

        $.ajax({
            url: deezerURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var albumArtist = $("<h1>").text(response.data[0].title + " by: " + response.data[0].artist.name);
            albumArtist.addClass("artTitle");
            var albumImg = response.data[0].cover_big;
            // albumImg.addClass("centerpic");
            // albumImg.css({ "width": "200", "height": "200", "border-radius": "10px 10px 10px 10px", "float": "left" });
            $("#bandsList").css({ "background": "url(" + albumImg + ")", "background-size": "100% 100%" });
            $("#titleDiv").append(albumArtist);

            var albumListURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/album/" + response.data[0].id + "/tracks"
            $.ajax({
                url: albumListURL,
                method: "GET"
            }).then(function (response) {
                for (let index = 0; index < response.data.length; index++) {
                    var newLi = $("<li>").text("▶    " + response.data[index].title);
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
                    var albumlinkText = $("<a>");
                    var albumsocialLink = $("<a>");
                        albumlinkText.text("Upcoming Events: " + response.upcoming_event_count + " 📅 Event Info");
                        albumlinkText.attr({
                            type: "button",
                            href: response.url,
                            target: "_blank"
                        });
                        albumlinkText.addClass("text-right bandsBtn")
                        $("#bandsList").append(albumlinkText);
                   
                    if (response.facebook_page_url != null) {
                        albumsocialLink.text(response.name + " Facebook");
                        albumsocialLink.addClass("text-right bandsBtn");
                        albumsocialLink.attr({
                            type: "button",
                            href: response.facebook_page_url,
                            target: "_blank"
                        });
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

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/api.deezer.com/oembed?url=http://www.deezer.com/track/" + id,
        method: "GET"
    }).then(function (response) {
        $("#player").html(response.html);

    })
})
// Gives mouse pointer in Deezer and BandsInTown containers
function start() {
    $("#bandsList").hide();
    $(".containerEdge").hide();
    $("#pointer").focus();
    var searchCrit = $("select option:selected").text();
}
// Execute a function when the user releases a key on the keyboard
$(document).on("keyup", "#searchInput", function (event) {

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        $("#searchBtn").click();
    }
});