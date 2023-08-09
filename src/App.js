import './App.css';

import ClickableBox2States from './ClickableBox2States.js'
import ClickableBox3States from './ClickableBox3States.js'
import ClickableBox6States from './ClickableBox6States.js'

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

const turns_info = {
  x: 143, w: 48, mx: 51.2,
  y: 26, h: 48, my: 59,
  nx: 6,  ny: 1,
  avoid: []
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

const turns_elems = create_elements(turns_info, "bonus");
const bonus_elems = create_elements(bonus_info, "bonus");
const yellow_elems = create_elements(yellow_info, "yellow");
const blue_elems = create_elements(blue_info, "blue");
const green_elems = create_elements(green_info, "green");
const op_elems = create_elements(op_info, "op");


function App() {

  const turns_map = turns_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const bonus_map = bonus_elems.map(b => <ClickableBox3States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const yellow_map = yellow_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const blue_map = blue_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const green_map = green_elems.map(b => <ClickableBox2States x={b.x} y={b.y} w={b.w} h={b.h}/>)
  const op_map = op_elems.map(b => <ClickableBox6States x={b.x} y={b.y} w={b.w} h={b.h}/>)

  return (
    <div className="tf">
          <div className="tf_board">
          {turns_map}
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
