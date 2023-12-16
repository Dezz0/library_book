export class AbstractView {
    constructor() {
        this.app = document.getElementById("root");
    }

    setTitle(title) {
        document.title = title;
    }

    getMainTitle(text) {
        const title = document.createElement("h1");
        title.classList.add("title_page");
        title.innerHTML = text;
        return title;
    }

    render() {
        return;
    }

    destroy() {
        return;
    }
}
