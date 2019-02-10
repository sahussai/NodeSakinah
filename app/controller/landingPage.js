/*
$( document ).ready(function() {
    console.log( "ready!!" );



  $(function(){
 $('#submit-dream').on('click', function(e) {
      console.log("submit-dream was clicked\n the value was " + $(this).val() + " " + e);
 });
});

*/
  // Script to open and close sidebar
console.log("This is from jQuery");

//console.log($.fn.jquery);

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
//});
