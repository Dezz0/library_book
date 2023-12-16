import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";

export class FavoritesView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Мои книги");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === "favorites") {
            this.render();
        }
    }

    render() {
        const favorites = document.createElement("div");
        favorites.append(this.getMainTitle(`Избранное`));
        favorites.append(new CardList(this.appState, this.appState.favorites).render());
        this.app.innerHTML = "";
        this.app.append(favorites);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
