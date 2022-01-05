import PomodoroTimer from "../function/PomodoroTimer.js";
import StartButton from "./StartButton.js";

export default class Section {
  constructor (root, dataSection) {
    this.elements = {};
    this.elements.root = root;

    this.elements.child = Section.createChild();
    this.elements.child.dataset.section_id = dataSection.id;
    this.elements.time = dataSection.time;

    this.elements.child.textContent = dataSection.title;
    
    if (dataSection.id == 1) {
      this.elements.child.classList.add('pomodoro__section-button-active');
    }

    this.elements.child.addEventListener('click', () => {
      if (PomodoroTimer.running) {
        PomodoroTimer.stopTimer();
        const confirmation = confirm('Are you sure want to change section? You will lose your progress');
        if (confirmation) {
          StartButton.buttonChange();
        } else {
          PomodoroTimer.startTimer();
          return;
        }
      }
      document.querySelector('.pomodoro__section-button-active').classList.toggle('pomodoro__section-button-active');
      this.elements.child.classList.toggle('pomodoro__section-button-active');
      PomodoroTimer.setTimer(dataSection.time);
    });

    this.elements.root.appendChild(this.elements.child);
  }

  static createChild() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <button class="pomodoro__section-button" type="button"></button>
    `).children[0];
  }
}