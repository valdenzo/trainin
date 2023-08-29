<template>
    <div
        class="bg-slate-100 rounded mt-1 p-2 cursor-pointer flex justify-between items-center task"
        :ref="taskElem"
        draggable="true"
        @dragstart="onDragStart"
        @click="openTaskEditModal"
    >
        <div class="w-full">
            <h2 class="font-semibold">{{ task.title }}</h2>
            <div>{{ assignee?.name }}</div>
        </div>
        <div
            class="hover:bg-red-200 delete-btn"
            @click.stop="deleteTask"
        >
            🗑️
        </div>
    </div>
</template>
<script setup>
import { inject, ref, watch, computed } from 'vue';
import { useTaskStore } from '../store/task';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

const emitter = inject('emitter')
const store = useTaskStore()

const taskElem = ref(null)
const assignee = computed(() => {
    return store.assignees.find(assignee => assignee.id === props.task.assignee_id)
})

function onDragStart(event) {
    event.dataTransfer.setData('task-id', props.task.id);
    event.dataTransfer.setData('taskElement', taskElem);
}

function openTaskEditModal() {
    emitter.emit('openTaskEditModal', { taskId: props.task.id })
}

async function deleteTask() {
    await store.deleteTask(props.task.id);
}
</script>
<style>
.delete-btn {
    display: none;
}

.task:hover .delete-btn {
    display: block;
}
</style>