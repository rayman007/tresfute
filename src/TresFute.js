import './TresFute.css';

import ClickableBox2States from './ClickableBox2States.js'
import ClickableBox3States from './ClickableBox3States.js'
import ClickableBoxNStates from './ClickableBoxNStates.js'
import TresFuteScoreBoard from './TresFuteScoreBoard.js'

import create_all_elements from './helpers.js';

import { useState } from 'react';

function TresFute() {

  const popup_states = [
    {t: "1", v: 1}, {t: "2", v: 2}, {t: "3", v: 3}, {t: "4", v: 4}, {t: "5", v: 5}, {t: "6", v: 6}, 
    {t: "Cancel", v: 0}
  ]

  const all_info = [  
    {
      comp: ClickableBox2States,
      section: "turns",
      x: 143, w: 48, mx: 51.2,
      y: 26, h: 48, my: 59,
      nx: 6,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBox3States,
      section: "replay",
      x: 218, w: 50, mx: 18,
      y: 153, h: 49, my: 59,
      nx: 7,  ny: 1,
      state1_class: "dotted",
      state2_class: "dotted_crossed",
      avoid: []
    },
  
    {
      comp: ClickableBox3States,
      section: "addone",
      x: 218, w: 50, mx: 18,
      y: 262, h: 50, my: 59,
      nx: 7,  ny: 1,
      state1_class: "dotted",
      state2_class: "dotted_crossed",
      avoid: []
    },
  
    {
      comp: ClickableBox2States,
      section: "yellow",
      x: 38, w: 48, mx: 13.8,
      y: 366, h: 48, my: 10.8,
      nx: 4,  ny: 4,
      avoid: [{x: 4, y: 1}, {x: 3, y: 2}, {x: 2, y: 3}, {x: 1, y: 4}]
    },
  
    {
      comp: ClickableBox2States,
      section: "blue",
      x: 386, w: 48, mx: 14,
      y: 432, h: 48, my: 11,
      nx: 4,  ny: 3,
      avoid: [{x: 1, y: 1}]
    },
  
    {
      comp: ClickableBox2States,
      section: "green",
      x: 92, w: 47, mx: 7.2,
      y: 720, h: 47, my: 54.5,
      nx: 11,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "orange",
      x: 92, w: 47, mx: 7.2,
      y: 822, h: 37, my: 54.5,
      nx: 11,  ny: 1,
      avoid: []
    },
  
    {
      comp: ClickableBoxNStates,
      states: popup_states,
      default_state: 0,
      section: "purple",
      x: 92, w: 47, mx: 7.2,
      y: 924, h: 37, my: 54.5,
      nx: 11,  ny: 1,
      avoid: []
    }
  ]
  
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
  
  let boxes = create_all_elements(all_info, legalChecker, setValue);
  
  return (
    <div className="tf">
          <TresFuteScoreBoard values={values} />
          <div className="tf_board">
          {boxes}
          </div>
    </div>
  );
}

export default TresFute;
