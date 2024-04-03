import { useState, useEffect } from 'react'
import imgUrl from './assets/welc.png'
import imgUrl2 from './assets/Vector.png'
import { useRef } from 'react';

const Signup2 = () => {
    const [color, setColor] = useState('#C9E8E4')
    const click = color => {
        setColor(color)
    }
    /* This is where we actually
       change background color */
    useEffect(() => {
        document.body.style.backgroundColor = color
    }, [color])
    const [file, setFile] = useState();
    function handleChange(e) {
        // Обновляем переменную file с помощью setFile
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [image, setImage] = useState("");
    const inputRef = useRef(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        // Обновляем переменную image с помощью setImage
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <img src={imgUrl} alt="" />
            <h1 className='h1'>Sign up</h1>
           
            <div className="set">
                <input type="file" onChange={handleChange} style={{ display: 'none' }} name='img' id='img' ref={inputRef} />
                <div className="circular-image-container">
                    {file && <img className="circular-image" src={file} alt="uploaded" />}
                </div>
                <button className="button-upload" type='button' onClick={handleImageClick}>
                    Upload a file
                </button>
            </div>
            <form action="home">
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
    
}

export default Signup2;
