import { useState } from 'react';

export default function ClickableBox3States({name, x, y, w, h}) {
  
  const [ticked, setTicked] = useState(0);

  let tickedClass;
  switch(ticked) { 
    case 1:
      tickedClass = " dotted";
      break;
    case 2:
      tickedClass = " dotted_crossed";
      break;
    default:
      tickedClass = ""
      break;
  }

  const handleClick = (e) => {
    e.preventDefault();
    setTicked((ticked + 1) % 3);
  }
  
  return (
    <div 
       onClick={(e) => handleClick(e)}
       name={name}
       className={"box" + tickedClass}
       style={{top: y, left: x, width: w, height: h}}></div>
  )
}

