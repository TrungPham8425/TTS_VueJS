<template>
  <div class="posts">
    <div class="posts-header">
      <h1>Blog Posts</h1>
      <button @click="showCreateForm = true" class="btn btn-primary">
        Create New Post
      </button>
    </div>

    <PostList
      :posts="posts"
      :loading="loading"
      :error="error"
      @view="viewPost"
      @edit="editPost"
      @delete="confirmDelete"
      @retry="fetchPosts"
    />

    <div v-if="!loading && !error && totalPages > 1" class="pagination">
      <button
        class="btn btn-secondary"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        Previous
      </button>

      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        class="btn btn-secondary"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Create/Edit Form Modal -->
    <div v-if="showCreateForm || editingPost" class="modal">
      <div class="modal-content">
        <h2>{{ editingPost ? "Edit Post" : "Create New Post" }}</h2>
        <PostForm
          :post="editingPost"
          :loading="mutationLoading"
          :error="mutationError"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deletingPost" class="modal">
      <div class="modal-content">
        <h2>Delete Post</h2>
        <p>Are you sure you want to delete "{{ deletingPost.title }}"?</p>
        <div class="modal-actions">
          <button
            @click="handleDelete"
            class="btn btn-danger"
            :disabled="mutationLoading"
          >
            {{ mutationLoading ? "Deleting..." : "Delete" }}
          </button>
          <button @click="deletingPost = null" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery, useMutation } from "@vue/apollo-composable";
import { GET_POSTS } from "@/graphql/queries";
import { CREATE_POST, UPDATE_POST, DELETE_POST } from "@/graphql/mutations";
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "PostsPage",
  components: {
    PostList,
    PostForm,
  },
  setup() {
    const router = useRouter();
    const showCreateForm = ref(false);
    const editingPost = ref(null);
    const deletingPost = ref(null);
    const mutationLoading = ref(false);
    const mutationError = ref(null);

    const currentPage = ref(1);
    const limit = ref(10);
    const totalPages = ref(0);

    const { result, loading, error, refetch } = useQuery(GET_POSTS);

    const posts = computed(() => {
      const allPosts = result.value?.posts || [];
      const start = (currentPage.value - 1) * limit.value;
      const end = start + limit.value;
      return allPosts.slice(start, end);
    });

    const total = computed(() => result.value?.posts?.length || 0);

    watch(total, (newTotal) => {
      totalPages.value = Math.ceil(newTotal / limit.value);
    });

    const { mutate: createPost } = useMutation(CREATE_POST);
    const { mutate: updatePost } = useMutation(UPDATE_POST);
    const { mutate: deletePost } = useMutation(DELETE_POST);

    const viewPost = (post) => {
      router.push(`/posts/${post.id}`);
    };

    const editPost = (post) => {
      editingPost.value = { ...post };
      showCreateForm.value = true;
    };

    const confirmDelete = (post) => {
      deletingPost.value = post;
    };

    const closeForm = () => {
      showCreateForm.value = false;
      editingPost.value = null;
      mutationError.value = null;
    };

    const handlePageChange = async (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };

    const handleSubmit = async (formData) => {
      mutationLoading.value = true;
      mutationError.value = null;

      try {
        if (editingPost.value) {
          const result = await updatePost({
            variables: {
              id: editingPost.value.id,
              input: {
                title: formData.title,
                body: formData.body,
              },
            },
          });

          if (result.data?.updatePost) {
            closeForm();
            await refetch();
          } else {
            throw new Error("Không thể cập nhật bài viết");
          }
        } else {
          const result = await createPost({
            variables: {
              input: {
                title: formData.title,
                body: formData.body,
                userId: 1,
              },
            },
          });

          if (result.data?.createPost) {
            closeForm();
            await refetch();
          } else {
            throw new Error("Không thể tạo bài viết mới");
          }
        }
      } catch (err) {
        console.error("Mutation error:", err);
        mutationError.value = err.message || "Có lỗi xảy ra khi lưu bài viết";
      } finally {
        mutationLoading.value = false;
      }
    };

    const handleDelete = async () => {
      if (!deletingPost.value) return;

      mutationLoading.value = true;
      mutationError.value = null;

      try {
        const result = await deletePost({
          variables: {
            id: deletingPost.value.id,
          },
        });

        if (result.data?.deletePost !== null) {
          deletingPost.value = null;
          if (posts.value.length === 1 && currentPage.value > 1) {
            currentPage.value--;
          }
          await refetch();
        } else {
          throw new Error("Không thể xóa bài viết");
        }
      } catch (err) {
        console.error("Delete error:", err);
        mutationError.value = err.message || "Có lỗi xảy ra khi xóa bài viết";
      } finally {
        mutationLoading.value = false;
      }
    };

    return {
      posts,
      loading,
      error,
      showCreateForm,
      editingPost,
      deletingPost,
      mutationLoading,
      mutationError,
      currentPage,
      totalPages,
      viewPost,
      editPost,
      confirmDelete,
      closeForm,
      handleSubmit,
      handleDelete,
      handlePageChange,
      fetchPosts: refetch,
    };
  },
};
</script>

<style scoped>
.posts {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  margin: 0;
  color: #2c3e50;
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

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
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
  transition: background-color 0.2s;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.page-info {
  font-size: 0.9rem;
  color: #606c76;
}
</style>
