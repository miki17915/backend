import imgUrl from '../assets/person.png';
import imgUrl2 from '../assets/Group16.png';
import imgUrl3 from '../assets/Group161.png';
import imgUrl4 from '../assets/Vector1.png';
import imgUrl5 from '../assets/Vector2.png';
import imgUrl6 from '../assets/Vector3.png';
import { useState } from 'react';

const Message = ({ replyHandle }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isColor, setIsColor] = useState("white");
    const [isReplying, setIsReplying] = useState(false);

    const handleReply = () => {
        // Perform the reply action here
        setIsReplying(!isReplying)
    };

    const [isColor2, setIsColor2] = useState("white");

    const handleClickColor2 = () => {
        isColor2 === "white" ?
            setIsColor2("black") : setIsColor2("white")

    };
    const [isColor3, setIsColor3] = useState("white");

    const handleClickColor3 = () => {
        isColor3 === "white" ?
            setIsColor3("yellow") : setIsColor3("white")
    }

    const handleClickColor = () => {
        isColor === "white" ? setIsColor("red") : setIsColor("white");
    };

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div className="messageBox" id='M001'>
            <div className='topSide'>
                <div className="userSide">
                    <img src={imgUrl} alt="" />
                </div>
                <div className="textSide">
                    <div className="userName">Amir</div>
                    <div className="textZone">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, facere?</div>
                    <div className="reply">
                        <svg id='reply' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                            // onClick={handleClickColor} 

                            onClick={() => {
                                replyHandle('Lorem ipsum dolor, sit amet consectetur adipisicing elit.');
                                handleReply();
                            }}>
                            <path d="M16 14V10C16 9.16667 15.7083 8.45833 15.125 7.875C14.5417 7.29167 13.8333 7 13 7H3.825L7.425 10.6L6 12L0 6L6 0L7.425 1.4L3.825 5H13C14.3833 5 15.5625 5.4875 16.5375 6.4625C17.5125 7.4375 18 8.61667 18 10V14H16Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="buttomSide">
                <div className="textMenu"><img src={imgUrl2} alt="" onClick={handleToggleVisibility} /></div>
                {isVisible ? (
                    <div className="textFunctions">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="30" onClick={handleToggleVisibility}><path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm4.707,15.293-1.414,1.414L12,13.414,8.707,16.707,7.293,15.293,10.586,12,7.293,8.707,8.707,7.293,12,10.586l3.293-3.293,1.414,1.414L13.414,12Z" /></svg>


                        <svg onClick={handleClickColor} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="27"><path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" fill={isColor} stroke='black' /></svg>


                        <svg onClick={handleClickColor2} xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="20" height="30"><path d="M2.849,23.55a2.954,2.954,0,0,0,3.266-.644L12,17.053l5.885,5.853a2.956,2.956,0,0,0,2.1.881,3.05,3.05,0,0,0,1.17-.237A2.953,2.953,0,0,0,23,20.779V5a5.006,5.006,0,0,0-5-5H6A5.006,5.006,0,0,0,1,5V20.779A2.953,2.953,0,0,0,2.849,23.55Z" fill={isColor2} stroke='black' /></svg>
                        <svg onClick={handleClickColor3} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="23" height="29"><path d="M6,3H3A3,3,0,0,0,0,6v8a3,3,0,0,0,3,3H6Z" /><path d="M24,14,22,3H8V17l2.341,4.681a2.3,2.3,0,0,0,1.475,1.251,2.216,2.216,0,0,0,2.759-2.482L14,17H24Z" fill={isColor3} stroke='black' /></svg>


                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Message;
