import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("SeasonByFull");
    }

    async getHtml() {
        return `
            <h1 class="full_season_header">Season Complete</h1>
        `;
    }
}