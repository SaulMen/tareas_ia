const LEFT_POSITION = "A";
const RIGHT_POSITION = "B";

const DIRTY_STATE = "DIRTY";
const CLEAN_STATE = "CLEAN";

const LEFT_ACTION = "LEFT";
const RIGHT_ACTION = "RIGHT";
const CLEAN_ACTION = "CLEAN";
const MESS_ACTION = "DIRTY";


function getRandom() {
    return Math.floor(Math.random() * 2);
}


function reflex_agent(location, state) {
    if (state === DIRTY_STATE && getRandom() === 1) return CLEAN_ACTION;
    if (state === CLEAN_STATE && getRandom() === 1) return MESS_ACTION;
    if (location === LEFT_POSITION) return RIGHT_ACTION;
    if (location === RIGHT_POSITION) return LEFT_ACTION;
}


const traversedStates = [];


const addState = (newState) => {
    const [robot, aState, BState] = newState;
    const possibleState = traversedStates.find(state => {
        const [r, a, b] = state;
        return a === aState && b === BState && robot === r;
    });
    if (!possibleState) {
        traversedStates.push([...newState]);
        console.log({ traversedStates });
        updateTraversedStatesView();
    }
}


const updateTraversedStatesView = () => {
    const traversedStatesContainer = document.getElementById("traversedStates");
    traversedStatesContainer.innerHTML = `
        <h3>Resumen de Estados Recorridos</h3>
        <ol type="1">
            ${traversedStates.map(state => `
                <li>${state[0]}:  ${state[1]} - ${state[2]}</li>
            `).join("")}
        </ol>
    `;
    if (traversedStates.length === 8) {        
        document.getElementById("traversedStates").innerHTML += `
        <h3>RSe recorrieron todos los estados (8)</h3>`;
        updateTraversedStatesView();
        return;
    }
}


function test(states) {
    if (traversedStates.length === 8) {
        document.getElementById("log").innerHTML += `
        <br>Se recorrieron todos los estados (8)<br>`;
        updateTraversedStatesView();
        return;
    }

    addState(states);

    const [location, leftState, rightState] = states;
    const state = location === LEFT_POSITION ? leftState : rightState;
    const action_result = reflex_agent(location, state);
    
    document.getElementById("log").innerHTML += `
    <br>Ubicación: ${location} -> ||Estado: A: ${leftState} -- B: ${rightState}|| <- Acción: ${action_result}<br>`;
    

    if (action_result === CLEAN_ACTION) {
        if (location === LEFT_POSITION) states[1] = CLEAN_STATE;
        else if (location === RIGHT_POSITION) states[2] = CLEAN_STATE;
    }

    if (action_result === MESS_ACTION) {
        if (location === LEFT_POSITION) states[1] = DIRTY_STATE;
        else if (location === RIGHT_POSITION) states[2] = DIRTY_STATE;
    }

    if (action_result === RIGHT_ACTION) states[0] = RIGHT_POSITION;
    else if (action_result === LEFT_ACTION) states[0] = LEFT_POSITION;

    setTimeout(function () { test(states); }, 600);
}


const states = [LEFT_POSITION, DIRTY_STATE, DIRTY_STATE];
test(states);
