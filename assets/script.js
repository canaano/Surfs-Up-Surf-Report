$(document).ready(function() {

    var today = moment();
    
    $("#currentDay").text(today.format("[Current Date:] dddd MMM Do, YYYY"));
    $("#currentTime").text(today.format("[Current Time:] h:mm a [PST]"));
});