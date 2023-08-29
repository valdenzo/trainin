<template>
    <Modal name="TaskCreate" @onOpen="onOpen" @onClose="onClose">
        <template #header>
            <h2>Create Task</h2>
        </template>
        <template #body>
            <form>
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
        </template>
        <template #footer>
            <button
                class="rounded bg-green-600 hover:bg-green-400 w-full mt-1 text-white px-2 py-1"
                @click="addTask"
            >
                Create
            </button>
        </template>
    </Modal>
</template>
<script setup>
import Modal from '@/components/Modal.vue';
import { useTaskStore } from '../store/task';
import { ref, inject } from "vue"

const initialState = {
    title: '',
    description: '',
    assignee_id: '',
    swimline_id: ''
}

const form = ref(null)

const store = useTaskStore();
const emitter = inject('emitter')

function onClose() {
}

function onOpen(data) {
    form.value = { ...initialState, swimline_id: data.swimlineId };
}

async function addTask() {
    await store.addTask(form.value);

    emitter.emit('closeTaskCreateModal')
}
</script>