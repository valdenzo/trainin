<template>
    <Modal name="TaskEdit" @onOpen="onOpen" @onClose="onClose">
        <template #header>
            <h2>Create Task</h2>
        </template>
        <template #body>
            <form v-if="form">
                <div>
                    <label class="block" for="title">Title</label>
                    <input v-model="form.title" class="border rounded border-slate-500 w-full px-2 py-1" type="text" name="title" >
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea v-model="form.description" class="border rounded border-slate-500 w-full px-2 py-1" name="description" cols="30" rows="3" />
                </div>
                <div>
                    <label for="assigne_id">Assignee</label>
                    <select v-model="form.assignee_id" class="border rounded border-slate-500 w-full px-2 py-1" name="assigne_id">
                        <option value="">Select a user</option>
                        <option
                            v-for="(assignee, key) in store.assignees"
                            :value="assignee.id"
                            :key="key"
                        >
                            {{ assignee.name }}
                        </option>
                    </select>
                </div>
            </form>
            <div v-else>
                Loading...
            </div>
        </template>
        <template #footer>
            <button
                class="rounded bg-green-600 hover:bg-green-400 w-full mt-1 text-white px-2 py-1"
                @click="updateTask"
            >
                Edit
            </button>
        </template>
    </Modal>
</template>
<script setup>
import Modal from '@/components/Modal.vue';
import { useTaskStore } from '../store/task';
import { ref, inject } from "vue"

const form = ref(null)

const store = useTaskStore();
const emitter = inject('emitter')

function onClose() {
    form.value = null;
}

async function onOpen(data) {
    form.value = {...await store.getTask(data.taskId)};
}

async function updateTask() {
    await store.updateTask(form.value);

    emitter.emit('closeTaskEditModal')
}
</script>