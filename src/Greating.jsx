import imgUrl from './assets/welc.png'
import { useState, useEffect } from 'react'


const Greating = () => {
  const [color, setColor] = useState("#6A32B2")
  const click = color => {
    setColor(color)
  }
  /* This is where we actually
     change background color */
  useEffect(() => {
    document.body.style.backgroundColor = color
  }, [color])
  /* Display clickable
      button */

  return (
    <div>
      <img src={imgUrl} alt="" />
      <h1>Welcome</h1>
      <div className="buttonBox">
        <form action="Login">
          <button>Log In</button>
        </form>
        <form action="Signup">
          <button>Sign up</button>
        </form>
      </div>
      <div className="App">

      </div>
    </div>
  )
}
export default Greating;