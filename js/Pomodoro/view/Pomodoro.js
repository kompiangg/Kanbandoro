import PomodoroAPI from "../api/PomodoroAPI.js";
import PomodoroTimer from "../function/PomodoroTimer.js";
import SaveButton from "./SaveButton.js";
import Section from "./Section.js";
import Settings from "./Settings.js";
import StartButton from "./StartButton.js";

export default class Pomodoro {
  constructor() {
    this.elements = {};
    this.elements.settingsModalBoxRoot = document.querySelector('.pomodoro__modal-settings');
    this.elements.saveButtonModalBoxRoot = document.querySelector('#pomodo__save-button');
    this.elements.sectionRoot = document.querySelector('.pomodoro__sections');
    this.elements.startButton = document.querySelector('.pomodoro__start-button');
    this.elements.pomodoroDataArr = PomodoroAPI.getArrItem();

    this.elements.pomodoroDataArr.forEach(e => {
      new Settings(this.elements.settingsModalBoxRoot, e.id);
      new Section(this.elements.sectionRoot, e);
    });
    new SaveButton(this.elements.saveButtonModalBoxRoot);
    PomodoroTimer.initTimer();
    new StartButton(this.elements.startButton);
  }
}