import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
      <div class="kanban__dropzone"></div>
    `).children[0];

    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('kanban__dropzone-active');
    });
    
    dropZone.addEventListener('dragleave', e => {
      e.preventDefault();
      dropZone.classList.remove('kanban__dropzone-active');
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('kanban__dropzone-active');

      const columnElement = dropZone.closest('.kanban__column');
      const columnIdTarget = Number(columnElement.dataset.id);

      const dropZoneInColumn = Array.from(columnElement.querySelectorAll('.kanban__dropzone'));
      const droppedIndex = dropZoneInColumn.indexOf(dropZone);

      const itemId = Number(e.dataTransfer.getData("text/plain"));
      const droppedElement = document.querySelector(`[data-id="${itemId}"]`);
      const insertAfter = dropZone.parentElement.classList.contains('kanban__item') ? dropZone.parentElement : dropZone;
      insertAfter.after(droppedElement);

      KanbanAPI.updateItem(itemId, {
        columnId: columnIdTarget,
        position: droppedIndex,
      });
    });

    return dropZone;
  }
}