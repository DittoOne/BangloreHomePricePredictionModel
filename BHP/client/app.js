function getBathValue() {
    var uiBathrooms = document.getElementById("uiBathrooms").value;
    return parseInt(uiBathrooms);
}

function getBHKValue() {
    var uiBHK = document.getElementById("uiBHK").value;
    return parseInt(uiBHK);
}
$(document).ready(function() {
    // Initialize Select2
    $('#uiLocations').select2({
        placeholder: 'Search or select a location',
        ajax: {
            url: 'http://127.0.0.1:8080/get_location_names',
            dataType: 'json',
            delay: 250,
            processResults: function(data) {
                return {
                    results: data.locations.map(function(location) {
                        return { id: location, text: location };
                    })
                };
            },
            cache: true
        }
    });
});
function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uisqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");


    //var url = "http://127.0.0.1:8080/predict_home_price";
    var url = "/api/predict_home_price";
     $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}
function onPageLoad(){
    console.log('document loaded');
    //var url = "http://127.0.0.1:8080/get_location_names";
    var url = "/api/get_location_names";
    $.get(url, function(data, status) {
      console.log("got response for get_location_names request");
      if (data) {
        var locations = data.locations;
        var uiLocation = document.getElementById("uiLocations");
        $("#uiLocations").empty();
        for (var i in locations) {
          var opt = new Option(locations[i]);
          $("#uiLocations").append(opt);
        }
      }
    });

  }

  window.onload = onPageLoad;