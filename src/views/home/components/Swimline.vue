<template>
    <div class="bg-slate-200 max-w-[300px] px-2 swimline">
        <h2>{{ props.swimline.title }}</h2>
        <div
            class="drop-container"
            @dragover.prevent="onDragOver"
            @drop="onDrop"
        >
            <Task v-for="(task, key) in filteredTasks" :task="task" :key="key"/>
            <div class="add-button mt-2">
                <button
                    class="btn btn-primary bg-green-100 w-full my-2"
                    @click="openTaskCreateModal"
                >
                    Add Task +
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import Task from './Task.vue';
import { useTaskStore } from '../store/task';
import { inject, ref, onUnmounted } from 'vue';

const props = defineProps({
    swimline: {
        type: Object,
        required: true
    }
})

const store = useTaskStore()
const emitter = inject('emitter')

const filteredTasks = ref(props.swimline.tasks)

async function onDrop(event) {
    const taskId = event.dataTransfer.getData('task-id');
    const swimlineId = props.swimline.id;

    await store.moveTask(taskId, swimlineId);
}

function onDragOver(event) {
    const taskId = event.dataTransfer.getData('task-id');
    const taskElem = event.dataTransfer.getData('taskElement');
}

function openTaskCreateModal() {
    emitter.emit('openTaskCreateModal', { swimlineId: props.swimline.id })
}

emitter.on('onFilter', onFilter)
function onFilter(data) {
    if (data?.assignee_id?.length) {
        filteredTasks.value = props.swimline.tasks.filter(task => data.assignee_id.includes(task.assignee_id))
    } else {
        filteredTasks.value = props.swimline.tasks
    }

    console.log(filteredTasks.value)
}

onUnmounted(() => {
    emitter.off('onFilter', onFilter)
})
</script>
<style>
.swimline {
    min-height: 500px;
}
.swimline .add-button {
    display: none;
}

.swimline:hover .add-button {
    display: block;
}
</style>