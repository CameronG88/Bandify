var artist = prompt("search for artist here")


if (artist != null){
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response)
})
}

if (artist != null){
    var queryURL = "https://cors-anywhere.herokuapp.com/api.deezer.com/search?q=" + artist + "&secret=575cd86916cf1a434b588d36676b3ef8";
   console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
    })
    }
