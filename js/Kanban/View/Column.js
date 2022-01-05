import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
  constructor (id, title) {
    const topDropZone = DropZone.createDropZone();
    
    this.elements = {};
    
    this.elements.root = Column.createRoot();

    this.elements.root.dataset.id = id;
    
    this.elements.title = this.elements.root.querySelector(".kanban__title");
    this.elements.items = this.elements.root.querySelector(".kanban__item");
    this.elements.horizontalLine = this.elements.root.querySelector(".kanban__item");
    this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
    
    this.elements.horizontalLine.appendChild(topDropZone);
    this.elements.title.textContent = title;

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "");
      this.renderItem(newItem.id, newItem.newContent);
    });

    KanbanAPI.getItems(id).forEach(item => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="col-md-4 kanban__column">
        <div class="kanban__title"></div>
        <hr class="kanban__hr">
        <div class="kanban__item"></div>
        <button type="button" class="kanban__add-item">+</button>
      </div>
    `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}