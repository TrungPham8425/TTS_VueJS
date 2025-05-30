<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/posts" class="nav-link">Blog Posts</router-link>
    </nav>

    <!-- Router View -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.nav {
  background-color: #42b983;
  padding: 1rem;
  margin-bottom: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}
</style>
