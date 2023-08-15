import './VraimentTresFute.css';

import ClickableBox2States from './ClickableBox2States.js'
import ClickableBox3States from './ClickableBox3States.js'
import ClickableBoxNStates from './ClickableBoxNStates.js'
import CaptionBox from './CaptionBox.js'

import create_all_elements from './helpers.js';

import { useState } from 'react';

function VraimentTresFute() {

  const [values, setValues] = useState({
    turns: [[0, 0, 0, 0, 0, 0]],
    replay: [[0, 0, 0, 0, 0, 0]],
    takeback: [[0, 0, 0, 0, 0, 0]],
    addone: [[0, 0, 0, 0, 0, 0]],
    grey: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    yellow: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    blue: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    green: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    pink: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
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
  
  function computeScore(values) {
    let grey_score = 0
    let grey_count = 0;
    const grey_score_scale = [0, 2, 4, 7, 11, 16, 22]
    for (let j = 0 ; j < 4 ; j++) {
      grey_count = 0
      for (let i = 0 ; i < 6 ; i++) {
        if (values["grey"][j][i] === 1) {
          grey_count = grey_count + 1;
        }
      }
      grey_score += grey_score_scale[grey_count];
    }

    let yellow_score = 0
    let yellow_count = 0;
    const yellow_score_scale = [0, 3, 10, 21, 36, 55, 75, 96, 118, 141, 165]
    for (let j = 0 ; j < 5 ; j++) {
      for (let i = 0 ; i < 4 ; i++) {
        if (values["yellow"][j][i] === 2) {
          yellow_count = yellow_count + 1;
        }
      }
    }
    yellow_score = yellow_score_scale[yellow_count];

    let blue_score = 0
    const blue_score_scale = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78]
    let blue_count = 0
    for (let i = 0 ; i < 12 ; i++) {
      if (values["blue"][0][i] !== 0) {
        blue_count = blue_count + 1;
      }
    }
    blue_score += blue_score_scale[blue_count];

    let green_subscores = [0, 0, 0, 0, 0, 0]
    let green_mult = [2, 2, 2, 1, 3, 3, 3, 2, 3, 1, 4, 1]
    let green_score = 0
    for (let sub = 0 ; sub < 6 ; sub++) {
      if ((values["green"][0][sub * 2] !== 0) && (values["green"][0][sub * 2 + 1] !== 0)) {
        green_subscores[sub] = green_mult[sub * 2] * values["green"][0][sub * 2] - green_mult[sub * 2 + 1] * values["green"][0][sub * 2 + 1]
      }
      green_score += green_subscores[sub]
      green_subscores[sub] = "x" + green_mult[sub * 2] + "        " + green_subscores[sub] + "        x" + green_mult[sub * 2 + 1]
    }

    let pink_score = 0
    for (let i = 0 ; i < 12 ; i++) {
      pink_score = pink_score + values["pink"][0][i];
    }

    let nbfox = 0;

    if ((values["replay"][0][5] !== 0)) {
      nbfox++;
    }

    if ((values["grey"][0][2] === 1) && (values["grey"][1][2] === 1) && (values["grey"][2][2] === 1) && (values["grey"][3][2] === 1)) {
      nbfox++;
    }

    if ((values["yellow"][0][3] === 1) && (values["yellow"][2][3] === 1) && (values["yellow"][4][3] === 1)) {
      nbfox++;
    }
    if ((values["blue"][0][8] !== 0)) {
      nbfox++;
    }

    if ((values["green"][0][6] !== 0)) {
      nbfox++;
    }

    if ((values["pink"][0][7] >= 2)) {
      nbfox++;
    }

    let fox_score = nbfox * Math.min(grey_score, yellow_score, blue_score, green_score, pink_score)


    return {
      grey: grey_score,
      yellow: yellow_score,
      blue: blue_score,
      green: green_score,
      green_subscores: green_subscores,
      pink: pink_score,
      fox: fox_score,
      total: grey_score + yellow_score + blue_score + green_score + pink_score
    }
  }

  let scores = computeScore(values)

  const popup_states_6 = [
    {t: "1", v: 1}, {t: "2", v: 2}, {t: "3", v: 3}, {t: "4", v: 4}, {t: "5", v: 5}, {t: "6", v: 6}, 
    {t: "Cancel", v: 0}
  ]

  const popup_states_12 = [
    {t: "1", v: 1}, {t: "2", v: 2}, {t: "3", v: 3}, {t: "4", v: 4}, {t: "5", v: 5}, {t: "6", v: 6}, 
    {t: "7", v: 7}, {t: "8", v: 8}, {t: "9", v: 9}, {t: "10", v: 10}, {t: "11", v: 11}, {t: "12", v: 12}, 
    {t: "Cancel", v: 0}
  ]

  const all_info = [  
    {
      comp: ClickableBox2States,
      section: "turns",
      x: 156, w: 48, mx: 49,
      y: 13, h: 46, my: 59,
      nx: 6,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBox3States,
      section: "replay",
      x: 225, w: 50, mx: 32,
      y: 130, h: 49, my: 70,
      nx: 6,  ny: 1,
      state1_class: "dotted",
      state2_class: "dotted_crossed",
      avoid: []
    },

    {
      comp: ClickableBox3States,
      section: "takeback",
      x: 225, w: 50, mx: 32,
      y: 222, h: 49, my: 70,
      nx: 6,  ny: 1,
      state1_class: "dotted",
      state2_class: "dotted_crossed",
      avoid: []
    },

    {
      comp: ClickableBox3States,
      section: "addone",
      x: 225, w: 50, mx: 32,
      y: 308, h: 49, my: 70,
      nx: 6,  ny: 1,
      state1_class: "dotted",
      state2_class: "dotted_crossed",
      avoid: []
    },

    {
      comp: ClickableBox2States,
      section: "grey",
      x: 17, w: 48, mx: 6.2,
      y: 462, h: 48, my: 5,
      nx: 6,  ny: 4,
      avoid: []
    },
  
    {
      comp: ClickableBox3States,
      section: "yellow",
      x: 403, w: 48, mx: 11,
      y: 462, h: 48, my: -13.5,
      nx: 4,  ny: 5,
      state1_class: "circled",
      state2_class: "circled_crossed",
      avoid: [{x: 1, y: 1}, {x: 3, y: 1}, {x: 2, y: 2}, {x: 4, y: 2}, {x: 1, y: 3}, {x: 3, y: 3}, {x: 2, y: 4}, {x: 4, y: 4}, {x: 1, y: 5}, {x: 3, y: 5}]
    },
  
    {
      comp: ClickableBoxNStates,
      states: popup_states_12,
      default_value: 0,
      section: "blue",
      x: 54, w: 47, mx: 6,
      y: 763, h: 40, my: 54.5,
      nx: 12,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBoxNStates,
      states: popup_states_6,
      default_value: 0,
      section: "green",
      x: 54, w: 47, mx: 6,
      y: 871, h: 40, my: 54.5,
      nx: 12,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBoxNStates,
      states: popup_states_6,
      default_value: 0,
      section: "pink",
      x: 54, w: 47, mx: 6,
      y: 976, h: 40, my: 54.5,
      nx: 12,  ny: 1,
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "scores",
      x: 767, w: 70, mx: 6,
      y: 45, h: 70, my: 80,
      nx: 1,  ny: 7,
      value: "0",
      fsize: "40px",
      values: [[scores.grey], [scores.yellow], [scores.blue], [scores.green], [scores.pink], [scores.fox], [scores.total]],
      color: [["gray"], ["gold"], ["blue"], ["green"], ["magenta"], ["red"], ["black"]],
      avoid: []
    },

    {
      comp: CaptionBox,
      section: "subscores",
      x: 54, w: 100, mx: 6,
      y: 858, h: 20, my: 80,
      nx: 6,  ny: 1,
      values: [scores.green_subscores],
      color: [Array(6).fill("black")],
      fsize: "12px",
      avoid: []
    },

  ]
  
  let boxes = create_all_elements(all_info, legalChecker, setValue);

  return (
    <div className="vtf">
          <div className="vtf_board">
          {boxes}
          </div>
    </div>
  );
}

export default VraimentTresFute;
