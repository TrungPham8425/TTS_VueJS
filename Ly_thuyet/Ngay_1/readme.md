# 1. Tổng quan về VueJs

- VueJs là một framwork Js dùng để xây dựng giao diện người dùng và ứng dụng web đơn trang

* Đặc điểm chính

- Reactivity: Dữ liệu và UI tự đồng bộ
- Component-based: Chia nhỏ giao diện thành các khối độc lập.
- Two-way binding: Ràng buộc dữ liệu 2 chiều.
- Virtual DOM: Cập nhật giao diện hiệu quả.
- Hệ sinh thái mạnh: Vue Router, Pinia, Nuxt.js...

* Cú pháp đơn giản
<template>
  <h1>{{ message }}</h1>
</template>

<script>
export default {
  data() {
    return { message: "Hello Vue!" };
  }
}
</script>

- Ứng dụng

* Dùng cho web thương mại điện tử, giao diện admin hoặc SPA kết nối Laravel, Node.js, Django...

# 2. Cài đặt môi trường

- với Node.js và npm tải trên web: https://nodejs.org
- kiểm tra sau khi cài đặt dùng
  node -v
  npm -v

- Cài đặt Vue CLI dùng câu lệnh:npm install -g @vue/cli

# 3. Tạo dự án với Vue

- Tạo dự án mới: vue create my-project

# 5. Directives

- Vue cung cấp các directive (tiền tố v-) để tương tác với DOM.

* v-bind: Gán thuộc tính động
* v-on: Bắt sự kiện
* v-model: Ràng buộc 2 chiều

- VD:
  <img v-bind:src="imageUrl" />
  <button v-on:click="doSomething">Click</button>
  <input v-model="userInput" />

# 6. Template Syntax – Cú pháp mẫu trong Vue

- Vue sử dụng template-based syntax để render dữ liệu ra HTML một cách dễ hiểu và trực quan.

* 1. Interpolation – Nội suy dữ liệu

- Dùng {{ ... }} để chèn biến từ data() vào trong HTM
- VD:
  {{ message }}
