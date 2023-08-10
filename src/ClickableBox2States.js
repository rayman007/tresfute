import { useState } from 'react';

export default function ClickableBox2States({info}) {

  const [ticked, setTicked] = useState(0);

  const tickedClass = (ticked === 1 ? " crossed" : "")

  const handleClick = (e) => {
    e.preventDefault();
    const new_ticked = (ticked === 0 ? 1 : 0);
    if (info.checkLegal(info, new_ticked)) {
      setTicked(new_ticked)
      info.setValue(info, new_ticked)
    }
  }
  
  return (
    <div 
       onClick={(e) => handleClick(e)}
       key={info.name}
       className={"box" + tickedClass}
       style={{top: info.py, left: info.px, width: info.w, height: info.h}}></div>
  )
}

