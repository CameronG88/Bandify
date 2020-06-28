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
    $("#songsList").empty();
    $("#bandsList").empty();

    var artist = $("#searchInput").val();
    console.log(artist);
    // Call to BandsInTown API for image of artist searched, displayed on page with css dynamically
    var queryURL = "https://cors-anywhere.herokuapp.com/rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var newImg = $("<img>")
        newImg.attr("src", response.image_url)
        newImg.css({ "width": "200", "height": "200", "border-radius": "10px 0 0 10px" })
        // Appends image of artist searched to BandsInTown container
        $("#bandsList").append(newImg)
        console.log(response)
    })
    // Call to Deezer API to display artists top 25 songs in Deezer container
    var deezerURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search?q=" + artist + "&secret=575cd86916cf1a434b588d36676b3ef8";
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
    })
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
    $("#pointer").focus();
}