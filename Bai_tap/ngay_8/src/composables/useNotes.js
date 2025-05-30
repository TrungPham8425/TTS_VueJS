import { reactive, watch } from "vue";

export default function useNotes() {
  const notes = reactive(JSON.parse(localStorage.getItem("notes") || "[]"));

  function addNote(note) {
    notes.push(note);
  }

  function updateNote(id, updatedNote) {
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) notes[index] = updatedNote;
  }

  function deleteNote(id) {
    const index = notes.findIndex((n) => n.id === id);
    if (index !== -1) notes.splice(index, 1);
  }

  watch(
    notes,
    (newNotes) => {
      localStorage.setItem("notes", JSON.stringify(newNotes));
    },
    { deep: true }
  );

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}
