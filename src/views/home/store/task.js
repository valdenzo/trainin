import { defineStore } from "pinia";
import { tasks } from "../../../mocks/tasks";

export const useTaskStore = defineStore('task', {
    state: () => ({
        loading: false,
        swimlines: null,
        assignees: null,
    }),

    actions: {
      // mock api call
      async getTasks() {
        this.loading = true;

        const data = await mockApiCall(tasks)
        this.swimlines = data.swimlines;
        this.assignees = data.assignees;

        this.loading = false;
      },
      async moveTask(taskId, swimlineId) {
        await mockApiCall({taskId, swimlineId});
      },
      async addTask(form) {
        const swimline = this.swimlines.find(swimline => swimline.id === form.swimline_id)

        swimline.tasks.push(form)

        await mockApiCall(form)
      },
      async getTask(taskId) {
        const task = this.swimlines.flatMap(swimline => swimline.tasks).find(task => task.id === taskId)

        return await mockApiCall(task)
      },
      async updateTask(form) {
        const task = this.swimlines.flatMap(swimline => swimline.tasks).find(task => task.id === form.id)

        Object.assign(task, form)

        await mockApiCall(form)
      },
      async deleteTask(taskId) {
        const task = this.swimlines.flatMap(swimline => swimline.tasks).find(task => task.id === taskId)
        const swimline = this.swimlines.find(swimline => swimline.id === task.swimline_id)

        swimline.tasks.splice(swimline.tasks.indexOf(task), 1)

        await mockApiCall(taskId)
      }
    },
})

async function mockApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    })
}