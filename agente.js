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


const traversedStates = []

const addState = (newState) => {
    const [robot, aState, BState] = newState;
    const posibleStates = traversedStates.find(state => {
        const [r, a, b] = state;
        return a === aState && b === BState && robot === r;
    })
    if (!posibleStates) {
        traversedStates.push([...newState]);
        console.log({ traversedStates })
    }
}

function test(states) {

    if (traversedStates.length === 8) {
        return document.getElementById("log").innerHTML += `
        <br>Todos los estados han sido recorridos<br>
		<ul>
        ${
			[...traversedStates].map(state => `
				<li>${state[0]}:  ${state[1]} - ${state[2]}</li>
			`).join("")
		}
		</ul>
        `;
    }
    addState(states);

    const [location, leftState, rightState] = states;
    const state = location === LEFT_POSITION ? leftState : rightState;

    const action_result = reflex_agent(location, state);

    document.getElementById("log").innerHTML += `
    <br>State: A: ${leftState} | B: ${rightState} Location: ${location} | Action: ${action_result}<br>`;

    if (action_result === CLEAN_ACTION) {
        if (location === LEFT_POSITION) states[1] = CLEAN_STATE;
        else if (location === RIGHT_POSITION) states[2] = CLEAN_STATE;
    }

    if (action_result === MESS_ACTION) {
        if (location === LEFT_POSITION) states[1] = DIRTY_STATE;
        else if (location === RIGHT_POSITION) states[2] = DIRTY_STATE;
    }

    else if (action_result === RIGHT_ACTION) states[0] = RIGHT_POSITION;
    else if (action_result === LEFT_ACTION) states[0] = LEFT_POSITION;
    setTimeout(function () { test(states); }, 600);
}

const states = [LEFT_POSITION, DIRTY_STATE, DIRTY_STATE];
test(states);