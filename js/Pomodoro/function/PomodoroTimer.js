import PomodoroAPI from "../api/PomodoroAPI.js";
import StartButton from "../view/StartButton.js";

export default class PomodoroTimer {
  static running = false;
  
  static initTimer() {
    const timerElement = {};
    timerElement.minute = document.querySelector('#minute');
    timerElement.second = document.querySelector('#second');
    [timerElement.minute.textContent] = PomodoroAPI.getItem(1);
    timerElement.second.textContent = "00";
  };

  static setTimer(time) {
    const timerElement = {};
    timerElement.minute = document.querySelector('#minute');
    timerElement.second = document.querySelector('#second');
    timerElement.minute.textContent = time;
    timerElement.second.textContent = "00";
  }

  static startTimer() {
    const timerElement = {};
    PomodoroTimer.running = true;
    timerElement.minute = document.querySelector("#minute")
    timerElement.second = document.querySelector("#second")

    let minuteInt = parseInt(timerElement.minute.innerHTML)
    let secondInt = parseInt(timerElement.second.innerHTML)

    window.countDown = setInterval(() => {
      secondInt--;
      if (secondInt == 0 && minuteInt == 0) {
        clearInterval(window.countDown)
        PomodoroTimer.running = false;
        StartButton.buttonChange();
      } else if (secondInt == -1) {
        secondInt = 59;
        minuteInt--;
      }
      timerElement.second.innerHTML = padNumber(secondInt);
      timerElement.minute.innerHTML = padNumber(minuteInt);
    }, 1000)
  }

  static stopTimer() {
    clearInterval(window.countDown);
    delete window.countDown;
    PomodoroTimer.running = false;
  }
}

function padNumber(num) {
  let numToStr = (num < 10 ? '0' : '') + num.toString()
  return numToStr
}