# 1. Pinia: Installation, store creation

- Là thư viện dùng để quản lý trạng thái chính thức cho Vue 3
- Cách cài đặt:

* nhập câu lệnh "npm install pinia" trong terminal để cài thư viện

- sau khi cài đặt tạo store để quản lý
  // main.js
  import { createApp } from 'vue'
  import App from './App.vue'
  import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

# 2. State: Defining reactive state

- Là nơi chứa dữ liệu trung tậm, được reactive(tự động cập nhật giao diện khai thay đổi)

VD:
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
state: () => ({
count: 0,
name: 'Vue User'
})
})

# 3. Getters: Computed-like properties

- Dùng để tính toán từ state, có cache
  VD:
  getters: {
  doubleCount: (state) => state.count \* 2,
  greeting: (state) => `Hello, ${state.name}`
  }

# 4. Actions: Sync and async operations

- Dùng để thay đổi state, có thể đồng bộ hoặc bất đồng bộ
  VD:
  actions: {
  increment() {
  this.count++
  },
  async fetchCountFromApi() {
  const response = await fetch('https://api.example.com/count')
  const data = await response.json()
  this.count = data.count
  }
  }

# 5. Plugins: Extending Pinia

- Dùng để mở rộng tính năng store như logger, persist state...

- VD:

// plugins/logger.js
export function myLogger({ store }) {
store.$subscribe((mutation, state) => {
    console.log(`[${mutation.storeId}]`, mutation, state)
})
}

<!-- Bổ sung trong main.js -->

import { myLogger } from './plugins/logger'
pinia.use(myLogger)

# 6. Devtools: Tích hợp Vue Devtools

- Pinia hoạt động tốt với Vue Devtools, không cần cấu hình gì thêm.
- Mỗi store sẽ hiện trên tab "Pinia" trong Devtools.
