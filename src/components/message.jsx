import imgUrl from '../assets/person.png'
import imgUrl2 from '../assets/Group16.png'
import imgUrl3 from '../assets/Group161.png'
import imgUrl4 from '../assets/Vector1.png'
import imgUrl5 from '../assets/Vector2.png'
import imgUrl6 from '../assets/Vector3.png'
import { useState } from 'react';
const Message = () => {
    const [isVisible, setIsVisible] = useState(false); 
 
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

                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 14V10C16 9.16667 15.7083 8.45833 15.125 7.875C14.5417 7.29167 13.8333 7 13 7H3.825L7.425 10.6L6 12L0 6L6 0L7.425 1.4L3.825 5H13C14.3833 5 15.5625 5.4875 16.5375 6.4625C17.5125 7.4375 18 8.61667 18 10V14H16Z" fill="white" />
                        </svg>

                    </div>
                </div>

            </div>
            <div className="buttomSide">
                <div className="textMenu"><img src={imgUrl2} alt="" onClick={handleToggleVisibility} /></div>
                {isVisible ? (
                <div className="textFunctions">
                <img src={imgUrl3} alt="" />
                <img src={imgUrl4} alt="" />
                <img src={imgUrl5} alt="" />
                <img src={imgUrl6} alt="" />
                </div>) : ""}
            </div>

        </div>
    )
}
export default Message;