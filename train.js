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
    db.ref().push(train);
    //console.log(train.name);
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");
    
});
db.ref().on("child_added", function(childSnap) {

    //console.log(childSnap.val().name)
    
    var trainFrequency = childSnap.val().frequency;
    //console.log(trainFrequency);
    var firstTrain = childSnap.val().time;
    //console.log(firstTrain);
    var timeConverted = moment(firstTrain, "HH:mm");
    //console.log(timeConverted);
    var timeDifference = Math.abs(moment().diff(moment(timeConverted), "minutes"));
    //console.log(timeDifference)
    var remainder = timeDifference % trainFrequency;
    //console.log(remainder);
    var minsAway = trainFrequency - remainder;
    var arrival = moment().add(minsAway, "minutes");
    //console.log(arrival);
    
    
    var newRow = $("#trains").append("<tr>");
    $(newRow).append("<td scope='col'>" + childSnap.val().name + "</td>");
    $(newRow).append("<td scope='col'>" + childSnap.val().destination + "</td>");
    $(newRow).append("<td scope='col'>" + childSnap.val().frequency + "</td>");
    $(newRow).append("<td scope='col'>" + moment(arrival).format("hh:mm, a"));
    $(newRow).append("<td scope='col'>" + minsAway);
    $("#trains").append(newRow);


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code)

   
  });