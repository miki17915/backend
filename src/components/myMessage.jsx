import imgUrl2 from "../assets/Group16.png";
import imgUrl7 from "../assets/Vector4.png";
import imgUrl8 from "../assets/Vector5.png";
import { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
const Mymessage = ({ data, setMessages }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, content, time, isLiked, isBookmarked } = data;
  const [photoURL, setPhotoURL] = useState(data.photoUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(content);
  const [comments, setComments] = useState([]);



  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [isVisible1, setIsVisible1] = useState(false);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const messageRef = doc(db, "messages", data.id);
      const commentsCollection = collection(messageRef, "comments");
      const commentSnapshots = await getDocs(commentsCollection);
      const commentData = commentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentData);
    };

    fetchComments();
  }, [data.id]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleToggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };


  const handleDelete = async () => {
    try {
      const docRef = doc(db, "messages", data.id);
      await deleteDoc(docRef);
      setMessages((oldMessages) =>
        oldMessages.filter((message) => message.id !== data.id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const docRef = doc(db, "messages", data.id);
        await updateDoc(docRef, { content: newMessage });
        setMessages((oldMessages) =>
          oldMessages.map((message) => {
            if (message.id === data.id) {
              return { ...message, content: newMessage };
            } else {
              return message;
            }
          })
        );
      } catch (error) {
        console.error("Error updating message:", error);
      }
    }
    setIsEditing(!isEditing);
  };



  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    const messageRef = doc(db, "messages", data.id);
    const commentsCollection = collection(messageRef, "comments");
    const newCommentData = {
      user: getAuth().currentUser.displayName,
      content: comment,
    };
    const docRef = await addDoc(commentsCollection, newCommentData);
    setComment("");
    setComments([...comments, { id: docRef.id, ...newCommentData }]);
    setIsCommenting(false);
  };

  const handleDelete1 = async (commentId) => {
    if (data && data.id && commentId) {
      const commentRef = doc(db, "messages", data.id, "comments", commentId);
      await deleteDoc(commentRef);
      setComments((oldComments) =>
        oldComments.filter((comment) => comment.id !== commentId)
      );
    } else {
      console.error("data, data.id, or commentId is undefined");
    }
  };
  const handleEdit1 = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setIsEditing(!isEditing);
    setEditComment(commentToEdit.content);
  };
  
  const handleSave = async (commentId) => {
    console.log('commentId:', commentId); 
    const commentRef = doc(db, "messages", data.id, "comments", commentId);
    await updateDoc(commentRef, { content: editComment });
    setComments((prevComments) =>
    prevComments.map((comment) =>
      comment.id === commentId ? { ...comment, content: editComment } : comment
    )
  );
    setIsEditing(false);
  };



  return (
    <div className="myMessageBox" id="M001">
      <div className="topSide">
        <div className="textSide">
          <div className="userName">{user}</div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="editInput"
              />
              <button onClick={handleEdit}>submit</button>
            </>
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="userSide">
          {photoURL && <img src={photoURL} alt="User" />}
        </div>
      </div>
      <div className="buttomSide">
        <div className="textMenu">
          <img src={imgUrl2} alt="" onClick={handleToggleVisibility} />
        </div>
        {isVisible ? (
          <div className="textFunctions">
            <img src={imgUrl8} alt="delete" onClick={handleDelete} />
            <img src={imgUrl7} alt="change" onClick={handleEdit} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="comments commentedMe">
        {comments.length > 0 && <h3>Comments:</h3>}

        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="comment">
              <div className="userName">{comment.user}</div>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="editInput"
                  />
                 <button onClick={() => handleSave(comment.id)}>Save</button>
                </div>
              ) : (
                <div className="content">{comment.content}</div>
              )}
             
              <div className="functions">
                
                <div className="textMenu">
                  <img src={imgUrl2} alt="" onClick={handleToggleVisibility1} />
                </div>
                {isVisible1 ? (
                  <div className="textFunctions commentFunctions">
                    <img
                      src={imgUrl8}
                      alt="delete"
                      onClick={() => handleDelete1(comment.id)}
                    />
                    <img src={imgUrl7} alt="change" onClick={() => handleEdit1(comment.id)} />
                  </div>
                ) : (
                  ""
                )}
               
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Mymessage;
