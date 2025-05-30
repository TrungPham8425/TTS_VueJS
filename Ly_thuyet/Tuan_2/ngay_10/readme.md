# 1. Custom Directives: Tạo logic tái sử dụng

- Dùng để viết logic riêng xử lý trên DOM giống như v-model, v-focus,...
  VD:

<!--  main.js hoặc nơi khai báo directive -->

app.directive('focus', {
mounted(el) {
el.focus();
}
});

<!-- Giao diện -->
<input v-focus />

# 2. Mixins vs Composition API

- Mixins: dùng để chia sẻ locgic tái sử dụng
- Composition API: dùng để tổ chức logic rõ ràng, linh hoạt và tái sử dụng
  VD:
    <!-- useCounter.js -->
  import { ref } from 'vue'
  export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
  }
  <!-- Giao diện -->
  <script setup>
  import { useCounter } from './useCounter'
  const { count, increment } = useCounter()
  </script>

# 3. Provide/Inject: Dependency Injection

- Dùng để chia sẻ dữ liệu giữa component cha và component con dù không cùng cấp với nhau

VD:

<!-- file cha -->
<script setup>
import { provide } from 'vue'
provide('theme', 'dark')
</script>
<!-- File con -->

  <script setup>
  import { inject } from 'vue'
  const theme = inject('theme')
  </script>

<template>
  <div>Chủ đề hiện tại: {{ theme }}</div>
</template>

# 4. Teleport: Hiển thị bên ngoài cây DOM hiện tại

- Dùng để render một phần tử với vị trí khác nhau trong DOM

VD:
<template>
<button @click="open = true">Mở Modal</button>
<teleport to="body">

<div v-if="open" class="modal">
<p>Đây là modal</p>
<button @click="open = false">Đóng</button>
</div>
</teleport>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

# 5. VueUse: Bộ tiện ích Composition

- Là thư viện composable tiện ích giúp viết logic nhanh hơn, như theo dõi chuột, clipboard...

- Để cài đặt sử dụng câu lệnh:npm install @vueuse/core

VD:

<script setup>
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
</script>

<template>
  <p>Mouse: ({{ x }}, {{ y }})</p>
</template>

# 6. Refactoring: Từ Options API sang Composition API

- Dùng để tổ chức logic rõ dàng hơn theo tính năng thay vì lifecycle
