import { useState, useEffect } from 'react'
import imgUrl from './assets/welc.png'



const Signup = () => {
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
      <h1>Sign up</h1>
      <div className="liginForm">
        <div className=''>
          <input type='text' className='input' placeholder='Full Name' />
        </div>
        <div className="line"></div>
        <div>
          <input type='text' className='input' placeholder='Nick Name' />
        </div>
        <div className="line"></div>
        <div>
          <input type='mail' className='input' placeholder='E-mail' />
        </div>
        <div className="line"></div>
        <div>
          <input type='password' className='input' placeholder='Password' />
        </div>
        <div className="line"></div>
        <div>
          <input type='password' className='input' placeholder='Confirm Password' />
        </div>
        <form action="Signup2">
          <button type="submit">Continue</button>
        </form>

      </div>
    </div>
  )
}
export default Signup;