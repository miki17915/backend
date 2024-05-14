import { useState, useEffect } from "react";
import Navbar from "./nav";
import Message from "./components/message";
import Mymessage from "./components/myMessage";
import { app, auth, db, storage } from "./firebaseConfig";
import {
  collection,
  query,
  orderBy,
  getDocsFromServer,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [color, setColor] = useState("#C9E8E4");
  const [isReplying, setIsReplying] = useState(false);
  const [message, setReplyMessage] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("time")
        );
        const messagesSnapshot = await getDocsFromServer(messagesQuery);
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [db]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (user) {
      const messageData = {
        user: user.displayName,
        time: Timestamp.fromDate(new Date()),
        isLiked: false,
        isBookmarked: false,
        isCommented: false,
        content: newMessage,
        photoUrl: user.photoURL,
      };
      const docRef = await addDoc(collection(db, "messages"), messageData);
      setMessages((oldMessages) => [
        ...oldMessages,
        { id: docRef.id, ...messageData },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="home">
      {messages.map((e) =>
        e.user === getAuth().currentUser.displayName ? (
          <div key={e.id}>
            <Mymessage
              setMessages={setMessages}
              data={e}
              newMessage={updatedMessage}
            />
          </div>
        ) : (
          <div key={e.id}>
            <Message data={e} />
          </div>
        )
      )}

      <form action="" className="newM" onSubmit={(e) => e.preventDefault()}>
        <div className="mm">
         
          <input
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ backgroundColor: "white" }}
          >
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 25.5646V0.166992L25 12.8658L0 25.5646ZM2.63158 20.8026L18.2237 12.8658L2.63158 4.92904V10.4848L10.5263 12.8658L2.63158 15.2468V20.8026Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="bLank"></div>
      <Navbar />
    </div>
  );
};
export default Home;
