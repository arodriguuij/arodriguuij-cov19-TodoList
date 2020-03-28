class TodoListController {
    constructor(view, model) {
        this.todoList = model;
        this.todoListView = view;
    }

    rendeTodoList(){
        this.todoListView.render();
        this.getElementsDOM();
        this.addListeners();
        this.initializeInput();
        this.loadDataFromLocalstore(this.todoList);
    }

    getElementsDOM() {
        this.inputDOM = document.getElementsByClassName('form-control')[0];
        this.addButtonDOM = document.getElementsByClassName('btn-primary')[0];
        this.todoListDOM = document.getElementsByClassName('todo-list')[0];
        this.contentDOM = document.getElementById('content-todo-list');
    }
    addListeners() {
        this.inputDOM.addEventListener('keyup', (e) => this.addItem(e));
        this.addButtonDOM.addEventListener('click', (e) => this.addItem(e));
        this.todoListDOM.addEventListener('click', (e) => this.updateItem(e));
    }


    updateItem(e) {
        e.preventDefault();
        if (this.isMyClick(e.target, 'complete'))
            this.doTheAction(e.target, 'complete', (e) => this.completeItemDOM(e));
        else
            if (this.isMyClick(e.target, 'delete'))
                this.doTheAction(e.target, 'delete', (e) => this.removeItemDOM(e));
    }
    doTheAction(target, type, fn) {
        const id = parseInt(target.parentElement.id);
        fn(id);
        this.updateStateAndStorage(id, type);
    }
    isMyClick(target, type) {
        return target.className === type;
    }
    completeItemDOM(id) {
        document.getElementById(id).className
            ? document.getElementById(id).classList.remove('completed')
            : document.getElementById(id).classList.add('completed')
    }
    removeItemDOM(id) {
        document.getElementById(id).parentElement
            .removeChild(document.getElementById(id));
    }
    updateStateAndStorage(id, type) { 
        const index = this.todoList.getIndexOfItem(id);
        this.updateState(type, index);
        this.updateStorage();
    }
    updateState(type, index) {
        switch (type) {
            case 'complete':
                this.todoList.toggleItemDone(index);
                return null;
            case 'delete':
                this.todoList.deleteItem(index)
                return null;
            default:
                return null;
        }
    }

    addItem(e) {
        e.preventDefault();
        if (this.checkClickOrEnter(e))
            this.addTodoItem();
    }
    checkClickOrEnter(e) {
        return e.keyCode === 13 && this.checkInput(this.inputDOM.value)
            || e.type === 'click' && this.checkInput(this.inputDOM.value)
    }
    checkInput(input) {
        return input.trim() !== "";
    }
    addTodoItem() {
        const id = this.addItemState(this.inputDOM.value);
        this.addItemDOM(this.inputDOM.value, id);
    }
    addItemDOM(value, id, done = false) {
        const markup = `
        <li id=${id} ${done ? 'class="completed"' : ''}>${value}
            <a href="#" class="delete">❌</a>
            <a href="#" class="complete">✅</a>
        </li>
    `;
        this.todoListDOM.insertAdjacentHTML('beforeend', markup);
        this.initializeInput(this.inputDOM);
    }
    addItemState(value) {
        const id = this.todoList.addItem(value);
        this.updateStorage();
        return id;
    }
    initializeInput() {
        this.inputDOM.value = "";
        this.inputDOM.focus();
    }
    hiddenContent(boolean) {
        this.contentDOM.hidden = boolean;
    }
    loadListToUX(array) {
        array.forEach(item => this.addItemDOM(item.text, item.id, item.done, item.ismodify));
    }
    loadDataFromLocalstore(todoList) {
        let data = localStorage.getItem('TODO');
        if (data) {
            todoList.setItemList(JSON.parse(data));
            this.selectContent(todoList);
            this.loadListToUX(todoList.getList());
        } else {
            todoList.deleteList();
        }
    }

    updateStorage() {
        localStorage.setItem('TODO', JSON.stringify(this.todoList.getList()));
        this.selectContent();
    }
    selectContent() {
        this.todoList.getList().length === 0
            ? this.hiddenContent(false)
            : this.hiddenContent(true);
    }
}

export default TodoListController;