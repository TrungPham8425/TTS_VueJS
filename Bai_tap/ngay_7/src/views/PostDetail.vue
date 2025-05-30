<template>
  <div class="post-detail">
    <div v-if="loading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="refetch" class="btn btn-primary">Retry</button>
    </div>
    <template v-else-if="post">
      <div class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-author"
            >By: {{ post.user?.name || "Anonymous" }}</span
          >
        </div>
      </div>

      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>

      <div class="comments-section">
        <h2>Comments</h2>
        <div v-if="comments.length" class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-header">
              <strong>{{ comment.name }}</strong>
              <span class="comment-email">{{ comment.email }}</span>
            </div>
            <p class="comment-body">{{ comment.body }}</p>
          </div>
        </div>
        <div v-else class="no-comments">No comments yet.</div>
      </div>
    </template>
    <div v-else class="not-found">
      <h2>Post not found</h2>
      <router-link to="/posts" class="btn btn-primary"
        >Back to Posts</router-link
      >
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h2>Delete Post</h2>
        <p>Are you sure you want to delete this post?</p>
        <div class="modal-actions">
          <button
            @click="handleDelete"
            class="btn btn-danger"
            :disabled="deleteLoading"
          >
            {{ deleteLoading ? "Deleting..." : "Delete" }}
          </button>
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_POST } from "@/graphql/queries";
import { DELETE_POST } from "@/graphql/mutations";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PostDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showDeleteModal = ref(false);
    const deleteLoading = ref(false);
    const deleteError = ref(null);

    const { result, loading, error, refetch } = useQuery(GET_POST, () => ({
      id: route.params.id,
    }));

    const post = computed(() => result.value?.post || null);
    const comments = computed(() => result.value?.comments || []);

    const { mutate: deletePost } = useMutation(DELETE_POST);

    const confirmDelete = () => {
      showDeleteModal.value = true;
      deleteError.value = null;
    };

    const handleDelete = async () => {
      deleteLoading.value = true;
      deleteError.value = null;

      try {
        const result = await deletePost({
          variables: {
            id: route.params.id,
          },
        });

        if (result.data?.deletePost !== null) {
          router.push("/posts");
        } else {
          throw new Error("Không thể xóa bài viết");
        }
      } catch (err) {
        console.error("Delete error:", err);
        deleteError.value = err.message || "Có lỗi xảy ra khi xóa bài viết";
      } finally {
        deleteLoading.value = false;
      }
    };

    return {
      post,
      comments,
      loading,
      error,
      showDeleteModal,
      deleteLoading,
      deleteError,
      confirmDelete,
      handleDelete,
      refetch,
    };
  },
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 2rem;
}

h1 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.post-meta {
  color: #606c76;
  font-size: 0.875rem;
}

.post-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.comments-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comments-section h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.comment {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  margin-bottom: 0.5rem;
}

.comment-email {
  color: #606c76;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.comment-body {
  margin: 0;
  line-height: 1.5;
}

.no-comments {
  text-align: center;
  color: #606c76;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.btn:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
