import PomodoroAPI from "../api/PomodoroAPI.js";

export default class Settings {
  constructor(root, id) {
    this.elements = {};
    this.elements.root = root;

    this.elements.child = Settings.createChild();

    this.elements.pomodoroSectionTitle = this.elements.child.querySelector('p');
    this.elements.pomodoroSectionTime = this.elements.child.querySelector('input');
    
    [this.elements.time, this.elements.title] = PomodoroAPI.getItem(id);
    this.elements.pomodoroSectionTitle.textContent = this.elements.title;
    this.elements.pomodoroSectionTime.value = this.elements.time;
    this.elements.pomodoroSectionTime.dataset.section = id;

    this.elements.root.appendChild(this.elements.child);
  }

  static createChild() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    <div class="col-md-4 text-center">
      <p></p>
      <input type="number" min="0" step="1" class="pomodoro__input-time" placeholder="0">
    </div>
    `).children[0];
  }
}