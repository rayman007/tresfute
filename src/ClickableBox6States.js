import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ClickableBox6States({name, x, y, w, h}) {
  
  const [value, setValue] = useState(0);

  const handleClick = (e, v) => {
    e.preventDefault();
    setValue(v);
  }
  
  return (
    <Popup
      trigger={
        <div 
          name={name}
          className={"box" + (value === 0 ? "" : " numbers")}
          style={{top: y, left: x, width: w, height: h}}>{value === 0 ? "" : value}</div>
      }
      modal
      nested
      closeOnDocumentClick
      >
        {close => (
          <div>
        <button onClick={(e) => handleClick(e, 1)}>1</button>
        <button onClick={(e) => handleClick(e, 2)}>2</button>
        <button onClick={(e) => handleClick(e, 3)}>3</button>
        <button onClick={(e) => handleClick(e, 4)}>4</button>
        <button onClick={(e) => handleClick(e, 5)}>5</button>
        <button onClick={(e) => handleClick(e, 6)}>6</button>
        <button onClick={(e) => handleClick(e, 0)}>Cancel</button>
        </div>
        )}
      </Popup>
  )
}
