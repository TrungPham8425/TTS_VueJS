<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Confirm",
    },
  },
  emits: ["close", "confirm"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close");
    };

    const confirm = () => {
      emit("confirm");
      closeModal();
    };

    return {
      closeModal,
      confirm,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #666;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-secondary {
  background-color: #9e9e9e;
  color: white;
}
</style>
