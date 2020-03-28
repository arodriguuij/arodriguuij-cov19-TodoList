import Item from './Item';

class ItemList{
    constructor(){
        this.list = [];
    }
    getList(){
        return this.list;
    }
    setItemList(list){
        this.list = list;
    }
    deleteList(){
        this.getList().length = 0;
    }
    toggleItemDone(index){
        this.getList()[index].done = !this.getList()[index].done;
    }
    deleteItem(index){
        this.getList().splice(index, 1);
    }

    getIndexOfItem(id) {
        const item = this.getList().find(e => e.id === id);
        return this.getList().indexOf(item);
    }
    addItem(value){
        const item = new Item(Date.now(), value, false);
        this.getList().push(item);
        return item.id;
    }
}

export default ItemList;
