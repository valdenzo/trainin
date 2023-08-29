<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="modal-mask">
                <div class="modal-container">
                    <div class="modal-header flex justify-between">
                        <slot name="header">default header</slot>
                        <div class="cursor-pointer" @click="closeModal">X</div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">default body</slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { inject, ref, onUnmounted } from 'vue'

const emitter = inject('emitter')
const open = ref(false)

const emit = defineEmits(['onClose', 'onOpen'])

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

emitter.on(`open${props.name}Modal`, openModal)
function openModal(data) {
    open.value = true

    emit('onOpen', data)
}

emitter.on(`close${props.name}Modal`, closeModal)
function closeModal() {
    open.value = false

    emit('onClose')
}

onUnmounted(() => {
    emitter.off(`open${props.name}Modal`, openModal)
    emitter.off(`close${props.name}Modal`, closeModal)
})
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>