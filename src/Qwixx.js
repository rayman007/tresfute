import './Qwixx.css';
import create_all_elements from './Qwixx_data.js';

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


  let boxes = create_all_elements(legalChecker, setValue);

  let scores = computeScore(values)

  return (
    <div className="qwixx">
          <div className="qwixx_board">
          {boxes}
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
