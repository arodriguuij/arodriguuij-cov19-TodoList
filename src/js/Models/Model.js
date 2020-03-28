class Model {
    constructor() {
        this.mainView = 'COV-19'; //TodoList - COV-19 - Other
        this.nameApp = '40tena';
    }
    getAppName() {
        return this.nameApp;
    }
    getMainView() {
        return this.mainView;
    }
    setMainView(view) {
        this.mainView = view;
    }
}
export default Model;