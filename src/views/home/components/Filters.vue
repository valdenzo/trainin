<template>
    <div v-for="(assignee, key) in store.assignees" :key="key" class="flex items-center">
        <div>
            <input
                class="mr-2"
                type="checkbox"
                :value="assignee.id"
                v-model="filters.assignee_id"
                @change="emitter.emit('onFilter', filters)"
            >
            <label>{{ assignee.name }}</label>
        </div>
    </div>
</template>
<script setup>
import { useTaskStore } from '../store/task';
import { inject, ref } from 'vue'

const store = useTaskStore();
const emitter = inject('emitter')

const filters = ref({
    assignee_id: []
})
</script>