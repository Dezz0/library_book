import { DivComponent } from "../../common/div-component";
import "./pagination.css";

export class Pagination extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    #dencreasePage() {
        this.appState.offset -= 6;
    }

    #increasePage() {
        this.appState.offset += 6;
    }

    render() {
        if (!this.appState.list.length) {
            this.el.innerHTML = "";
            return this.el;
        }

        if (!this.appState.loading) {
            this.el.classList.add("pagination");
            this.el.innerHTML = `
                <div class="footer_pagination">
                    <button class="footer_pagination__btn back" style="display:${
                        !this.appState.offset ? "none" : "flex"
                    }">
                        <img src="/static/arrow_back.svg" alt="back"/>
                        <span>
                            Предыдущая страница
                        </span>
                    </button>
                    <button class="footer_pagination__btn forward">
                        <span>
                            Следующая страница
                        </span>
                    <img src="/static/arrow_forward.svg" alt="forward"/>
                    </button>
                </div> 
            `;

            this.el.querySelector(".back").addEventListener("click", this.#dencreasePage.bind(this));
            this.el.querySelector(".forward").addEventListener("click", this.#increasePage.bind(this));
        }

        return this.el;
    }
}
