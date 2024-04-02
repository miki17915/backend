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
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <img src={imgUrl} alt="" />
            <h1 className='h1'>Sign up</h1>
            <img src={imgUrl2} alt="" />
            <div className="set">
                {/* <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }} // Make the file input element invisible
                /> */}
                <input type="file" onChange={handleChange} style={{ display: 'none' }} name='img' id='img' />
                <img src={file} />
                <label htmlFor="img"><button className="button-upload" type='submit' >
                    Upload a file
                </button></label>
            </div>

            <form action="home">
                <button type="submit">Sign up</button>
            </form>



        </div>

    )
}
export default Signup2;