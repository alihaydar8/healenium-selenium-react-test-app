import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Switch } from 'react-switch-input';

import { ref, onValue,push,set } from "firebase/database";
import './App.css';
function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyBS-q9pg3g3imtNodwm0SOCwC0jyRZE6jc",
    authDomain: "healenium-seleanium.firebaseapp.com",
    databaseURL: "https://healenium-seleanium-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "healenium-seleanium",
    storageBucket: "healenium-seleanium.appspot.com",
    messagingSenderId: "908894836846",
    appId: "1:908894836846:web:eef118706c41e63c292e7f"
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const [db_change_name_selector, setDb_change_name_selector] = useState();
  const [db_change_place_selector, setDb_change_place_selector] = useState();

  
  
  
  const handleChangeName = (event) => {
    // db_change_name_selector ? setDb_change_name_selector(false):setDb_change_name_selector(true)
    // const newValue = !db_change_name_selector;
    setDb_change_name_selector(!db_change_name_selector);
    set(ref(database, "changename"),!db_change_name_selector)
    // update(ref(database, "changename"), !db_change_name_selector);
  };
  const handleChangePlace = (event) => {
    // const newValue = !db_change_place_selector;
    setDb_change_place_selector(!db_change_place_selector);
    set(ref(database, "changeplace"),!db_change_place_selector)
    // update(ref(database, "changeplace"), !db_change_place_selector);
    // db_change_place_selector ? setDb_change_place_selector(false):setDb_change_place_selector(true)

  };
  
  useEffect(() => {
    onValue(ref(database, "changename"), (snapshot) => {
      setDb_change_name_selector(snapshot.val())
    });
  
    onValue(ref(database, "changeplace"), (snapshot) => {
      setDb_change_place_selector(snapshot.val()) 
    });

  }, [db_change_name_selector, db_change_place_selector]);
  
  return (
    <div className="App">  
      <div>
          <label id="lbl-email">Email Address:</label>
          {db_change_name_selector ?
            <input type="text" id="email"  className="change-email"  /> : 
            <input type="text" id="email"  className="email"/> 
          }
        <div>
            <label id="lbl-password">Password:</label>
          {db_change_place_selector ?
            <div>
              <div>
                <div>
                  <input type="password" id="password"/>
                </div>
              </div>
            </div> :
            <input type="password" id="password"/>
          }
        </div>
        <div className = "btn">
          <div >
            <Switch name={"first"} labelLeft="change class name" checked={db_change_name_selector} onChange={handleChangeName}/> 
          </div>
          <div >
            <Switch name={"second"} labelLeft="change structure" checked={db_change_place_selector} onChange={handleChangePlace}/>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
