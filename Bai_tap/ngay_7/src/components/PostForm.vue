<template>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div v-if="error" class="form-error">
      {{ error }}
    </div>

    <div class="form-group">
      <label for="title">Title</label>
      <input
        id="title"
        v-model.trim="formData.title"
        type="text"
        class="form-control"
        required
        :class="{ error: errors.title }"
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="body">Content</label>
      <textarea
        id="body"
        v-model.trim="formData.body"
        class="form-control"
        rows="5"
        required
        :class="{ error: errors.body }"
      ></textarea>
      <span v-if="errors.body" class="error-message">{{ errors.body }}</span>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? "Saving..." : post ? "Update" : "Create" }}
      </button>
      <button type="button" class="btn btn-secondary" @click="handleCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  props: {
    post: {
      type: Object,
      default: null,
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
  data() {
    return {
      formData: {
        title: "",
        body: "",
      },
      errors: {
        title: "",
        body: "",
      },
    };
  },
  watch: {
    post: {
      handler(newPost) {
        if (newPost) {
          this.formData = {
            title: newPost.title || "",
            body: newPost.body || "",
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  methods: {
    validateForm() {
      this.errors = {
        title: "",
        body: "",
      };

      if (!this.formData.title) {
        this.errors.title = "Title is required";
      } else if (this.formData.title.length < 3) {
        this.errors.title = "Title must be at least 3 characters";
      }

      if (!this.formData.body) {
        this.errors.body = "Content is required";
      } else if (this.formData.body.length < 10) {
        this.errors.body = "Content must be at least 10 characters";
      }

      return !this.errors.title && !this.errors.body;
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit("submit", {
          title: this.formData.title.trim(),
          body: this.formData.body.trim(),
        });
      }
    },
    handleCancel() {
      this.resetForm();
      this.$emit("cancel");
    },
    resetForm() {
      this.formData = {
        title: "",
        body: "",
      };
      this.errors = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
.post-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.form-error {
  background-color: #fde8e8;
  color: #dc3545;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid #fecaca;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #42b983;
}

.form-control.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
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
</style>
