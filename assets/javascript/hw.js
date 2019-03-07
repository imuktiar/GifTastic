var cars = ["Drifting", 
            "Road Racing", 
            "GT3 Racing", 
            "Formula One",
            "Initial D",
            "350z"];

// Function for displaying data
function renderButtons() {

  $(".button-display").empty();

  for (var i = 0; i < cars.length; i++) {
    var a = $("<button>");
    a.addClass("clicker btn btn-primary");
    a.attr("data-name", cars[i]);
    a.text(cars[i]);
    $(".button-display").append(a);
    console.log('car array =' + cars + '-');
  }
}

renderButtons();

$("body").on("click", '#add-car', function(event) {

  event.preventDefault();
  var car = $("#car-input").val().trim();
  if (car == '') {
    alert('please insert a MEANINGFUL car brand or model, not just spaces')
  }
  else {
    cars.push(car);
    console.log('car array =' + cars + '-');
    $("#car-input").val('')
    renderButtons();
  }
});

$("body").on("click", '.clicker', function() {
  
  var car = $(this).attr("data-name");
  console.log("data-name -" + car + "-");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    car + "&api_key=zPDjaSmQ2EjW3d5kdXcCks8YyYGwLtPC&limit=10";
  console.log("query -" + queryURL + "-");

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {

      var results = response.data;
      console.log(response);
      $('#images').empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var p = $('<p>')
        var carImage = $("<img class='img-thumbnail'>");
        var carUrl = results[i].images.fixed_height.url;
        var carStill = results[i].images.fixed_height_still.url;
        carImage.attr({
            src: carStill,
            'data-still': carStill,
            'data-animate': carUrl,
            'data-state':"still"
        });

        gifDiv.prepend(p);
        gifDiv.prepend(carImage);

        $("#images").prepend(gifDiv);
      };
    });
});

$("body").on("click", '.img-thumbnail', function() {

  var state = $(this).attr('data-state');

  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});