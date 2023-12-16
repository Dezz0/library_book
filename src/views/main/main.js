import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
import { Pagination } from "../../components/pagination/pagination";

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Поиск книг");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    async appStateHook(path) {
        if (path === "list" || path === "loading" || path === "favorites") {
            this.render();
        }
        if (path === "searchQuery") {
            this.appState.loading = true;
            this.appState.offset = 0;
            const data = await this.loadList(this.appState.searchQuery, this.appState.offset);
            this.appState.loading = false;
            this.appState.totalFound = data.num_found;
            this.appState.list = data.docs;
        }
        if (path === "offset") {
            this.appState.loading = true;

            const data = await this.loadList(this.appState.searchQuery, this.appState.offset);
            this.appState.loading = false;
            this.appState.list = data.docs;
        }
    }

    async loadList(q, offset) {
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=6`);
        return res.json();
    }

    render() {
        const main = document.createElement("div");

        main.append(new Search(this.appState).render());
        main.append(this.getMainTitle(`Найдено книг - ${this.appState.totalFound}`));
        main.append(new CardList(this.appState, this.appState.list).render());
        main.append(new Pagination(this.appState).render());
        this.app.innerHTML = "";
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
