export default class PomodoroAPI {
  static getItem(sectionId) {
    const data = read();
    const pomodoroSection = data.find(section => section.id === sectionId);

    if (!pomodoroSection) {
      return []
    }

    return pomodoroSection.time;
  }

  static setItem(sectionId, newData) {
    const data = read();
    const pomodoroSection = data.find(section => section.id === sectionId);

    if (!pomodoroSection) {
      throw new Error("Section can't be found");
    }

    pomodoroSection.time = newData.time === pomodoroSection.time ? pomodoroSection.time : newData.time;
    save(data)
  }
}

function read() {
  const json = localStorage.getItem("pomodoro-time");

  if (!json) {
    return [
      {
        id: 1,
        title: "Pomodoro",
        time: 25,
      },
      {
        id: 2,
        title: "Short Break",
        time: 5,
      },
      {
        id: 3,
        title: "Long Break",
        time: 15,
      }
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("pomodoro-time", JSON.stringify(data));
}