import { useState, useEffect } from 'react'
import imgUrl from './assets/welc.png'


const Login = () => {
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
        <div>
            <img src={imgUrl} alt="" />
            <h1>login</h1>
            <div className="loginForm">
                <div>
                    <input type='text' className='input' placeholder='Nick Name' />
                </div>
                <div className="line"></div>

                <div>
                    <input type='password' className='input' placeholder='Password' />
                </div>
                <div className='a'>
                    <a href="#">Forgot password?</a>
                </div>
                <form action="Home">
            <button type="submit">Log in</button>
            </form>

            </div>
        </div>
    )
}
export default Login;