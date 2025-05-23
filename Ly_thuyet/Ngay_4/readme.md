# 1. Vue Router: Installation, setup

- Để cài đặt Vue Router dùng câu lệnh: npm install vue-router@4
- Dùng để quản lý và điều hướng giữa các trang trong vue

# 2. Routes: Static và Dynamic routes

- Static route: Đường dẫn cố định

* VD:
  { path: '/about', component: AboutPage }

- Dynamic route: đường dẫn có tham số (param)

* VD:
  { path: '/user/:id', component: UserPage }

# 3. Route params và query

- Route params: Tham số trong URL, ví dụ /user/:id, lấy bằng this.$route.params.id.
- Query params: Tham số truy vấn, ví dụ /search?keyword=vue, lấy bằng this.$route.query.keyword.

# 4. Nested routes: Parent-child routing

- Cho phép khai báo routes lồng nhau, tạo cấu trúc route theo cây

* VD:
  {
  path: '/user/:id',
  component: User,
  children: [
  { path: 'profile', component: UserProfile },
  { path: 'posts', component: UserPosts }
  ]
  }

# 5. Navigation guards: beforeEnter, beforeEach

- beforeEnter: Guard cục bộ trên route, kiểm tra trước khi vào route đó.
- beforeEach: Guard toàn cục, chạy trước mỗi lần chuyển route, dùng để kiểm tra xác thực, phân quyền...

# 6. Programmatic navigation: router.push

- Điều hướng bằng code, thay vì dùng <router-link>.

* VD:
  this.$router.push('/home')
