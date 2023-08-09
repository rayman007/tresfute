import { useState } from 'react';

export default function ClickableBox2States({name, x, y, w, h}) {
  
  const [ticked, setTicked] = useState(false);

  const tickedClass = (ticked ? " crossed" : "")

  const handleClick = (e) => {
    e.preventDefault();
    if (ticked) {
      setTicked(false);
    } else {
      setTicked(true);
    }
  }
  
  return (
    <div 
       onClick={(e) => handleClick(e)}
       key={name}
       className={"box" + tickedClass}
       style={{top: y, left: x, width: w, height: h}}></div>
  )
}

