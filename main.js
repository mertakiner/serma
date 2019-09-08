// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyD62V2KcehutcHJzVvfCHzVYPVAMUoIDho",
authDomain: "responsiveform-a33dd.firebaseapp.com",
databaseURL: "https://responsiveform-a33dd.firebaseio.com",
projectId: "responsiveform-a33dd",
storageBucket: "",
messagingSenderId: "1014180139963",
appId: "1:1014180139963:web:88defa967900699f54aa9e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit Form
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var company = getInputVal('company');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');

    // Save message
    saveMessages(name, company, email, phone, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },3000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}


// Save message to Firebase
function saveMessages(name, company, email, phone, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message
    });

}