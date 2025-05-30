<template>
  <div class="home">
    <h1>Welcome to Blog Management</h1>
    <p>
      This is a simple blog management system built with Vue.js and GraphQL.
    </p>
    <router-link to="/posts" class="btn btn-primary"
      >View Blog Posts</router-link
    >
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #3aa876;
}
</style>
