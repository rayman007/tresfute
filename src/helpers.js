import React from 'react';

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
                    setValue: setValue,
                    info: info
                });
            }
        }
    }
    return r;
}

export default function create_all_elements(all_info, legalChecker, setValue) {
    let out = []
    for (let i in all_info) {
        let ainfo = all_info[i]
        let temp_elems = create_elements(ainfo, legalChecker, setValue);
        let temp_map = temp_elems.map(info => React.createElement(ainfo.comp, {info}))
        out = [...out, ...temp_map]
    }
    return out;
}
