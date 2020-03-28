import NavBarController from './NavBarController';
import NavBarView from '../Views/NavBarView';
import NavBar from '../Models/NavBar';
import TodoListController from './TodoListController';
import TodoListView from '../Views/TodoListView';
import TodoList from '../Models/TodoList';
import Cov19Controller from './Cov19Controller';
import Cov19Model from '../Models/Cov19Model';
import Cov19View from '../Views/Cov19View';
import PortafolioController from './PortafolioController';
import PortafolioView from '../Views/PortafolioView';
import Portafolio from '../Models/Portafolio'
import $ from 'jquery';

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.initialize();
    }

    initialize(){
        this.view.render();
        this.getElementDom();
        this.title.text = this.model.getAppName();
        this.navBar = new NavBar();
        this.listeners();
        this.navBar = new NavBarController(new NavBarView(), this.navBar, this.model.getAppName(), this.model.getMainView());
        this.updateMainContent();
    }

    getElementDom() {
        this.title = document.getElementsByTagName('title')[0];
        this.content = document.getElementsByClassName('content')[0]
    }

    listeners() {
        $(document).on(this.navBar.tabs[0], () => this.updateMainContent(this.navBar.tabs[0]));
        $(document).on(this.navBar.tabs[1], () => this.updateMainContent(this.navBar.tabs[1]));
        $(document).on(this.navBar.tabs[2], () => this.updateMainContent(this.navBar.tabs[2]));
    }

    updateMainContent(view = this.model.getMainView()) {
        this.cleanMainContent();
        this.model.setMainView(view);
        switch (this.model.mainView) {
            case this.navBar.tabs[0]:
                if (!this.todoListController)
                    this.todoListController = new TodoListController(new TodoListView(), new TodoList());
                this.todoListController.rendeTodoList();
                break;
            case this.navBar.tabs[1]:
                if (!this.cov19Controller)
                    this.cov19Controller = new Cov19Controller(new Cov19View(), new Cov19Model());
                this.cov19Controller.renderCov19();
                break;
            case this.navBar.tabs[2]:
                if(!this.portafolioController)
                    this.portafolioController = new PortafolioController(new PortafolioView(), new Portafolio());
                break;
            default: return;
        }
    }

    cleanMainContent() {
        this.content.innerHTML = '';
    }
}

export default Controller;