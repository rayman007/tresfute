import './ClickableBoxes.css';

import { useState } from 'react';
import { useRef } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ClickableBoxNStates({info}) {
  
  const ref = useRef(null);
  const [value, setValue] = useState(info.info.default_value);

  const handleClick = (e, value) => {
    e.preventDefault();
    if (info.checkLegal(info, value)) {
      setValue(value);
      info.setValue(info, value);
      ref.current.close()
    }
  }
  const buttons = info.info.states.map((state) => <button class="numbers" onClick={(e) => {handleClick(e, state.v)}}>{state.t}</button>)

  return (
    <Popup
      ref={ref}
      trigger={
        <div 
          key={info.name}
          className={"box" + (value === info.info.default_value ? "" : " numbers")}
          style={{top: info.py, left: info.px, width: info.w, height: info.h, lineHeight: info.h + "px", background: info.info.bgcolor}}>{value === 0 ? "" : value}</div>
      }
      modal
      closeOnDocumentClick
      >
        {close => (
          <div>
            {buttons}
        </div>
        )}
      </Popup>
  )
}
