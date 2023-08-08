import './App.css';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function create_elements(info, basename) {
  let r = [];
  for (let j = 0 ; j < info.ny ; j++) {
    for (let i = 0 ; i < info.nx ; i++) {
      let ok = true
      for (let k = 0 ; k < info.avoid.length ; k++) {
        if (info.avoid[k].x === (i+1) && info.avoid[k].y === (j+1)) {
          ok = false
        }
      }
      if (ok) {
        r.push({
          name: basename + (i+1) + (j+1), 
          x: info.x + i * (info.w + info.mx),
          y: info.y + j * (info.h + info.my),
          w: info.w,
          h: info.h
        });
      }
    }
  }
  return r;
}

const bonus_info = {
  x: 218, w: 50, mx: 18,
  y: 153, h: 50, my: 59,
  nx: 7,  ny: 2,
  avoid: []
}

const yellow_info = {
  x: 38, w: 48, mx: 13.8,
  y: 366, h: 48, my: 10.8,
  nx: 4,  ny: 4,
  avoid: [{x: 4, y: 1}, {x: 3, y: 2}, {x: 2, y: 3}, {x: 1, y: 4}]
}

const blue_info = {
  x: 386, w: 48, mx: 14,
  y: 432, h: 48, my: 11,
  nx: 4,  ny: 3,
  avoid: [{x: 1, y: 1}]
}

const green_info = {
  x: 92, w: 47, mx: 7.2,
  y: 720, h: 47, my: 54.5,
  nx: 11,  ny: 1,
  avoid: []
}

const op_info = {
  x: 92, w: 47, mx: 7.2,
  y: 820, h: 47, my: 54.5,
  nx: 11,  ny: 2,
  avoid: []
}

const bonus_elems = create_elements(bonus_info, "bonus");
const yellow_elems = create_elements(yellow_info, "yellow");
const blue_elems = create_elements(blue_info, "blue");
const green_elems = create_elements(green_info, "green");
const op_elems = create_elements(op_info, "op");

function ClickableBox2States({name, x, y, w, h}) {
  
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

function ClickableBox3States({name, x, y, w, h}) {
  
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

function ClickableBox6States({name, x, y, w, h}) {
  
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

function App() {

  const bonus_map = bonus_elems.map(b => <ClickableBox3States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const yellow_map = yellow_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const blue_map = blue_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const green_map = green_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const op_map = op_elems.map(b => <ClickableBox6States x={b.x} y={b.y} w={b.w} h={b.h}/>)

  return (
    <div className="tf">
          <div className="tf_board">
          {bonus_map}
          {yellow_map}
          {blue_map}
          {green_map}
          {op_map}
          </div>
    </div>
  );
}

export default App;
