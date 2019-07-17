{/* <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
</tr> */}

var firebaseConfig = {
    apiKey: "AIzaSyDNUKjmIStkfvw5Rbytu7JePVW-2t0r2wY",
    authDomain: "train-times-d5a5f.firebaseapp.com",
    databaseURL: "https://train-times-d5a5f.firebaseio.com",
    projectscope: "train-times-d5a5f",
    storageBucket: "",
    messagingSenderscope: "263826881277",
    appscope: "1:263826881277:web:1e11ef7f61d002ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();


$(".btn").on("click", function(event){
    event.preventDefault();
    var train = {
        name: $("#nameInput").val().trim(),
        destination: $("#destinationInput").val().trim(),
        time: $("#timeInput").val().trim(),
        frequency: $("#frequencyInput").val().trim(),
    };
    db.ref().push({
        train: train
    });
    //console.log(train.name);
});
db.ref('/').on("child_added", function(childSnap) {

    console.log(childSnap.val().train.name)
    
    var newRow = $("#trains").append("<tr>");
    $(newRow).append("<td scope='col'>" + childSnap.val().train.name + "</td>");
    $(newRow).append("<td scope='col'>" + childSnap.val().train.destination + "</td>");
    $(newRow).append("<td scope='col'>" + childSnap.val().train.frequency + "</td>");
    $(newRow).append("<td scope='col'>");
    $(newRow).append("<td scope='col'>");
    $("#trains").append(newRow);
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });