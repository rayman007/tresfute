import './Qwinto.css';
import ClickableBoxNStates from './ClickableBoxNStates.js'
import create_all_elements from './helpers.js';

import { useState } from 'react';
import ClickableBox2States from './ClickableBox2States';

function Qwinto() {
  
  const popup_states = [
    {t: "1", v: 1}, {t: "2", v: 2}, {t: "3", v: 3}, {t: "4", v: 4}, {t: "5", v: 5}, {t: "6", v: 6}, 
    {t: "7", v: 7}, {t: "8", v: 8}, {t: "9", v: 9}, {t: "10", v: 10}, {t: "11", v: 11}, {t: "12", v: 12}, 
    {t: "13", v: 13}, {t: "14", v: 14}, {t: "15", v: 15}, {t: "16", v: 16}, {t: "17", v: 17}, {t: "18", v: 18}, 
    {t: "Cancel", v: 0}
  ]

  const all_info = [
    
    {    
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "red",
      x: 192, w: 79, mx: 1,
      y: 50, h: 74, my: 59,
      nx: 10,  ny: 1,
      avoid: [{x: 4, y: 1}]
    },
    
    {    
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "yellow",
      x: 112, w: 79, mx: 1,
      y: 145, h: 74, my: 59,
      nx: 10,  ny: 1,
      avoid: [{x: 6, y: 1}]
    },
    
    {    
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "blue",
      x: 32, w: 79, mx: 1,
      y: 240, h: 74, my: 59,
      nx: 10,  ny: 1,
      avoid: [{x: 5, y: 1}]
    },
    
    {    
      comp: ClickableBox2States,
      section: "fail",
      x: 358, w: 66, mx: 14,
      y: 343, h: 63, my: 59,
      nx: 4,  ny: 1,
      avoid: []
    },
  ];
  
  const [values, setValues] = useState({
    red: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    yellow: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
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
      return true;
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
    let color_score = {}
    for (let c of ["red", "yellow", "blue"]) {
      let tmp_score = 0;
      if (count_values_in_color(values, c) === 9) {
        tmp_score = values[c][0][9];
      } else {
        tmp_score = count_values_in_color(values, c)
      }
      color_score[c] = tmp_score;
    }

    let col1_score = (values["red"][0][0] !== 0 && values["yellow"][0][1] !== 0 && values["blue"][0][2] !== 0 ? values["blue"][0][2] : 0)
    let col2_score = (values["red"][0][1] !== 0 && values["yellow"][0][2] !== 0 && values["blue"][0][3] !== 0 ? values["red"][0][1] : 0)
    let col3_score = (values["red"][0][5] !== 0 && values["yellow"][0][6] !== 0 && values["blue"][0][7] !== 0 ? values["red"][0][5] : 0)
    let col4_score = (values["red"][0][6] !== 0 && values["yellow"][0][7] !== 0 && values["blue"][0][8] !== 0 ? values["yellow"][0][7] : 0)
    let col5_score = (values["red"][0][7] !== 0 && values["yellow"][0][8] !== 0 && values["blue"][0][9] !== 0 ? values["blue"][0][9] : 0)

    let fail_score = count_values_in_color(values, "fail") * 5

    return {
      red: color_score["red"],
      yellow: color_score["yellow"],
      blue: color_score["blue"],
      col1: col1_score,
      col2: col2_score,
      col3: col3_score,
      col4: col4_score,
      col5: col5_score,
      fail: fail_score,
      total: color_score["red"] + color_score["yellow"] + color_score["blue"] + col1_score + col2_score + col3_score + col4_score + col5_score - fail_score
    }
  }
  
  
  let boxes = create_all_elements(all_info, legalChecker, setValue);
  
  let scores = computeScore(values)
  
  return (
    <div className="qwinto">
    <div className="qwinto_board">
    {boxes}
    <div className='qwinto_score_box qwinto_red_score'>{scores.red}</div>
    <div className='qwinto_score_box qwinto_yellow_score'>{scores.yellow}</div>
    <div className='qwinto_score_box qwinto_blue_score'>{scores.blue}</div>
    <div className='qwinto_score_box qwinto_col1_score'>{scores.col1}</div>
    <div className='qwinto_score_box qwinto_col2_score'>{scores.col2}</div>
    <div className='qwinto_score_box qwinto_col3_score'>{scores.col3}</div>
    <div className='qwinto_score_box qwinto_col4_score'>{scores.col4}</div>
    <div className='qwinto_score_box qwinto_col5_score'>{scores.col5}</div>
    <div className='qwinto_score_box qwinto_fail_score'>{scores.fail}</div>
    <div className='qwinto_score_box qwinto_total_score'>{scores.total}</div>
    </div>
    </div>
    );
  }
  
  export default Qwinto;
