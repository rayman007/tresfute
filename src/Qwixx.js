import './Qwixx.css';

import ClickableBox2States from './ClickableBox2States.js'

import { useState } from 'react';

const red_info = {
  section: "red",
  x: 55, w: 75, mx: 3.7,
  y: 38, h: 75, my: 59,
  nx: 12,  ny: 1,
  avoid: []
}

const yellow_info = {
  section: "yellow",
  x: 55, w: 75, mx: 3.7,
  y: 142, h: 75, my: 59,
  nx: 12,  ny: 1,
  avoid: []
}

const green_info = {
  section: "green",
  x: 55, w: 75, mx: 3.7,
  y: 246, h: 75, my: 59,
  nx: 12,  ny: 1,
  avoid: []
}

const blue_info = {
  section: "blue",
  x: 55, w: 75, mx: 3.7,
  y: 350, h: 75, my: 59,
  nx: 12,  ny: 1,
  avoid: []
}

const fail_info = {
  section: "fail",
  x: 839, w: 30, mx: 13,
  y: 490, h: 39, my: 59,
  nx: 4,  ny: 1,
  avoid: []
}


function Qwixx() {

  const [values, setValues] = useState({
    red: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    yellow: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    green: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    blue: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    fail: [[0, 0, 0, 0]]
  });

  function legalChecker(info, value) {

    const check_mode = false;

    if (check_mode) {
      if (value === 0) {
        return false;
      }
    
      if ((info.section === "red") || (info.section === "yellow") || (info.section === "green") || (info.section === "blue")) {
        for (let i = info.x + 1 ; i < 12 ; i++) {
          if (values[info.section][0][i] !== 0) {
            return false
          }
        }
        return true;
      }
    } else {
      return true;
    }
  }
  
  function count_values_in_color(values, color) {
    let count = 0;
    for (let i = 0 ; i < values[color][0].length ; i++) {
      if (values[color][0][i] !== 0) {
        count++;
      }
    }
    return count;
  }

  function computeScore(values) {
 
    const scores = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78]
    let red_score=scores[count_values_in_color(values, "red")]
    let yellow_score=scores[count_values_in_color(values, "yellow")]
    let green_score=scores[count_values_in_color(values, "green")]
    let blue_score=scores[count_values_in_color(values, "blue")]
    let fail_score=count_values_in_color(values, "fail") * -5

    return {
      red: red_score,
      yellow: yellow_score,
      green: green_score,
      blue: blue_score,
      fail: fail_score,
      total: red_score + yellow_score + green_score + blue_score + fail_score
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
  
  const red_elems = create_elements(red_info);
  const yellow_elems = create_elements(yellow_info);
  const green_elems = create_elements(green_info);
  const blue_elems = create_elements(blue_info);
  const fail_elems = create_elements(fail_info);
  
  const red_map = red_elems.map(info => <ClickableBox2States info={info}/>)
  const yellow_map = yellow_elems.map(info => <ClickableBox2States info={info}/>)
  const green_map = green_elems.map(info => <ClickableBox2States info={info}/>)
  const blue_map = blue_elems.map(info => <ClickableBox2States info={info}/>)
  const fail_map = fail_elems.map(info => <ClickableBox2States info={info}/>)
  
  let scores = computeScore(values)

  return (
    <div className="qwixx">
          <div className="qwixx_board">
          {red_map}
          {yellow_map}
          {green_map}
          {blue_map}
          {fail_map}
          <div className='qwixx_score_box qwixx_red_score'>{scores.red}</div>
          <div className='qwixx_score_box qwixx_yellow_score'>{scores.yellow}</div>
          <div className='qwixx_score_box qwixx_green_score'>{scores.green}</div>
          <div className='qwixx_score_box qwixx_blue_score'>{scores.blue}</div>
          <div className='qwixx_score_box qwixx_gray_score'>{scores.fail}</div>
          <div className='qwixx_score_box qwixx_black_score'>{scores.total}</div>
          </div>
    </div>
  );
}

export default Qwixx;
