# 1. Vue Material: Installation & Core Components

- Vue Material là thư viện giao diện dựa trên Google Material Design dành cho Vue.js.
- Để cài đặt Vue Material dùng câu lệnh:
  npm install vue-material --save
- Để sử dụng cần phải nhúng thư viện trong main.js
  // main.js
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

VD:
<template>

  <div>
    <md-button @click="show = true">Nhấn tôi</md-button>
    <md-snackbar :md-active.sync="show">Thông báo đơn giản</md-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({ show: false })
}
</script>

# 2. Theming: Tùy chỉnh Material UI

- Vue Material hỗ trợ tùy biến chủ đề (theming) để thay đổi màu sắc chủ đạo (primary, accent, background, warn...).

VD:

<!-- js -->

Vue.material.theme.register('custom', {
primary: 'teal',
accent: 'pink',
warn: 'deep-orange',
background: 'white'
})

<!-- Giao dien -->
<template>
  <div class="md-layout" md-theme="custom">
    <md-button class="md-primary">Màu chính</md-button>
    <md-button class="md-accent">Màu phụ</md-button>
  </div>
</template>

# 3. Layouts: Grid, Card, Navigation Drawer

- Vue Material hỗ trợ layout bằng hệ thống lưới (md-layout, md-layout-item) giống như Flexbox, cùng với các thành phần như md-card và md-drawer.

VD:
<template>

  <div class="md-layout">
    <md-layout md-column>
      <md-card>
        <md-card-header>
          <div class="md-title">Tiêu đề</div>
        </md-card-header>
        <md-card-content>
          Nội dung thẻ
        </md-card-content>
      </md-card>
    </md-layout>

    <md-drawer :md-active.sync="drawer" md-permanent="full">
      <md-list>
        <md-list-item>Menu 1</md-list-item>
        <md-list-item>Menu 2</md-list-item>
      </md-list>
    </md-drawer>

  </div>
</template>

<script>
export default {
  data: () => ({ drawer: true })
}
</script>

# 4. Responsive Design: Breakpoints, Media Queries

- Material UI sử dụng các breakpoint giúp thiết kế responsive
VD:
<template>
  <div>
    <div v-if="isMobile">Mobile Layout</div>
    <div v-else>Desktop Layout</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: window.innerWidth <= 768
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth <= 768
    }
  }
}
</script>

# 5. Accessibility: ARIA Attributes

- Dùng để hỗ trợ trợ năng
VD:
<template>
<md-button aria-label="Đóng menu" @click="toggleMenu">
<md-icon>menu</md-icon>
</md-button>
  <div v-if="open" role="navigation" aria-expanded="true">
    <p>Menu đang mở</p>
  </div>
</template>

<script>
export default {
  data: () => ({ open: false }),
  methods: {
    toggleMenu() {
      this.open = !this.open
    }
  }
}
</script>

# 6. Component Composition: Higher-order Components (HOC)

- Là thành phần cao cấp nhận một component là đối số và trả về component đã mở rộng chức năng
