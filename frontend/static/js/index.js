import Start from "./views/Start.js";
import ChooseMode from "./views/ChooseMode.js";
import SeasonByFull from "./views/SeasonByFull.js";
import SeasonByWeek from "./views/SeasonByWeek.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Start},
        { path: "/choosemode", view: ChooseMode},
        { path: "/seasonbyweek", view: SeasonByWeek},
        { path: "/seasonbyfull", view: SeasonByFull}
    ];

    //Test each route 
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match){
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(match.route.view);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href);
        }
    })
    router();
}); 