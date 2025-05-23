# 1. Functional Components: Declaration, Lifecycle

- Functional components là các component không có state nội bộ và không có lifecycle riêng, dùng để tăng hiệu năng khi chỉ cần hiển thị đơn giản.
- VD:
<template functional>
  <div>{{ props.text }}</div>
</template>
- Lifecycle: Không có lifecycle hooks
- Ưu điểm: Nhẹ, nhanh, dùng cho giao diện đơn giản.
- Hạn chế: Không có data, methods, this.

# 2. Props: Passing Data, Prop Validation

Dùng để truyền dữ liệu từ cha sang con:

- Cách dùng:
  <!-- Parent -->
  <Child :msg="parentMsg" />
  <!-- Child -->
  <div>{{ msg }}</div>
  <script>
  export default { props: ['msg'] }
  </script>

# 3. Events: Emitting custom events

- Dùng để gửi dữ liệu hoặc sự kiện lên parent thông qua $emit
- Sự kiện tùy chỉnh, parent phải lắng nghe bằng v-on.
- VD:
  <!-- Child -->

  <button @click="$emit('my-event', data)">Click</button>
  <!-- Parent -->

  <Child @my-event="handle" />
  <script>
  export default {
    methods: { handle(data) { console.log(data) } }
  }
  </script>

# 4. Events: Phát sự kiện từ con lên cha

- Dùng để gửi dữ liệu lên componet bằng $emit
- VD:
  <!-- Con.vue -->
  <template>
    <button @click="$emit('increase', 1)">+1</button>
  </template>

<!-- Cha.vue -->
<template>
  <Counter @increase="handleIncrease" />
</template>
<script>
methods: {
  handleIncrease(value) {
    this.count += value;
  }
}
</script>

# 5. Slots: Default và Named Slots

- Default:

* Nếu cha không truyền gì, slot sẽ rỗng (hoặc hiển thị fallback bạn định nghĩa).
* Nếu cha có nội dung, nội dung đó thế vào thẻ <slot></slot>.
  <!-- BaseCard.vue -->
  <template>
  <div class="card">
  <slot></slot>
  </div>
  </template>

    <!-- Dùng BaseCard -->
    <BaseCard>
      <p>Đây là nội dung slot mặc định.</p>
    </BaseCard>

- Named Slots:

* Khi component cần nhiều vị trí nhét nội dung khác nhau (header, body, footer…), ta đặt tên cho slot.
  <!-- BaseLayout.vue -->
  <template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  </template>
  <!-- BaseLayout.vue -->
  <template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main>
  </template>

# 6. Dynamic components & keep-alivec

- Dynamic Components:

* dùng để thay đổi component được render theo biến mà không cần dùng v-if
  VD:
  <component :is="componentName" />

- Keep-alive

* Dùng để cache component động hoặc giúp bảo lưu trạng thái dữ liệu, DOM, lifecycle

# 7. Đăng ký component: Local vs Global

- Global Component

* Component được đăng ký toàn cục thì có thể sử dụng ở bất kỳ đâu trong app mà không cần import lại.

VD: Đăng ký thẻ <BaseButton />

<!-- Đăng ký trong main.js -->

import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.mount('#app')

- Local Component

- Chỉ dùng được bên trong component cha đã import và khai báo nó
VD:
<script setup>
import BaseCard from '@/components/BaseCard.vue'
</script>

<template>
  <BaseCard>
    Nội dung trong BaseCard
  </BaseCard>
</template>
