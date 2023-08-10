import TresFute from './TresFute';
import Qwixx from './Qwixx';

import './GameManager.css';

import { useState } from 'react';

function GameManager() {

    const [game, setGame] = useState("");

    if (game === "") {
        return (
            <div className='game_manager'>
                <h1>Select a game : </h1>
                <button onClick={() => setGame("tres_fute")}>Tres Futé</button>
                <button onClick={() => setGame("qwixx")}>Qwixx</button>
            </div>
        );
    }

    if (game === "tres_fute") {
        return (
            <TresFute/>
        );
    }

    if (game === "qwixx") {
        return (
            <Qwixx/>
        );
    }

}

export default GameManager;
