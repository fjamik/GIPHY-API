$( document ).ready(function() {

  // array of topics
  var topics = ["Car Rasing", "Infiniti", "Soccer", "Swiming", "Dancing", "Bike", "Home Alone 2", "Tick Tock"];

  //Function for visibilaty of gifs
  function showGifs(){
    //cleaning buttons-view button
    $("#buttons-view").empty(); 
      for (var i = 0; i < topics.length; i++){

      var buttonGifs = $("<button>");
      buttonGifs.addClass("gif");
      buttonGifs.addClass("btn btn-outline-warning")
      buttonGifs.attr("data-name", topics[i]);
      buttonGifs.text(topics[i]);
      $("#buttons-view").append(buttonGifs);

    }

  }
    // fanction for adding new button 
    function forNewButt(){
      $("#adding").on("click", function(){
        var gif = $("#input-form").val().trim();
        if (gif == "") {
          return false;
        }
        topics.push(gif);

        showGifs();
        return false;

      });

    }
    //function for removing last added button
    function  delLastButt () {
      $("#remove").on("click", function(event){
        
        event.preventDefault();
        var gif = $("#input-form").val().trim();
        
        topics.pop(gif);
        showGifs();
        return false;
      });
    }

    function showAll() {

      var gif = $(this).attr("data-name")
      //http://api.giphy.com/v1/gifs/search
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=V3KQOIexkweyPd32x3ooLkj6uS1FLibs&limit=10";

      console.log(queryURL);
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        //clen data 
        $("#view").empty();
        var results = response.data;
        if (results == ""){
          alert("There are not gifs for this button");
        }
        for (var i = 0; i < results.length; i++){
          //div for gif
          var gifDiv = $("<div>");
          gifDiv.addClass("gifDiv");
          //pulling rating of gif
          var gifRating = $("<p>").text("Rating: " + results[i].rating);
          gifDiv.append(gifRating);

          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height_small_still.url);
          //start and pausing animation
          gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
          gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
          gifImage.attr("data-state", "still");
          gifImage.addClass("image");
          gifDiv.append(gifImage);
          //adding to #view div
          $("#view").prepend(gifDiv);

        }

      });

    }
    showGifs();
    forNewButt();
    delLastButt();
    
    $(document).on("click", ".gif", showAll);
    $(document).on("click", ".image", function(){
      // retrieve current state of our image
      var state = $(this).attr("data-state");
      if (state == "still"){

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }
    });
  
});