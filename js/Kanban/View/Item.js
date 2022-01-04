import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
  constructor (id, content) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector('.kanban__item-input');
    
    this.elements.root.appendChild(bottomDropZone);
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;

    this.elements.input.addEventListener("blur", () => {
      const newContent = this.elements.input.textContent.trim();

      if (this.content == newContent) {
        return;
      };

      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content
      });
    });

    this.elements.input.addEventListener("dblclick", () => {
      const confirmation = confirm(`Are you sure to delete task ${this.content}?`);

      if (!confirmation) {
        return;
      }

      KanbanAPI.deleteItem(id);
      this.elements.root.remove();
    });

    this.elements.root.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", id);
    });

    this.elements.input.addEventListener('drop', e => {
      e.preventDefault();
    });
  }

  static createRoot() {
    const range = document.createRange();
    
    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
        <div class="kanban__item-input" contenteditable></div>
      </div>
    `).children[0];
  }
}