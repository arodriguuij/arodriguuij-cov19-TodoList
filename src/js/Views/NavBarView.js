class NavBar {
    constructor() { }

    render(tabs, nameApp) {
        const markup = `
            <nav class="navbar bg-light">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a id="logo-nav-bar" class="navbar-brand" href="/">${nameApp}</a>
                    </div>
                    <ul id="tabs-nav-bar" class="nav navbar-expand-sm">
                        <li ><a href="#">${tabs[0]}</a></li>
                        <li ><a href="#">${tabs[1]}</a></li>
                        <li ><a href="#">${tabs[2]}</a></li>
                    </ul>
                </div>
            </nav>    
            `;
        document.getElementsByClassName('navigation-bar')[0].insertAdjacentHTML('beforeend', markup);
    }
}

export default NavBar;