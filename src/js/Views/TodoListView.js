class TodoListView {
    constructor() { }

    render(){
        const markup = `
            <div class="form-group">
                <h1>To-Do <small>List</small></h1>
                <div class="form">
                    <input type="text" class="form-control" placeholder="Your Task" name="task">
                </div>
                <button type="button" class="btn btn btn-primary">Add</button>
            </div>
            <div>
                <h3 id="content-todo-list" class='form-group'>Add me task! 😄</h3>
                <ul class="list-unstyled todo-list" id="todo">
                </ul>
            </div>
        `;
        document.getElementsByClassName('content')[0].insertAdjacentHTML('beforeend', markup);
    }
}

export default TodoListView;