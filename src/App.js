import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

function App() {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const googlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setusers({name:result.user.displayName,email:result.user.email})
        console.log(token,user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [users, setusers] = useState("");
  const [chat, setchat] = useState([]);

  const db = getDatabase();
  const chatlist = ref(db, "chats");
  useEffect(() => {
    onChildAdded(chatlist, (data) => {
      setchat((chat) => [...chat, data.val()]);
      console.log(data.val());
    });
  }, []);

  const [msg, setmsg] = useState(" ");

  const sendmsg = () => {
    const newchats = push(chatlist);
    set(newchats, {
      users,
      message: msg,
    });
    setmsg("");
  };
  return (
    <div>
      {users.email ? null : (
        <div>
          <input
            type="text"
            placeholder="Enter the User Name "
            onBlur={(e) => setusers(e.target.value)}
          />
            <button onClick={e=>googlelogin()}> Google</button>
        </div>
      
      )}
      {users.email ? (
        <div>
          <h1>Hello {users.name}</h1>
          <div className="chat-box">
            {chat.map((e, id) => (
              <div
                key={id}
                className={`container ${e.users.email === users.email ? "me" : ""}`}
              >
                <p className="chat">
                  <strong>
                    {e.users.name}: {e.message}
                  </strong>
                </p>
              </div>
            ))}
            <div className="btn">
              <input
                type="text"
                onInput={(e) => setmsg(e.target.value)}
                value={msg}
                placeholder="Write a message"
              />
              <button onClick={(e) => sendmsg()}>Send</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
