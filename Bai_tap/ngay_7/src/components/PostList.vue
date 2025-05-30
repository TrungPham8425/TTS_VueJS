<template>
  <div class="post-list">
    <div v-if="loading" class="loading">Loading posts...</div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="btn btn-primary">Retry</button>
    </div>
    <div v-else-if="posts.length === 0" class="no-posts">
      <p>No posts found.</p>
    </div>
    <template v-else>
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @view="$emit('view', post)"
        @edit="$emit('edit', post)"
        @delete="$emit('delete', post)"
      />
    </template>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
  name: "PostList",
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.loading,
.error,
.no-posts {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  color: #606c76;
}

.error {
  color: #dc3545;
}

.error button {
  margin-top: 1rem;
}

.no-posts {
  color: #606c76;
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

.btn:hover {
  opacity: 0.9;
}
</style>
