import { useState, useEffect } from 'react'
import Navbar from './nav';
import Navbar2 from './nav2';   
import Message from './components/message';

const Bookmark = () => {

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
        <div className="Bookmark">
            <Navbar2 />
            <h1>hello 🥶</h1>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <div className="bLank2">

        </div>
            <Navbar />
        </div>

    )
}
export default Bookmark;