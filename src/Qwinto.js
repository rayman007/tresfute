import './Qwinto.css';
import CaptionBox from './CaptionBox.js';
import ClickableBoxNStates from './ClickableBoxNStates.js'
import create_all_elements from './helpers.js';

import { useState } from 'react';
import ClickableBox2States from './ClickableBox2States';

function Qwinto() {
    
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

  let scores = computeScore(values)
    
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
      bgcolor: "none",
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
      bgcolor: "none",
      avoid: [{x: 6, y: 1}]
    },
    
    {    
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "blue",
      bgcolor: "none",
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

    {
      comp: CaptionBox,
      section: "scores",
      x: 31, w: 70, mx: 19,
      y: 479, h: 70, my: 80,
      nx: 3,  ny: 1,
      value: "0",
      fsize: "40px",
      values: [[scores.red, scores.yellow, scores.blue]],
      color: [["red", "gold", "blue"]],
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "scores2",
      x: 330, w: 70, mx: 5.5,
      y: 479, h: 70, my: 80,
      nx: 5,  ny: 1,
      value: "0",
      fsize: "40px",
      values: [[scores.col1, scores.col2, scores.col3, scores.col4, scores.col5]],
      color: [Array(5).fill("black")],
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "scores3",
      x: 755, w: 70, mx: 50,
      y: 479, h: 70, my: 80,
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
    <div className="qwinto">
      <div className="qwinto_board">
        {boxes}
      </div>
    </div>
    );
  }
  
  export default Qwinto;
