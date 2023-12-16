import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add("header");
        this.el.innerHTML = `
            <div>
                <img  src="/static/logo.svg" alt="logo"/>
            </div>
            <div class="menu">
               <a class="menu__item" href="#">
                    <img  src="/static/search.svg" alt="search"/>
                    Поиск книг
               </a>
               <a class="menu__item" href="#favorites">
                    <img  src="/static/favorites.svg" alt="favorites"/>
                    Избранное
                    <div class="menu__counter">
                        ${this.appState.favorites.length}
                    </div>
               </a>
            </div>
        `;

        const hrefOfPage = document.location.href;
        this.el.querySelectorAll("a").forEach((a) => {
            if (hrefOfPage === a.href) {
                a.style.fontWeight = 700;
            }
        });

        return this.el;
    }
}
