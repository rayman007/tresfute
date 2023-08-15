import './Qwixx.css';
import CaptionBox from './CaptionBox.js';
import ClickableBox2States from './ClickableBox2States.js'
import create_all_elements from './helpers.js';

import { useState } from 'react';

function Qwixx() {
  
  const [values, setValues] = useState({
    red: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    yellow: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    green: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    blue: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    fail: [[0, 0, 0, 0]]
  });
  
  function setValue(info, value) {
    values[info.section][info.y][info.x] = value;
    setValues({...values});
  }
  
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
    let fail_score=count_values_in_color(values, "fail") * 5
    
    return {
      red: red_score,
      yellow: yellow_score,
      green: green_score,
      blue: blue_score,
      fail: fail_score,
      total: red_score + yellow_score + green_score + blue_score - fail_score
    }
  }
  
  let scores = computeScore(values)

  const all_info = [
    
    {    
      comp: ClickableBox2States,
      section: "red",
      x: 55, w: 75, mx: 3.7,
      y: 38, h: 75, my: 59,
      nx: 12,  ny: 1,
      avoid: []
    },
    
    {
      comp: ClickableBox2States,
      section: "yellow",
      x: 55, w: 75, mx: 3.7,
      y: 142, h: 75, my: 59,
      nx: 12,  ny: 1,
      avoid: []
    },
    
    {
      comp: ClickableBox2States,
      section: "green",
      x: 55, w: 75, mx: 3.7,
      y: 246, h: 75, my: 59,
      nx: 12,  ny: 1,
      avoid: []
    },
    
    {
      comp: ClickableBox2States,
      section: "blue",
      x: 55, w: 75, mx: 3.7,
      y: 350, h: 75, my: 59,
      nx: 12,  ny: 1,
      avoid: []
    },
    
    {
      comp: ClickableBox2States,
      section: "fail",
      x: 839, w: 30, mx: 13,
      y: 490, h: 39, my: 59,
      nx: 4,  ny: 1,
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "scores",
      x: 121, w: 70, mx: 51,
      y: 550, h: 70, my: 80,
      nx: 4,  ny: 1,
      value: "0",
      fsize: "40px",
      values: [[scores.red, scores.yellow, scores.green, scores.blue]],
      color: [["red", "gold", "green", "blue", "gray", "black"]],
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "scores2",
      x: 631, w: 70, mx: 91,
      y: 550, h: 70, my: 80,
      nx: 2,  ny: 1,
      value: "0",
      fsize: "40px",
      values: [[scores.fail, scores.total]],
      color: [["gray", "black"]],
      avoid: []
    },
];
  
  let boxes = create_all_elements(all_info, legalChecker, setValue);

  return (
    <div className="qwixx">
      <div className="qwixx_board">
        {boxes}
      </div>
    </div>
    );
  }
  
  export default Qwixx;
