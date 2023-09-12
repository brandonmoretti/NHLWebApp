import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("ChooseMode");
    }

    async getHtml() {
        return `
            <h1 class="mode_header">Choose Mode</h1>
            <div class="mode_buttons">
                <a href="/seasonbyfull">
                    <button class="insta_sim">Instant Sim</button>
                </a>
                <a href="/seasonbyweek">
                    <button class="weekly_sim">Weekly Sim</button>
                </a>
            </div>
            
        `;
    }
}