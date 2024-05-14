import { useState, useEffect } from "react";
import Navbar from "./nav";
import Navbar2 from "./nav2";
import Message from "./components/message";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Bookmark = () => {
  const [color, setColor] = useState("#C9E8E4");
  const [bookmarkedMessages, setBookmarkedMessages] = useState([]);

  useEffect(() => {
    const fetchBookmarkedMessages = async () => {
      const q = query(
        collection(db, "messages"),
        where("isBookmarked", "==", true)
      );
      const querySnapshot = await getDocs(q);
      let messages = [];
      querySnapshot.forEach((doc) => {
        // Include the document ID in the data
        messages.push({ id: doc.id, ...doc.data() });
      });
      setBookmarkedMessages(messages);
    };

    fetchBookmarkedMessages();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div className="Bookmark">
      <Navbar2 />
      <h1>Bookmarked messages here:</h1>
      {bookmarkedMessages.length > 0 ? (
        bookmarkedMessages.map((message) => (
          <Message key={message.id} data={message} />
        ))
      ) : (
        
          <div key={"no"}>No bookmarked messages</div>
       
       
      )}
      <div className="bLank2"></div>
      <Navbar />
    </div>
  );
};
export default Bookmark;
