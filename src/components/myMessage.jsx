import imgUrl from '../assets/person.png'
import imgUrl2 from '../assets/Group16.png'
import imgUrl7 from '../assets/Vector4.png'
import imgUrl8 from '../assets/Vector5.png'
import imgUrl9 from '../assets/me1.png'
import imgUrl6 from '../assets/Vector3.png'
import { useState } from 'react';
const Mymessage = () => {
    const [isVisible, setIsVisible] = useState(false); 
 
  const handleToggleVisibility = () => { 
    setIsVisible(!isVisible); 
  };


    return (
        <div className="myMessageBox" id='M001'>
            <div className='topSide'>
               
                <div className="textSide">
                    <div className="userName">Amir</div>
                    <div className="textZone">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, facere?</div>
                    
                </div>
                <div className="userSide">
                    <img src={imgUrl9} alt="" />
                </div>
            </div>
            <div className="buttomSide">
                <div className="textMenu"><img src={imgUrl2} alt="" onClick={handleToggleVisibility} /></div>
                {isVisible ? (
                <div className="textFunctions">
                <img src={imgUrl8} alt="" />
                <img src={imgUrl7} alt="" />
                </div>) : ""}
            </div>

        </div>
    )
}
export default Mymessage;