# 1. CSS scoping: Scoped styles in components

- Dùng để giới hạn vi style ảnh hưởng tới component
VD:
<template>
  <div class="title">Hello</div>
</template>

<style scoped>
.title {
  color: blue;
}
</style>

# 2. Tailwind CSS: Installation, utilities

- Tailwind là framework CSS utility-first, dùng class sẵn có để style nhanh.
- Để cài Tailwind CSS nhập 2 câu lệnh trong terminal:
  npm install -D tailwindcss
  npx tailwindcss init

# 3. CSS transitions: v-enter, v-leave

- Vue dùng các class như v-enter, v-leave để tạo hiệu ứng chuyển đổi khi element xuất hiện hoặc ẩn đi.
- VD:
<transition name="fade">
  <p v-if="show">Hello</p>
</transition>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

# 4. Animation: Transition-group for lists

- transition-group dùng để animate danh sách item khi thêm, xóa, hoặc sắp xếp.
-Cần đặt tag cho thẻ bao ngoài, animation tương tự transition.
VD:
<transition-group name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</transition-group>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

# 5. External libraries: Animate.css integration

- Animate.css là thư viện CSS animation dễ dùng, có thể import và dùng class sẵn.
VD:
<template>
  <div class="animate__animated animate__bounce">
    Animate.css example
  </div>
</template>

# 6. Style bindings: Inline styles, classes

- Vue hỗ trợ bind style/class động qua object hoặc array.
VD:
<template>
  <div :class="{ active: isActive, 'text-red': hasError }" 
       :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    Dynamic style and class
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: false,
      activeColor: 'blue',
      fontSize: 16
    }
  }
}
</script>
