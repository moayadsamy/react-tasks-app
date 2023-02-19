import axios from "axios";

class Task {
  constructor(
    name,
    category,
    details,
    startDate,
    endDate,
    userId,
    status = "waiting",
    id
  ) {
    this.name = name;
    this.category = category;
    this.details = details;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.status = status;
    this.id = id;
  }

  async save() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    try {
      let response = await axios.post(
        `https://react-tasks-f78c1-default-rtdb.firebaseio.com/${userId}.json?auth=${token}`,
        {
          name: this.name,
          category: this.category,
          details: this.details,
          startDate: this.startDate,
          endDate: this.endDate,
          status: this.status,
          userId: this.userId,
        }
      );
      this.id = response.data.name;
      return this;
    } catch (error) {
      return null;
    }
  }

  async update() {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.put(
        `https://react-tasks-f78c1-default-rtdb.firebaseio.com/tasks/${this.id}.json?auth=${token}`,
        {
          name: this.name,
          category: this.category,
          details: this.details,
          startDate: this.startDate,
          endDate: this.endDate,
          status: this.status,
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete() {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.delete(
        `https://react-tasks-f78c1-default-rtdb.firebaseio.com/${this.userId}/${this.id}.json?auth=${token}`
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  static async read() {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `https://react-tasks-f78c1-default-rtdb.firebaseio.com/${userId}.json?auth=${token}`
      );
      let tasks = [];
      for (let key in response.data) {
        let object = response.data[key];
        let task = new Task(
          object.name,
          object.category,
          object.details,
          object.startDate,
          object.endDate,
          object.userId,
          object.status,
          key
        );
        tasks.push(task);
      }
      return tasks;
    } catch (error) {
      return [];
    }
  }
}

export default Task;
