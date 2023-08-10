import './ClickableBoxes.css';

import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ClickableBox6States({info}) {
  
  const [value, setValue] = useState(0);

  const handleClick = (e, value) => {
    e.preventDefault();
    if (info.checkLegal(info, value)) {
      setValue(value);
      info.setValue(info, value)
    }
  }
  
  return (
    <Popup
      trigger={
        <div 
          key={info.name}
          className={"box" + (value === 0 ? "" : " numbers")}
          style={{top: info.py, left: info.px, width: info.w, height: info.h}}>{value === 0 ? "" : value}</div>
      }
      modal
      nested
      closeOnDocumentClick
      >
        {close => (
          <div>
        <button class="numbers" onClick={(e) => handleClick(e, 1)}>1</button>
        <button class="numbers" onClick={(e) => handleClick(e, 2)}>2</button>
        <button class="numbers" onClick={(e) => handleClick(e, 3)}>3</button>
        <button class="numbers" onClick={(e) => handleClick(e, 4)}>4</button>
        <button class="numbers" onClick={(e) => handleClick(e, 5)}>5</button>
        <button class="numbers" onClick={(e) => handleClick(e, 6)}>6</button>
        <button class="numbers" onClick={(e) => handleClick(e, 0)}>Cancel</button>
        </div>
        )}
      </Popup>
  )
}
