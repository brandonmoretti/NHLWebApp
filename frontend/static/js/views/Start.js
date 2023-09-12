import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("NHL Season Simulator");
    }

    async getHtml() {
        return `
            <h1 class="start_header">NHL Season Simulator</h1>
            <div class="start_button_container">
                <a href="/choosemode" data-link>
                    <button class="start_button">START</button>
                </a>
            </div>
        `;
    }
}