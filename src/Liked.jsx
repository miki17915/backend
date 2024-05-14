import { useState, useEffect } from "react";
import Navbar from "./nav";
import Navbar2 from "./nav2";
import Message from "./components/message";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Liked = () => {
  const [color, setColor] = useState("#C9E8E4");
  const [likedMessages, setLikedMessages] = useState([]);

  useEffect(() => {
    const fetchLikedMessages = async () => {
      const q = query(collection(db, "messages"), where("isLiked", "==", true));
      const querySnapshot = await getDocs(q);
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({id: doc.id, ...doc.data()});
      });
      setLikedMessages(messages);
    };

    fetchLikedMessages();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div className="Liked">
      <Navbar2 />
        <h1>Liked messages here:</h1>
      {likedMessages.length > 0 ? (
        likedMessages.map((message) => (
          <Message key={message.id} data={message} />
        ))
      ) : (
        <div>No liked messages</div>
      )}

      <div className="bLank2"></div>
      <Navbar />
    </div>
  );
};
export default Liked;
