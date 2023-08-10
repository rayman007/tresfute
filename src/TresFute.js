import './TresFute.css';

import ClickableBox2States from './ClickableBox2States.js'
import ClickableBox3States from './ClickableBox3States.js'
import ClickableBox6States from './ClickableBox6States.js'
import TresFuteScoreBoard from './TresFuteScoreBoard.js'

import { useState } from 'react';




const turns_info = {
  section: "turns",
  x: 143, w: 48, mx: 51.2,
  y: 26, h: 48, my: 59,
  nx: 6,  ny: 1,
  avoid: []
}

const replay_info = {
  section: "replay",
  x: 218, w: 50, mx: 18,
  y: 153, h: 49, my: 59,
  nx: 7,  ny: 1,
  avoid: []
}

const addone_info = {
  section: "addone",
  x: 218, w: 50, mx: 18,
  y: 262, h: 50, my: 59,
  nx: 7,  ny: 1,
  avoid: []
}

const yellow_info = {
  section: "yellow",
  x: 38, w: 48, mx: 13.8,
  y: 366, h: 48, my: 10.8,
  nx: 4,  ny: 4,
  avoid: [{x: 4, y: 1}, {x: 3, y: 2}, {x: 2, y: 3}, {x: 1, y: 4}]
}

const blue_info = {
  section: "blue",
  x: 386, w: 48, mx: 14,
  y: 432, h: 48, my: 11,
  nx: 4,  ny: 3,
  avoid: [{x: 1, y: 1}]
}

const green_info = {
  section: "green",
  x: 92, w: 47, mx: 7.2,
  y: 720, h: 47, my: 54.5,
  nx: 11,  ny: 1,
  avoid: []
}

const orange_info = {
  section: "orange",
  x: 92, w: 47, mx: 7.2,
  y: 822, h: 37, my: 54.5,
  nx: 11,  ny: 1,
  avoid: []
}

const purple_info = {
  section: "purple",
  x: 92, w: 47, mx: 7.2,
  y: 924, h: 37, my: 54.5,
  nx: 11,  ny: 1,
  avoid: []
}


function TresFute() {

  const [values, setValues] = useState({
    turns: [[0, 0, 0, 0, 0, 0]],
    replay: [[0, 0, 0, 0, 0, 0, 0]],
    addone: [[0, 0, 0, 0, 0, 0, 0]],
    yellow: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    blue: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    green: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    orange: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    purple: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  });

  function legalChecker(info, value) {

    const check_mode = false;

    if (check_mode) {
      if (value === 0) {
        return false;
      }
    
      if ((info.section === "turns") || (info.section === "replay") || (info.section === "addone") || (info.section === "green") || (info.section === "orange") || (info.section === "purple")) {
        if (info.x === 0) {
          return true;
        } else {
          return values[info.section][info.y][info.x - 1] !== 0;
        }
    
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  
  function setValue(info, value) {
    values[info.section][info.y][info.x] = value;
    setValues({...values});
  }
  
  function create_elements(info) {
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
            name: info.section + (i) + (j), 
            section: info.section,
            px: info.x + i * (info.w + info.mx),
            py: info.y + j * (info.h + info.my),
            x: i,
            y: j,
            w: info.w,
            h: info.h,
            checkLegal: legalChecker,
            setValue: setValue
          });
        }
      }
    }
    return r;
  }
  
  const turns_elems = create_elements(turns_info);
  const replay_elems = create_elements(replay_info);
  const addone_elems = create_elements(addone_info);
  const yellow_elems = create_elements(yellow_info);
  const blue_elems = create_elements(blue_info);
  const green_elems = create_elements(green_info);
  const orange_elems = create_elements(orange_info);
  const purple_elems = create_elements(purple_info);
  
  const turns_map = turns_elems.map(info => <ClickableBox2States info={info}/>)
  const replay_map = replay_elems.map(info => <ClickableBox3States info={info}/>)
  const addone_map = addone_elems.map(info => <ClickableBox3States info={info}/>)
  const yellow_map = yellow_elems.map(info => <ClickableBox2States info={info}/>)
  const blue_map = blue_elems.map(info => <ClickableBox2States info={info}/>)
  const green_map = green_elems.map(info => <ClickableBox2States info={info}/>)
  const orange_map = orange_elems.map(info => <ClickableBox6States info={info}/>)
  const purple_map = purple_elems.map(info => <ClickableBox6States info={info}/>)
  
  return (
    <div className="tf">
          <TresFuteScoreBoard values={values} />
          <div className="tf_board">
          {turns_map}
          {replay_map}
          {addone_map}
          {yellow_map}
          {blue_map}
          {green_map}
          {orange_map}
          {purple_map}
          </div>
    </div>
  );
}

export default TresFute;
