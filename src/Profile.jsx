import { useState, useEffect } from "react";
import Navbar from "./nav";
import { useRef } from "react";
import pic from "./assets/4794936.png";
import pic2 from "./assets/logout.png";
import { auth, storage } from "./firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setDisplayName(currentUser.displayName || "");
        setUrl(currentUser.photoURL || "");
        console.log(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      updateProfile(user, { displayName: displayName })
        .then(() => {
          alert("Profile updated");

          if (password) {
            updatePassword(user, password)
              .then(() => {
                alert("Password updated");
                setPassword("");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [color, setColor] = useState("#C9E8E4");
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const handleUpload = () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("Upload error: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);

          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              alert("Profile picture updated");
            })
            .catch((error) => {
              console.log("Error updating profile picture: ", error);
            });
        });
      }
    );
  };

  return (
    <div className="Profile">
      <div className="aVa" onClick={handleImageClick}>
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="img-display-after"
              id="image"
            />
            <button onClick={handleUpload}>Upload</button>
          </>
        ) : (
          <img
            onClick={handleImageClick}
            src={url ? url : pic}
            alt=""
            className="img-display-before img-display-after"
          />
        )}

        <input
          type="file"
          name=""
          id=""
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <form
        className="profForm"
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(!isEditing);
          {
            isEditing ? handleSubmit : null;
          }
        }}
      >
        <label>
          {""}
          {isEditing ? (
            <input
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          ) : (
            <div className="BoxName">
              <b style={{ fontSize: "30px" }}>{displayName}</b>
            </div>
          )}
        </label>
      </form>
      <form
        className="profForm"
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(!isEditing);
          {
            isEditing ? handleSubmit : null;
          }
        }}
      >
        <label>
          {""}
          {isEditing ? (
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          ) : (
            <div className="BoxName">
              <b style={{ fontSize: "30px" }}>{password}</b>
            </div>
          )}
        </label>
        <br />
        <button type="submit">{isEditing ? "Save" : "Edit"} </button>
      </form>
      <form action="greating">
        <button type="submit" style={{ backgroundColor: "transparent" }}>
          <img src={pic2} alt="" />
        </button>
      </form>
      <br />

      <Navbar />
    </div>
  );
};
export default Profile;
