export default class KanbanAPI {
  static getiItems(columnId) {
    const data = read();
    const column = data.find(e => e.id === columnId);

    if (!column) {
      return [];
    }
    return column.items;
  }

  static insertItem(columnId, contentWillInsert) {
    const data = read();
    const column = data.find(e => e.id === columnId);

    if (!column) {
      throw new Error("Column ID not found");
    }

    let random = Math.floor(Math.random() * 100000);

    while (!isIdValid(random)) {
      random = Math.floor(Math.random() * 100000);
    }

    const item = {
      id: random,
      items: contentWillInsert
    }

    column.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find(item => item.id === itemId)
        if (item) {
          return [item, column]
        }
        return [undefined, undefined]
      }
    })();

    if (!item) {
      throw new Error("File not found");
    }

    item.content = newProps.content === undefined ? item.content : newProps.content;

    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find(column => column.id === newProps.columnId);

      if (!targetColumn) {
        throw new Error("Target column not found");
      }

      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }

  static deleteItem(itemId) {
    const data = read()

    for (const column of data) {
      const item = column.items.find(item => item.id === itemId)

      if (item) {
        column.items.splice(column.items.indexOf(item), 1)
      }
    }

    save(data)
  }
}

function isIdValid(idItem) {
  const data = read();
  const item = data.forEach(column => column.items.find(item => item.id === idItem))

  if (!item) {
    return true;
  }
  return false;
}

function read() {
  const json = localStorage.getItem('kanban-data');

  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      }
    ]
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem('kanban-data', JSON.stringify(data));
}