import PomodoroAPI from "../api/PomodoroAPI.js";
import SaveButton from "./SaveButton.js";
import Settings from "./Settings.js";

export default class Pomodoro {
  constructor() {
    const settingsModalBoxRoot = document.querySelector('.pomodoro__modal-settings');
    const saveButtonModalBoxRoot = document.querySelector('#pomodo__save-button');
    const pomodoroDataArr = PomodoroAPI.getArrItem();

    pomodoroDataArr.forEach(e => {
      new Settings(settingsModalBoxRoot, e.id);
    });

    new SaveButton(saveButtonModalBoxRoot);
  }
}