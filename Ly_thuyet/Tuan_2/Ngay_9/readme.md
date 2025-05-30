# 1. Performance: v-once, v-memo Directives

- v-once: Chỉ render một lần, không cập nhật lại DOM sau đó
- v-memo: Cho phép ghi nhớ DOM nếu không thay đổi trong dependency
VD:
<template>
  <div>
    <h1 v-once>Đây là tiêu đề tĩnh</h1>
    <p v-memo="[count]">Giá trị được ghi nhớ: {{ count }}</p>
    <button @click="count++">Tăng</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

# 2.Lazy Loading: Dynamic Imports

- Dùng để giúp chia nhỏ ứng dụng thành các chunk và chỉ load khi cần giúp giảm thời gian tải ban đầu

VD:
// router.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
{
path: '/about',
component: () => import('./views/AboutView.vue') // lazy-loaded
}
]

export default createRouter({
history: createWebHistory(),
routes
})

# 3. Testing: Vitest, Vue Test Utils

- Vitest: Là framework hiện đại, nhanh, tích hợp tốt với Vite
- Vue Test Utils: Là thư viện chính thức của Vue để test component

* Để cài đặt sử dụng câu lệnh:npm install vitest @vue/test-utils --save-dev

# 4. Unit Tests: Components, Directives

-Unit test tập trung vào kiểm thử thành phần nhỏ, độc lập như component, hàm, directive.
VD:

<!-- Counter.vue -->
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<!-- Counter.test.js -->

import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

test('increments count on click', async () => {
const wrapper = mount(Counter)
await wrapper.trigger('click')
expect(wrapper.text()).toBe('1')
})

# 5. Integration Tests: API Interactions

- Integration test kiểm tra toàn bộ luồng, bao gồm giao tiếp API, store, UI.
  VD:
  <!-- UserList.vue -->
  <template>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
const users = ref([])

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  users.value = await res.json()
})
</script>

 <!-- UserList.test.js -->

import { mount } from '@vue/test-utils'
import UserList from './UserList.vue'

global.fetch = vi.fn(() =>
Promise.resolve({
json: () => Promise.resolve([{ id: 1, name: 'Alice' }])
})
)

test('fetches and renders users', async () => {
const wrapper = mount(UserList)
await new Promise(r => setTimeout(r, 0)) // wait for fetch
expect(wrapper.text()).toContain('Alice')
})

# 6. Error Boundaries: Handling Runtime Errors

- Dùng để bắt lỗi runtime của component con

VD:

  <!-- ErrorBoundary.vue -->
  <template>
    <div v-if="error">Đã có lỗi xảy ra: {{ error.message }}</div>
    <slot v-else />
  </template>

<script>
export default {
  data: () => ({ error: null }),
  errorCaptured(err) {
    this.error = err
    return false // chặn tiếp tục bubbling lỗi
  }
}
</script>
<!-- App.vue -->
<template>
  <ErrorBoundary>
    <BrokenComponent />
  </ErrorBoundary>
</template>
