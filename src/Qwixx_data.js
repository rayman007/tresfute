import React from 'react';

import ClickableBox2States from './ClickableBox2States.js'

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
  }
];
  
  function create_elements(info, legalChecker, setValue) {
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

  export default function create_all_elements(legalChecker, setValue) {
    let out = []
    for (let i in all_info) {
      let ainfo = all_info[i]
      let temp_elems = create_elements(ainfo, legalChecker, setValue);
      console.log(ainfo.comp)
      let temp_map = temp_elems.map(info => React.createElement(ainfo.comp, {info}))
      out = [...out, ...temp_map]
    }
    return out;
  }

