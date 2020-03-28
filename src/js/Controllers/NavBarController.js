import $ from 'jquery';

class NavBarController {
    constructor(view, model, nameApp, mainView) {
        this.view = view;
        this.mainView = mainView;
        this.nameApp = nameApp;
        this.tabs = model.tabs;
        this.view.render(model.tabs, nameApp);

        this.getElementsDOM();
        this.addListeners();
        this.updateActiveTab(this.mainView)
    }

    getElementsDOM() {
        this.navbarLogo = document.getElementById('logo-nav-bar');
        this.navbarTabs = document.getElementById('tabs-nav-bar');
    }

    addListeners() {
        this.navbarLogo.addEventListener('click', (e) => this.clickLogo(e));
        this.navbarTabs.addEventListener('click', (e) => this.clickTab(e));
    }

    clickLogo(e) {
        this.updateActiveTab(e.target.textContent);
        e.preventDefault();
        const id = this.tabs.indexOf(this.mainView);
        $(document).trigger(this.tabs[id]);
    }
    
    clickTab(e) {
        this.updateActiveTab(e.target.textContent);
        e.preventDefault();
        switch (e.target.textContent) {
            case this.tabs[0]: $(document).trigger(this.tabs[0]); break;
            case this.tabs[1]: $(document).trigger(this.tabs[1]); break;
            case this.tabs[2]: $(document).trigger(this.tabs[2]); break;
            default: return;
        }
    }

    updateActiveTab(text) {
        Array.from(this.navbarTabs.children).forEach(html => {
            this.removeActiveClass(html);
            this.addActiveClass(text, html);
        });

    }
    removeActiveClass(html) {
        html.classList.contains('active') && html.classList.remove('active');
    }
    addActiveClass(text, html) {
        if (text === this.nameApp) {
            if (html.textContent === this.mainView) {
                html.classList.add('active');
            }
        }
        if (html.textContent === text) {
            html.classList.add('active');
        }
    }
}

export default NavBarController;