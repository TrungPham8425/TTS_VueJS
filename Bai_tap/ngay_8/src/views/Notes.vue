<template>
  <div class="notes-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/" custom v-slot="{ navigate, isActive }">
              <button
                @click="navigate"
                class="menu-item"
                :class="{ active: isActive }"
              >
                Trang chủ
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/notes" custom v-slot="{ navigate, isActive }">
              <button
                @click="navigate"
                class="menu-item"
                :class="{ active: isActive }"
              >
                Danh sách ghi chú
              </button>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="main-content">
      <h1 class="notes-title">Notes</h1>
      <div class="notes-content">
        <note-form @submitNote="handleSubmit" :noteToEdit="noteToEdit" />
        <note-list
          :notes="notes"
          @editNote="handleEdit"
          @deleteNote="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import NoteForm from "@/components/NoteForm.vue";
import NoteList from "@/components/NoteList.vue";
import useNotes from "@/composables/useNotes.js";

export default {
  /* eslint-disable no-undef */

  name: "NotesView",
  components: {
    NoteForm,
    NoteList,
  },
  setup() {
    const { notes, addNote, updateNote, deleteNote } = useNotes();
    const noteToEdit = ref(null);

    function handleSubmit(note) {
      if (noteToEdit.value) {
        updateNote(noteToEdit.value.id, note);
        noteToEdit.value = null;
      } else {
        addNote(note);
      }
    }

    function handleEdit(note) {
      noteToEdit.value = note;
    }

    function handleDelete(noteId) {
      deleteNote(noteId);
    }

    return {
      notes,
      noteToEdit,
      handleSubmit,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.notes-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.sidebar-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.sidebar-header h2 {
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #64748b;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-item:hover {
  background-color: #f8fafc;
  color: #2c3e50;
}

.menu-item.active {
  background-color: #42b88320;
  color: #42b883;
  font-weight: 500;
}

.icon {
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.main-content {
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
}

.notes-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #42b883;
}

.notes-content {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .notes-container {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .notes-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .notes-content {
    padding: 1rem;
  }
}
</style>
