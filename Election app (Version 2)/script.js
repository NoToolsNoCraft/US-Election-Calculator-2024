// Data structure for each state with names and electoral votes
const stateData = {
    "CA": { name: "California", votes: 55 },
    "TX": { name: "Texas", votes: 38 },
    "FL": { name: "Florida", votes: 29 },
    "NY": { name: "New York", votes: 29 },
    "IL": { name: "Illinois", votes: 20 },
    "PA": { name: "Pennsylvania", votes: 20 },
    "OH": { name: "Ohio", votes: 18 },
    "GA": { name: "Georgia", votes: 16 },
    "MI": { name: "Michigan", votes: 16 },
    "NC": { name: "North Carolina", votes: 15 },
    "NJ": { name: "New Jersey", votes: 14 },
    "VA": { name: "Virginia", votes: 13 },
    "WA": { name: "Washington", votes: 12 },
    "AZ": { name: "Arizona", votes: 11 },
    "IN": { name: "Indiana", votes: 11 },
    "MA": { name: "Massachusetts", votes: 11 },
    "TN": { name: "Tennessee", votes: 11 },
    "MD": { name: "Maryland", votes: 10 },
    "MN": { name: "Minnesota", votes: 10 },
    "MO": { name: "Missouri", votes: 10 },
    "WI": { name: "Wisconsin", votes: 10 },
    "CO": { name: "Colorado", votes: 9 },
    "SC": { name: "South Carolina", votes: 9 },
    "AL": { name: "Alabama", votes: 9 },
    "KY": { name: "Kentucky", votes: 8 },
    "LA": { name: "Louisiana", votes: 8 },
    "CT": { name: "Connecticut", votes: 7 },
    "OK": { name: "Oklahoma", votes: 7 },
    "OR": { name: "Oregon", votes: 7 },
    "AR": { name: "Arkansas", votes: 6 },
    "IA": { name: "Iowa", votes: 6 },
    "KS": { name: "Kansas", votes: 6 },
    "MS": { name: "Mississippi", votes: 6 },
    "NV": { name: "Nevada", votes: 6 },
    "NM": { name: "New Mexico", votes: 5 },
    "UT": { name: "Utah", votes: 6 },
    "NE": { name: "Nebraska", votes: 5, split: true }, // Nebraska splits electoral votes
    "WV": { name: "West Virginia", votes: 5 },
    "ID": { name: "Idaho", votes: 4 },
    "HI": { name: "Hawaii", votes: 4 },
    "ME": { name: "Maine", votes: 4, split: true }, // Maine splits electoral votes
    "NH": { name: "New Hampshire", votes: 4 },
    "RI": { name: "Rhode Island", votes: 4 },
    "MT": { name: "Montana", votes: 3 },
    "DE": { name: "Delaware", votes: 3 },
    "SD": { name: "South Dakota", votes: 3 },
    "ND": { name: "North Dakota", votes: 3 },
    "AK": { name: "Alaska", votes: 3 },
    "VT": { name: "Vermont", votes: 3 },
    "WY": { name: "Wyoming", votes: 3 },
    "DC": { name: "District of Columbia", votes: 3 }
};

  
// Track selected party and votes
let selectedParty = null;
let democratVotes = 0;
let republicanVotes = 0;
const selectedStates = {};

// Add event listeners for buttons
document.getElementById("democratBtn").addEventListener("click", () => {
    selectedParty = "democrat";
    document.getElementById("selectedParty").textContent = "Democrat";
});

document.getElementById("republicanBtn").addEventListener("click", () => {
    selectedParty = "republican";
    document.getElementById("selectedParty").textContent = "Republican";
});

// Handle modal for split vote selection
const modal = document.getElementById("voteModal");
const modalClose = document.querySelector(".close");
modalClose.onclick = () => { modal.style.display = "none"; };

// Options for vote splits for Maine and Nebraska
const splitOptions = {
    "ME": [[4, 0], [3, 1], [2, 2], [0, 4], [1, 3]],
    "NE": [[5, 0], [4, 1], [3, 2], [0, 5], [1, 4], [2, 3]]
};

// Open modal for split selection
function openSplitVoteModal(stateId) {
    modal.style.display = "block";
    const voteOptions = document.getElementById("voteOptions");
    voteOptions.innerHTML = "";

    // Create buttons for each split option
    splitOptions[stateId].forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = `${option[0]} Democrat, ${option[1]} Republican`;
        btn.onclick = () => {
            applyVoteSplit(stateId, option);
            modal.style.display = "none";
        };
        voteOptions.appendChild(btn);
    });
}

// Reset votes for a state when changing selection
function clearPreviousVotes(stateId) {
    const previousVote = selectedStates[stateId];

    // Clear split vote states (Maine and Nebraska)
    if (previousVote === "split") {
        const [prevDem, prevRep] = selectedStates[`${stateId}_splitVotes`];
        democratVotes -= prevDem;
        republicanVotes -= prevRep;
    } else if (previousVote === "democrat") {
        democratVotes -= stateData[stateId].votes;
    } else if (previousVote === "republican") {
        republicanVotes -= stateData[stateId].votes;
    }
}

// Apply vote splits and recount
function applyVoteSplit(stateId, option) {
    clearPreviousVotes(stateId);

    const [demVotes, repVotes] = option;

    // Assign votes based on new selection
    democratVotes += demVotes;
    republicanVotes += repVotes;

    // Update state data with the split vote selection
    selectedStates[stateId] = "split";
    selectedStates[`${stateId}_splitVotes`] = option;

    document.getElementById("democratVotes").textContent = democratVotes;
    document.getElementById("republicanVotes").textContent = republicanVotes;
}

// Standard update for non-splitting states
function updateVotes(stateId) {
    if (stateId === "ME" || stateId === "NE") {
        openSplitVoteModal(stateId);
        return;
    }

    if (!stateData[stateId] || !selectedParty) return;

    const stateElement = document.getElementById(stateId);
    const votes = stateData[stateId].votes;

    clearPreviousVotes(stateId);

    if (selectedParty === "democrat") {
        democratVotes += votes;
        stateElement.style.fill = "blue";
    } else if (selectedParty === "republican") {
        republicanVotes += votes;
        stateElement.style.fill = "red";
    }

    selectedStates[stateId] = selectedParty;
    document.getElementById("democratVotes").textContent = democratVotes;
    document.getElementById("republicanVotes").textContent = republicanVotes;
}

// Function to dynamically apply gradient color for split electoral votes in SVG states (Maine and Nebraska)
function applySplitColor(stateId, demVotes, repVotes) {
    const stateElement = document.getElementById(stateId);

    // Calculate the percentage for the color gradient
    const totalVotes = demVotes + repVotes;
    const demPercentage = (demVotes / totalVotes) * 100;
    const repPercentage = (repVotes / totalVotes) * 100;

    const svgNS = "http://www.w3.org/2000/svg";
    const defs = document.querySelector("svg defs") || document.createElementNS(svgNS, "defs");

    // Create a unique gradient ID for this state and remove any existing gradient with the same ID
    const gradientId = `${stateId}-gradient`;
    const existingGradient = document.getElementById(gradientId);
    if (existingGradient) {
        existingGradient.remove();
    }

    // Create a new linear gradient for the updated color
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.id = gradientId;
    gradient.setAttribute("x1", "0%"); // Start at the left
    gradient.setAttribute("y1", "0%"); // Start at the top
    gradient.setAttribute("x2", "0%"); // End at the left
    gradient.setAttribute("y2", "100%"); // End at the bottom

    // Create and set the stop elements for the gradient
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", `${demPercentage}%`);
    stop1.setAttribute("stop-color", "blue");
    gradient.appendChild(stop1);

    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", `${repPercentage}%`);
    stop2.setAttribute("stop-color", "red");
    gradient.appendChild(stop2);

    // Append the new gradient to defs and apply it to the state element
    defs.appendChild(gradient);
    document.querySelector("svg").appendChild(defs);
    stateElement.style.fill = `url(#${gradientId})`;
}




// Update the `applyVoteSplit` function to call `applySplitColor`
function applyVoteSplit(stateId, option) {
    clearPreviousVotes(stateId);

    const [demVotes, repVotes] = option;

    // Assign votes based on new selection
    democratVotes += demVotes;
    republicanVotes += repVotes;

    // Update state data with the split vote selection
    selectedStates[stateId] = "split";
    selectedStates[`${stateId}_splitVotes`] = option;

    document.getElementById("democratVotes").textContent = democratVotes;
    document.getElementById("republicanVotes").textContent = republicanVotes;

    // Apply the color gradient for split states
    applySplitColor(stateId, demVotes, repVotes);
}

// Add event listeners to each state
document.querySelectorAll(".state").forEach(state => {
    state.addEventListener("click", (event) => {
        const stateId = event.currentTarget.id;
        updateVotes(stateId);
    });
});