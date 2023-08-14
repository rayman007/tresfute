import './ClickableBoxes.css';

import { useState } from 'react';

export default function ClickableBox3States({info}) {
  
  const [ticked, setTicked] = useState(0);

  let tickedClass;
  switch(ticked) { 
    case 1:
      tickedClass = info.info.state1_class;
      break;
    case 2:
      tickedClass = info.info.state2_class;
      break;
    default:
      tickedClass = ""
      break;
  }

  const handleClick = (e) => {
    e.preventDefault();
    const new_ticked = (ticked + 1) % 3
    if (info.checkLegal(info, new_ticked)) {
      setTicked(new_ticked);
      info.setValue(info, new_ticked)
    }
  }
  
  return (
    <div 
       onClick={(e) => handleClick(e)}
       key={info.name}
       className={"box " + tickedClass}
       style={{top: info.py, left: info.px, width: info.w, height: info.h}}></div>
  )
}

