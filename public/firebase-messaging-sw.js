importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA01UWXTQTeGtAV2L5LfTm5tGjE6961Jkw",
  authDomain: "auth-dei.firebaseapp.com",
  projectId: "auth-dei",
  storageBucket: "auth-dei.firebasestorage.app",
  messagingSenderId: "148667249314",
  appId: "1:148667249314:web:d110f8055703c140de5dfb",
  measurementId: "G-9JJV87B9ZT",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
