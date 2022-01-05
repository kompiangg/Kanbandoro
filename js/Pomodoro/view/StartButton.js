import PomodoroTimer from "../function/PomodoroTimer.js";

export default class StartButton {
  constructor(root) {
    this.elements = {};
    this.elements.root = root;
    this.elements.root.addEventListener('click', () => {
      if (PomodoroTimer.running) {
        this.elements.root.classList.remove('pomodoro__start-button-active');
        PomodoroTimer.stopTimer();
        this.elements.root.textContent = 'Start';
      } else {
        this.elements.root.classList.add('pomodoro__start-button-active');
        PomodoroTimer.startTimer();
        this.elements.root.textContent = 'Stop';
      }
    });
  }

  static buttonChange() {
    const buttonElement = document.querySelector('.pomodoro__start-button');
    if (PomodoroTimer.running) {
      buttonElement.classList.add('pomodoro__start-button-active');
      buttonElement.textContent = 'Stop';
    } else {
      buttonElement.classList.remove('pomodoro__start-button-active');
      buttonElement.textContent = 'Start';
    }
  }
}