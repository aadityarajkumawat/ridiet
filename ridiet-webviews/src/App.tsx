import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React from "react";
import "./App.css";
import { auth, googleProvider } from "./conf";

function App() {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  return (
    <div className="App">
      <button
        onClick={() => {
          (async () => {
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
          })();
        }}
      >
        login with google
      </button>
    </div>
  );
}

export default App;
