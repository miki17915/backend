import imgUrl2 from "../assets/Group16.png";
import imgUrl7 from "../assets/Vector4.png";
import imgUrl8 from "../assets/Vector5.png";
import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const Message = ({ data, setBookmarkedMessages }) => {
  const { user, content, time, isLiked, isBookmarked } = data;
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isColor, setIsColor] = useState("white");
  const [isColor2, setIsColor2] = useState("white");
  const [photoURL, setPhotoURL] = useState(data.photoUrl);
  const [isLikedTrue, setIsLikedTrue] = useState(isLiked);
  const [isBookmarkedTrue, setIsBookmarkedTrue] = useState(isBookmarked);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
  useEffect(() => {
    if (isBookmarked == true) {
      setIsColor2("black");
    }
  }, [isBookmarked]);
  useEffect(() => {
    if (isLiked == true) {
      setIsColor("red");
    }
  }, [isLiked]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleToggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };

  const handleLikeClick = async () => {
    const messageRef = doc(db, "messages", data.id);
    const newLikedState = !isLikedTrue;
    setIsLikedTrue(newLikedState);
    await updateDoc(messageRef, {
      isLiked: newLikedState,
    });
    isColor === "white" ? setIsColor("red") : setIsColor("white");
  };
  const handleBookmarkClick = async () => {
    const messageRef = doc(db, "messages", data.id);

    const newBookmarkState = !isBookmarked;
    setIsBookmarkedTrue(newBookmarkState);
    await updateDoc(messageRef, {
      isBookmarked: newBookmarkState,
    });
    isColor2 === "white" ? setIsColor2("black") : setIsColor2("white");
  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
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

  const handleDelete = async (commentId) => {
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

const handleEdit = (commentId) => {
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
    <div className="messageBox" id="M001">
      <div className="topSide">
        <div className="userSide">
          {photoURL && <img src={photoURL} alt="User" />}
        </div>
        <div className="textSide">
          <div className="userName">{user}</div>
          <div className="textZone">{content}</div>
          <div className="reply" onClick={handleComment}>
            <svg
              id="reply"
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 14V10C16 9.16667 15.7083 8.45833 15.125 7.875C14.5417 7.29167 13.8333 7 13 7H3.825L7.425 10.6L6 12L0 6L6 0L7.425 1.4L3.825 5H13C14.3833 5 15.5625 5.4875 16.5375 6.4625C17.5125 7.4375 18 8.61667 18 10V14H16Z"
                fill="white"
              />
            </svg>
          </div>
          {isCommenting && (
            <form onSubmit={handleSubmitComment}>
              <input
                type="text"
                value={comment}
                onChange={handleInputChange}
                className="newComment"
                
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
      <div className="buttomSide">
        <div className="textMenu">
          <img src={imgUrl2} alt="" onClick={handleToggleVisibility} />
        </div>
        {isVisible ? (
          <div className="textFunctions">
            <div className="like" onClick={handleLikeClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="27"
              >
                <path
                  d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z"
                  fill={isColor}
                  stroke="black"
                />
              </svg>
            </div>

            <svg
              onClick={handleBookmarkClick}
              xmlns="http://www.w3.org/2000/svg"
              id="Filled"
              viewBox="0 0 24 24"
              width="20"
              height="30"
            >
              <path
                d="M2.849,23.55a2.954,2.954,0,0,0,3.266-.644L12,17.053l5.885,5.853a2.956,2.956,0,0,0,2.1.881,3.05,3.05,0,0,0,1.17-.237A2.953,2.953,0,0,0,23,20.779V5a5.006,5.006,0,0,0-5-5H6A5.006,5.006,0,0,0,1,5V20.779A2.953,2.953,0,0,0,2.849,23.55Z"
                fill={isColor2}
                stroke="black"
              />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="comments">
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
                      onClick={() => handleDelete(comment.id)}
                    />
                    <img src={imgUrl7} alt="change" onClick={() => handleEdit(comment.id)} />
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

export default Message;
