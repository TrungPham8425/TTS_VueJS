<template>
  <div class="container">
    <h2>Thêm người dùng</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" type="text" placeholder="Tên" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Gửi</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
            }),
          }
        );

        const data = await response.json();
        this.message = `Gửi thành công! ID trả về: ${data.id}`;
      } catch (error) {
        this.message = "Gửi thất bại!";
        console.error(error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 40px auto;
}
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}
button {
  padding: 8px 16px;
}
</style>
