const firebaseConfig = {
    apiKey: "AIzaSyDHWNLfXs1Cu8ZPvROid4ToUAhpJ0TYH7g",
    authDomain: "ballon-game-fd36f.firebaseapp.com",
    projectId: "ballon-game-fd36f",
    storageBucket: "ballon-game-fd36f.appspot.com",
    messagingSenderId: "369320928683",
    appId: "1:369320928683:web:35c2298a036404e137deee",
    measurementId: "G-9NFX11HTKN"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const firestore = firebase.firestore();







//my Functions;

// let a = document.getElementById("login");

// // let b = document.getElementById("loginout").addEventListener("click",GoogleLoginout);

// let provider = new firebase.auth.GoogleAuthProvider()

// function GoogleLogin(){
//   console.log("login btn Call")
// //   firebase.auth().sign(provider).then(res=>{
// //     console.log(res)
// //   }).catch(e=>{
// //     console.log(e)


//   })
 
 function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
      });
}

function logout() {
  auth.signOut();
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  auth.createUserWithEmailAndPassword(email, password)
      .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
      });
}


auth.onAuthStateChanged((user) => {
  if (user) {
      firestore.collection('users').doc(user.uid).set({
          email: user.email,
          lastLoggedInAt: new Date()
      })
          .then(() => {
              console.log("Document written");
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
      setData(user);
      document.getElementById("user").innerHTML = user.email;
      document.getElementById("login_box").style.display = "none";
      document.getElementById("welcome_box").style.display = "block";
  } else {
      document.getElementById("login_box").style.display = "block";
      document.getElementById("welcome_box").style.display = "none";
  }
});

const setData = (user) => {
  firestore.collection('users').doc(user.uid).get().then((querySnapshot) => {
      const data = querySnapshot.data();
      const lastLoggedInAt = data.lastLoggedInAt();
      const lastLoggedInSpan = document.getElementById("lastLoggedIn");
      lastLoggedInSpan.innerHTML = lastLoggedInAt;
  });
}

let popped = 0;
let score = 0

document.getElementById("pop").innerHTML += "Red Ball";
document.addEventListener('mouseover', function(e){
    
    if (e.target.className === "red"){
        score+=10;
                e.target.style.backgroundColor = "#ffffff";
                e.target.textContent = "POP!";
                popped++;
                removeEvent(e);
                document.getElementById("score").innerHTML = +score;

               console.log(score);
    }   
});

function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

// function checkAllPopped(){
//     if (popped === 6){
//         console.log('all popped!');
//         let gallery = document.querySelector('#balloon-gallery');
//         let message = document.querySelector('#yay-no-balloons');
//         gallery.innerHTML = '';
//         message.style.display = 'block';



//  }}
document.addEventListener('mouseover', function(checkAllPopped){
    
    if (popped === 6){
                console.log('all popped!');
                let gallery = document.querySelector('#balloon-gallery');
                let message = document.querySelector('#yay-no-balloons');
                gallery.innerHTML = '';
                message.style.display = 'block';}
  
});













    


