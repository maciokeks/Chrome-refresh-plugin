var is_checked;
var num_sec;
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.storage.sync.set({
            'toggle': false
        }, function() {});
    }
});
function change(){
    console.log(document.getElementById('toggle').checked)
    chrome.storage.sync.set({
        'toggle': (document.getElementById('toggle').checked)
    }, function() {});


    chrome.storage.sync.get('toggle', function(check_fun) {
      //true or false value in is_checked variable
      is_checked = check_fun['toggle'];
      //alert("Value of checbox " + is_checked);
    });


}
chrome.storage.sync.get('toggle', function(storage) {
    $('#toggle').prop('checked', storage.toggle);
    //console.log(storage.toggle);

});




document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#toggle').addEventListener('change', change);
  document.getElementById("input_box").value = localStorage.getItem("seconds");
  reload(); // main function to make refresh the page

});

function saveComment() {
    var seconds = document.getElementById("input_box").value;
    if (seconds == 0) {
        seconds= 5;
    }
    localStorage.setItem("seconds", seconds);
    location.reload();
    num_sec = seconds;

}

function reload(){
  var btn = document.getElementById('submit');
    if(btn){
        btn.addEventListener('click', function () {
            saveComment();

            if(is_checked == true){
              //do reload
              document.getElementById("toggle").checked = true;
              alert("Reloading the page, number of second: " + num_sec);

              
             header("refresh: 10;");

            }else{
              //not reload and show communicate
              document.getElementById("toggle").checked = false;
              alert("Click the toggle to activate");


            }
        });
      }
}
