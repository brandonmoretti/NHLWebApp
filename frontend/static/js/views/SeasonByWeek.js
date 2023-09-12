import AbstractView from "./AbstractView.js";

//variables; arrays containing 0's for wins, losses, ot losses, and points
let week = 0;
let atlantic_Standings;
let metro_Standings;
let central_Standings;
let pacific_Standings;
let scoreStr;
const league = ["Boston Bruins", "Buffalo Sabres", "Detroit Red Wings", "Florida Panthers", "Montreal Canadiens", "Ottawa Senators", "Tampa Bay Lightning", "Toronto Maple Leafs", "Carolina Hurricanes", "Columbus Blue Jackets", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "Pittsburgh Penguins", "Washington Capitals", "Arizona Coyotes", "Chicago Blackhawks", "Colorado Avalanche", "Dallas Stars", "Minnesota Wild", "Nashville Predators", "St. Louis Blues", " Winnipeg Jets", "Anaheim Ducks", "Calgary Flames", "Edmonton Oilers", "Los Angeles Kings", "San Jose Sharks", "Seattle Kraken", "Vancouver Canucks", "Vegas Golden Knights"];
let wins = [];

for(let i = 0; i < 32; i++) {
    wins.push(0);
}

let losses = [];
for(let i = 0; i < 32; i++) {
    losses.push(0);
}

let overtimeLosses = [];
for(let i = 0; i < 32; i++) {
    overtimeLosses.push(0);
}

let points = [];
for(let i = 0; i < 32; i++) {
    points.push(0);
}


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("SeasonByWeek");
    }

    async getHtml() {
        return `
            <h1 class="start_header">NHL SEASON SIMULATOR</h1>
            <h2 id="week_head" class="week_header"></h2>
        
            <div class="left_border"></div>
            <div class="right_border"></div>
            <div class="advance_week">
                <button id="advance" class="advance_week_button">Advance Week</button>
            </div>
            <div class="atlantic">
                <p1 id="atlantic_standings" class="atlantic_standings"></p1>
            </div>
            <div class="metro">
                <p2 id="metro_standings" class="metro_standings"></p2>
            </div>
            <div class="central">
                <p3 id="central_standings" class="central_standings"></p3>
            </div>
            <div class="pacific">
                <p4 id="pacific_standings" class="pacific_standings"></p4>
            </div>
            <div class="scores">
                <p5 id="scoresheet" class="scores"></p5>
            </div>
            
        `;
    }

    
    

}

//click advance button, run advance week function
window.onload = function(){
    document.getElementById("week_head").innerHTML = "Week " + week;
    const advance_week = document.getElementById("advance");
    advance_week.addEventListener('click', advanceWeek);
    
}
function advanceWeek() {
    scoreStr = "";
    week = week + 1;
    document.getElementById("week_head").innerHTML = "Week " + week;
    generateGames();
    buildStandings();
}

//generate weekly matchups
function generateGames() {
    let game = []; // will contain two randomly selected teams
    let week = [[]]; // will contain each two-team matchup
    let leagueNums = []; // will progessively fill up with numbers corresponding to each team to track which teams are already selected for games

    let rand1; // team 1 
    let rand2; // team 2

    while(leagueNums.length <= 30) {
        do {
            rand1 = Math.floor(Math.random() * 32);
            rand2 = Math.floor(Math.random() * 32);
        } while((rand1 == rand2) || (leagueNums.includes(rand1) || leagueNums.includes(rand2)));

        leagueNums.push(rand1); // add both team numbers to keep track of chosen teams
    leagueNums.push(rand2);

    game[0] = league[rand1];
    game[1] = league[rand2];

    playGame(rand1, rand2); 

    week.push(game);
    }

    return week;
}

//generate scores for each game
function generateScores(team1scoreProb, team2scoreProb) {
    let team1score;
    let team2score;

    // SCORE GENERATOR FOR TEAM 1
    if(team1scoreProb >= 0 && team1scoreProb <= 25) {
        team1score = Math.round(Math.random()); // generates score 0 or 1
    }
    else if(team1scoreProb > 25 && team1scoreProb <= 65) {
        team1score = Math.floor(Math.random() * 2) + 2; // generates score 2 or 3
    }
    else if(team1scoreProb > 65 && team1scoreProb <= 90) {
        team1score = Math.floor(Math.random() * 2) + 4; // generates score 4 or 5
    }
    else {
        team1score = Math.floor(Math.random() * 2) + 6; // generates score 6 or 7
    }

    // SCORE GENERATOR FOR TEAM 2
    if(team2scoreProb >= 0 && team2scoreProb <= 25) {
        team2score = Math.round(Math.random()); // generates score 0 or 1
    }
    else if(team2scoreProb > 25 && team2scoreProb <= 65) {
        team2score = Math.floor(Math.random() * 2) + 2; // generates score 2 or 3
    }
    else if(team2scoreProb > 65 && team2scoreProb <= 90) {
        team2score = Math.floor(Math.random() * 2) + 4; // generates score 4 or 5
    }
    else {
        team2score = Math.floor(Math.random() * 2) + 6; // generates score 6 or 7
    }

    let scores = [team1score, team2score];

    return scores;
}

//play game
function playGame(team1, team2) {
    let team1scoreProb = Math.floor(Math.random() * 100); // generates random num between 0-100 to determine teams score
    let team2scoreProb = Math.floor(Math.random() * 100);

    let scores = generateScores(team1scoreProb, team2scoreProb);

    let team1Score = scores[0];
    let team2Score = scores[1];


    if(team1Score > team2Score) {
        wins[team1] = wins[team1] + 1;
        losses[team2] = losses[team2] + 1;
        scoreStr = scoreStr + "<br></br>" + league[team1] + ": " + team1Score + "  " + league[team2] + ": " + team2Score;
    }
    else if(team2Score > team1Score) {
        wins[team2] = wins[team2] + 1;
        losses[team1] = losses[team1] + 1;
        scoreStr = scoreStr + "<br></br>" + league[team1] + ": " + team1Score + "  " + league[team2] + ": " + team2Score;
    }
    else { // OVERTIME MINI-METHOD
        let otGoal = Math.round(Math.random());

        if(otGoal == 0) { // if rand num is 0, team1 gets the OT goal, if rand num is 1, team2 gets the OT goal
            team1Score = team1Score + 1;
        } 
        else {
            team2Score = team2Score + 1;
        }

        if(team1Score > team2Score) {
            wins[team1] = wins[team1] + 1;
            overtimeLosses[team2] = overtimeLosses[team2] + 1;
        }
        else if(team2Score > team1Score) {
            wins[team2] = wins[team2] + 1;
            overtimeLosses[team1] = overtimeLosses[team1] + 1;

        }
        scoreStr = scoreStr + "<br></br>" + league[team1] + ": " + team1Score + "  " + league[team2] + ": " + team2Score;
        
    }

    
}

function generatePoints() {
    for(let x = 0; x < 32; x++)
    {
        points[x] = (wins[x] * 2) + (overtimeLosses[x]);
    }
}

function sortAtlantic() {
    let atlantic = [];
    atlantic[0] = [];
    atlantic[1] = [];
    atlantic[2] = [];
    atlantic[3] = [];
    atlantic[4] = [];
    atlantic[5] = [];
    atlantic[6] = [];
    atlantic[7] = [];

    for(let i = 0; i < 8; i++) {
        atlantic[i][0] = league[i];
        atlantic[i][1] = wins[i] + "";
        atlantic[i][2] = losses[i] + "";
        atlantic[i][3] = overtimeLosses[i] + "";
        atlantic[i][4] = points[i] + "";
    }

    for(let x = 0; x < 7; x++) {
        if(parseInt(atlantic[x][4]) < parseInt(atlantic[x + 1][4]))
        {
            let temp = atlantic[x][4];
            let teamTemp = atlantic[x][0];
            let winTemp = atlantic[x][1];
            let lossTemp = atlantic[x][2];
            let otTemp = atlantic[x][3];

            atlantic[x][0] = atlantic[x + 1][0];
            atlantic[x][1] = atlantic[x + 1][1];
            atlantic[x][2] = atlantic[x + 1][2];
            atlantic[x][3] = atlantic[x + 1][3];
            atlantic[x][4] = atlantic[x + 1][4];

            atlantic[x + 1][0] = teamTemp;
            atlantic[x + 1][1] = winTemp;
            atlantic[x + 1][2] = lossTemp;
            atlantic[x + 1][3] = otTemp;
            atlantic[x + 1][4] = temp;

            x = -1;
        }
    }
    return atlantic;
}

function sortMetro() {
    let metro = [];
    let index = 0;
    metro[0] = [];
    metro[1] = [];
    metro[2] = [];
    metro[3] = [];
    metro[4] = [];
    metro[5] = [];
    metro[6] = [];
    metro[7] = [];

    for(let i = 8; i < 16; i++) {
        metro[index][0] = league[i];
        metro[index][1] = wins[i] + "";
        metro[index][2] = losses[i] + "";
        metro[index][3] = overtimeLosses[i] + "";
        metro[index][4] = points[i] + "";
        index = index + 1;
    }

    for(let x = 0; x < 7; x++) {
        if(parseInt(metro[x][4]) < parseInt(metro[x + 1][4]))
        {
            let temp = metro[x][4];
            let teamTemp = metro[x][0];
            let winTemp = metro[x][1];
            let lossTemp = metro[x][2];
            let otTemp = metro[x][3];

            metro[x][0] = metro[x + 1][0];
            metro[x][1] = metro[x + 1][1];
            metro[x][2] = metro[x + 1][2];
            metro[x][3] = metro[x + 1][3];
            metro[x][4] = metro[x + 1][4];

            metro[x + 1][0] = teamTemp;
            metro[x + 1][1] = winTemp;
            metro[x + 1][2] = lossTemp;
            metro[x + 1][3] = otTemp;
            metro[x + 1][4] = temp;

            x = -1;
        }
    }
    return metro;
}

function sortCentral() {
    let central = [];
    let index = 0;
    central[0] = [];
    central[1] = [];
    central[2] = [];
    central[3] = [];
    central[4] = [];
    central[5] = [];
    central[6] = [];
    central[7] = [];

    for(let i = 16; i < 24; i++) {
        central[index][0] = league[i];
        central[index][1] = wins[i] + "";
        central[index][2] = losses[i] + "";
        central[index][3] = overtimeLosses[i] + "";
        central[index][4] = points[i] + "";
        index = index + 1;
    }

    for(let x = 0; x < 7; x++) {
        if(parseInt(central[x][4]) < parseInt(central[x + 1][4]))
        {
            let temp = central[x][4];
            let teamTemp = central[x][0];
            let winTemp = central[x][1];
            let lossTemp = central[x][2];
            let otTemp = central[x][3];

            central[x][0] = central[x + 1][0];
            central[x][1] = central[x + 1][1];
            central[x][2] = central[x + 1][2];
            central[x][3] = central[x + 1][3];
            central[x][4] = central[x + 1][4];

            central[x + 1][0] = teamTemp;
            central[x + 1][1] = winTemp;
            central[x + 1][2] = lossTemp;
            central[x + 1][3] = otTemp;
            central[x + 1][4] = temp;

            x = -1;
        }
    }
    return central;
}

function sortPacific() {
    let pacific = [];
    let index = 0;
    pacific[0] = [];
    pacific[1] = [];
    pacific[2] = [];
    pacific[3] = [];
    pacific[4] = [];
    pacific[5] = [];
    pacific[6] = [];
    pacific[7] = [];

    for(let i = 24; i < 32; i++) {
        pacific[index][0] = league[i];
        pacific[index][1] = wins[i] + "";
        pacific[index][2] = losses[i] + "";
        pacific[index][3] = overtimeLosses[i] + "";
        pacific[index][4] = points[i] + "";
        index = index + 1;
    }

    for(let x = 0; x < 7; x++) {
        if(parseInt(pacific[x][4]) < parseInt(pacific[x + 1][4]))
        {
            let temp = pacific[x][4];
            let teamTemp = pacific[x][0];
            let winTemp = pacific[x][1];
            let lossTemp = pacific[x][2];
            let otTemp = pacific[x][3];

            pacific[x][0] = pacific[x + 1][0];
            pacific[x][1] = pacific[x + 1][1];
            pacific[x][2] = pacific[x + 1][2];
            pacific[x][3] = pacific[x + 1][3];
            pacific[x][4] = pacific[x + 1][4];

            pacific[x + 1][0] = teamTemp;
            pacific[x + 1][1] = winTemp;
            pacific[x + 1][2] = lossTemp;
            pacific[x + 1][3] = otTemp;
            pacific[x + 1][4] = temp;

            x = -1;
        }
    }
    return pacific;
}

function buildStandings() {
    generatePoints();

    let atlantic = sortAtlantic();
    let metro = sortMetro();
    let central = sortCentral();
    let pacific = sortPacific();

    atlantic_Standings = "ATLANTIC<br></br>";
    for(let i = 0; i < 8; i++) {
        atlantic_Standings = atlantic_Standings + atlantic[i][0] + ": " + atlantic[i][1] + "-" + atlantic[i][2] + "-" + atlantic[i][3] + " " + atlantic[i][4] + "<br></br>";
    }

    metro_Standings = "METRO<br></br>";
    for(let i = 0; i < 8; i++) {
        metro_Standings = metro_Standings + metro[i][0] + ": " + metro[i][1] + "-" + metro[i][2] + "-" + metro[i][3] + " " + metro[i][4] + "<br></br>";
    }

    central_Standings = "CENTRAL<br></br>";
    for(let i = 0; i < 8; i++) {
        central_Standings = central_Standings + central[i][0] + ": " + central[i][1] + "-" + central[i][2] + "-" + central[i][3] + " " + central[i][4] + "<br></br>";
    }

    pacific_Standings = "PACIFIC<br></br>";
    for(let i = 0; i < 8; i++) {
        pacific_Standings = pacific_Standings + pacific[i][0] + ": " + pacific[i][1] + "-" + pacific[i][2] + "-" + pacific[i][3] + " " + pacific[i][4] + "<br></br>";
    }
 
    document.getElementById("atlantic_standings").innerHTML = atlantic_Standings;
    document.getElementById("metro_standings").innerHTML = metro_Standings;
    document.getElementById("central_standings").innerHTML = central_Standings;
    document.getElementById("pacific_standings").innerHTML = pacific_Standings;
    document.getElementById("scoresheet").innerHTML = scoreStr;
    console.log(scoreStr);
}