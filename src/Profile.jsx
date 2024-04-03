import { useState, useEffect } from 'react'
import Navbar from './nav';
import { useRef } from 'react';
import pic from './assets/me2.png'
import pic2 from './assets/logout.png'

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("Amirbek");
    const [Password, setPassword] = useState("@nhdhbsgdgb");
    const asteriskString = '*'.repeat(Password.length);
    const [image, setImage] = useState("");
    const inputRef = useRef(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
    };



    const [color, setColor] = useState('#C9E8E4')
    const click = color => {
        setColor(color)
    }
    /* This is where we actually
       change background color */
    useEffect(() => {
        document.body.style.backgroundColor = color
    }, [color])

    return (
        <div className="Profile">
            <div className="aVa" onClick={handleImageClick}>
                {image ? <img src={URL.createObjectURL(image)} alt="" className="img-display-after circular-image2" id="image" /> : <img src={pic} alt="" className="img-display-before" />}

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
                }}
            >
                <label>
                    {""}
                    {isEditing ? (

                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    ) : (
                        <div className="BoxName">
                            <b style={{ fontSize: "30px" }}>{firstName}</b></div>
                    )}
                </label>

            </form>
            <form
                className="profForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsEditing(!isEditing);
                }}
            >
                <label>
                    {""}
                    {isEditing ? (
                        <input
                            type="text"
                            value={Password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    ) : (
                        <div className="BoxName">
                            <b style={{ fontSize: "30px" }}>{Password}</b></div>
                    )}
                </label><br />
                <button type="submit">{isEditing ? "Safe" : "Refresh"} </button>
            </form>
            <form action="greating">
                <button type="submit" style={{ backgroundColor: 'transparent' }}><img src={pic2} alt="" /></button>
            </form><br />

            <Navbar />
        </div>

    )
}
export default Profile;