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
    "NE": { name: "Nebraska", votes: 5 }, // Nebraska splits electoral votes
    "WV": { name: "West Virginia", votes: 5 },
    "ID": { name: "Idaho", votes: 4 },
    "HI": { name: "Hawaii", votes: 4 },
    "ME": { name: "Maine", votes: 4 }, // Maine splits electoral votes
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

  
// Initial vote counts and selected party
let selectedParty = null;
let democratVotes = 0;
let republicanVotes = 0;

// Track selected states to avoid double counting
const selectedStates = {};

// Buttons for selecting party
document.getElementById("democratBtn").addEventListener("click", () => {
    selectedParty = "democrat";
    document.getElementById("selectedParty").textContent = "Democrat";
});

document.getElementById("republicanBtn").addEventListener("click", () => {
    selectedParty = "republican";
    document.getElementById("selectedParty").textContent = "Republican";
});

function updateVotes(stateId) {
    const stateInfo = stateData[stateId];
    if (!stateInfo || !selectedParty) return; // Exit if there's no state info or party selected

    const stateElement = document.getElementById(stateId); // Get the SVG element by ID

    // Check if the state has already been selected
    if (selectedStates[stateId] === selectedParty) return;

    const votes = stateInfo.votes;

    // Update the vote counts based on the selected party
    if (selectedParty === "democrat") {
        democratVotes += votes;
        stateElement.style.fill = "blue"; // Set the fill color to blue
    } else if (selectedParty === "republican") {
        republicanVotes += votes;
        stateElement.style.fill = "red"; // Set the fill color to red
    }

    // Mark the state as selected for the chosen party
    selectedStates[stateId] = selectedParty;

    // Update the displayed vote counts
    document.getElementById("democratVotes").textContent = democratVotes;
    document.getElementById("republicanVotes").textContent = republicanVotes;
}

// Add event listeners to each state
document.querySelectorAll(".state").forEach(state => {
    state.addEventListener("click", (event) => {
        const stateId = event.currentTarget.id; // Use currentTarget to ensure you get the right element
        updateVotes(stateId);
    });
});