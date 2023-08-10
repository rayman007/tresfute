export default function TresFuteScoreBoard({values}) {

  function computeScore(values) {
    let yellow_score = 0
  
    console.log(values)

    if ((values["yellow"][0][0] === 1) && (values["yellow"][1][0] === 1) && (values["yellow"][2][0] === 1)) {
      yellow_score += 10;
    }
    if ((values["yellow"][0][1] === 1) && (values["yellow"][1][1] === 1) && (values["yellow"][3][1] === 1)) {
      yellow_score += 14;
    }
    if ((values["yellow"][0][2] === 1) && (values["yellow"][2][2] === 1) && (values["yellow"][3][2] === 1)) {
      yellow_score += 16;
    }
    if ((values["yellow"][1][3] === 1) && (values["yellow"][2][3] === 1) && (values["yellow"][3][3] === 1)) {
      yellow_score += 20;
    }

    let blue_count = 0;
    for (let j = 0 ; j < 3 ; j++) {
      for (let i = 0 ; i < 4 ; i++) {
          if (values["blue"][j][i] === 1) {
            blue_count++;
          }
      }
    }

    const blue_scores = [0, 1, 2, 4, 7, 11, 16, 22, 29, 37, 46, 56]

    let green_count = 0;
    for (let i = 0 ; i < 11 ; i++) {
        if (values["green"][0][i] !== 0) {
          green_count++;
        }
      }
    
    let blue_score = blue_scores[blue_count];

    const green_scores = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66]

    let green_score = green_scores[green_count]
    
    let orange_score = 0;
    let orange_mult = [1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 3]
    for (let i = 0 ; i < 11 ; i++) {
      orange_score += values["orange"][0][i] * orange_mult[i];
    }
    
    let purple_score = 0;
    for (let i = 0 ; i < 11 ; i++) {
      purple_score += values["purple"][0][i];
    }
    
    let nbfox = 0;

    if ((values["yellow"][3][1] === 1) && (values["yellow"][3][2] === 1) && (values["yellow"][3][3] === 1)) {
      nbfox++;
    }

    if ((values["blue"][2][0] === 1) && (values["blue"][2][1] === 1) && (values["blue"][2][2] === 1) && (values["blue"][2][3] === 1)) {
      nbfox++;
    }

    if ((values["green"][0][6] === 1)) {
      nbfox++;
    }
    if ((values["orange"][0][7] !== 0)) {
      nbfox++;
    }

    if ((values["purple"][0][6] !== 0)) {
      nbfox++;
    }

    let fox_score = nbfox * Math.min(yellow_score, blue_score, green_score, orange_score, purple_score)

    return {
      yellow: yellow_score,
      blue: blue_score,
      green: green_score,
      orange: orange_score,
      purple: purple_score,
      fox: fox_score,
      total: yellow_score + blue_score + green_score + orange_score + purple_score + fox_score
    }
  }
  


  const scores = computeScore(values)

  return(

    <div className='scores'>
      <div className="score_box yellow_score">{scores.yellow}</div>
      <div className="score_box blue_score">{scores.blue}</div>
      <div className="score_box green_score">{scores.green}</div>
      <div className="score_box orange_score">{scores.orange}</div>
      <div className="score_box purple_score">{scores.purple}</div>
      <div className="score_box red_score">{scores.fox}</div>
      <div className="score_box black_score">{scores.total}</div>
    </div>

  );
}
