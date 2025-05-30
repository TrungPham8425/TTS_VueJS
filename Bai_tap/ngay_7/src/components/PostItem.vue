<template>
  <div class="post-item">
    <div class="post-content">
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-excerpt">{{ truncateText(post.body) }}</p>
      <div class="post-meta">
        <span class="post-author"
          >By: {{ post.user?.name || "Anonymous" }}</span
        >
      </div>
    </div>
    <div class="post-actions">
      <button @click="$emit('view')" class="btn btn-primary">View</button>
      <button @click="$emit('edit')" class="btn btn-secondary">Edit</button>
      <button @click="$emit('delete')" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    truncateText(text) {
      return text.length > 100 ? text.substring(0, 100) + "..." : text;
    },
  },
};
</script>

<style scoped>
.post-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.post-content {
  flex: 1;
  margin-right: 1rem;
}

.post-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #2c3e50;
}

.post-excerpt {
  color: #666;
  margin: 0 0 0.5rem;
  line-height: 1.5;
}

.post-meta {
  font-size: 0.875rem;
  color: #666;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #606c76;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
