import './ClickableBoxes.css';

export default function CaptionBox({info}) {

  return (
    <div 
       key={info.name}
       className={"box caption"}
       style={{
        top: info.py, left: info.px, 
        width: info.w, height: info.h, 
        fontSize: info.info.fsize, lineHeight: info.h + "px",
        color: info.info.color[info.y][info.x]}}>
          {info.info.values[info.y][info.x]}
    </div>
  )
}

