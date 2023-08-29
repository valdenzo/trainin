<template>
    <Filters />
    <div class="grid grid-cols-6 gap-2">
        <template v-if="store.swimlines">
            <Swimline v-for="(swimline, key) in store.swimlines" :swimline="swimline" :key="key" />
        </template>
    </div>
    <TaskCreateModal />
    <TaskEditModal />
</template>
<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from './store/task';
import Swimline from './components/Swimline.vue';
import TaskCreateModal from './components/TaskCreateModal.vue';
import TaskEditModal from './components/TaskEditModal.vue';
import Filters from './components/Filters.vue';

const store = useTaskStore();

onMounted(async () => {
    await store.getTasks();
})
</script>