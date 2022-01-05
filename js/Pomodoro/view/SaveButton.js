import PomodoroAPI from "../api/PomodoroAPI.js";

export default class SaveButton {
  constructor(root) {
    root.addEventListener('click', () => {
      const inputTime = document.querySelectorAll('.pomodoro__input-time');
      inputTime.forEach(item => {
        const itemSectionId = Number(item.dataset.section);
        const itemTimeValue = item.value
        PomodoroAPI.setItem(itemSectionId, {time: itemTimeValue});
      });
      const timerElement = document.querySelector('.minute');
      const currSectionElement = document.querySelector('.pomodoro__section-button-active');
      const currSection = Number(currSectionElement.dataset.section_id);
      const [currTime] = PomodoroAPI.getItem(currSection);
      timerElement.textContent = currTime;
    });
  }
}