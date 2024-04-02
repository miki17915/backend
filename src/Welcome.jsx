import imgUrl from './assets/welc.png'
import LogIn from './Greating'
import { useState, useEffect } from 'react'
// document.getElementById('hero-img').src = imgUrl

const Welcome = () => {
    const [color, setColor] = useState('#6A32B2');
    const click = color => {
        setColor(color)
    }
    /* This is where we actually
       change background color */
    useEffect(() => {
        document.body.style.backgroundColor = color
    }, [color])
    return (
        <div className="welcome">
            <img src={imgUrl} alt=""  />
            <h1>Hello</h1>
            <form action="Greating">
            <button type="submit">Get started</button>
            </form>

        </div>
    )
}
export default Welcome