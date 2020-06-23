// var artist = "Will Smith"

// var newDiv = $("<div>")

// function test(){
//     newDiv.text("yo");
//     $(this).append(newDiv);
// }

// test();

// // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=";
// //     $.ajax({
// //       url: queryURL,
// //       method: "GET"
// //     }).then(function(response) {
// //         console.log(response);
// //     })
window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}