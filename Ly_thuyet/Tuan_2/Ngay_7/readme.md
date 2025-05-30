# 1. Axios: Installation, GET/POST requests

- Installation:

* Để cài đặt Axios dùng câu lệnh:
  npm install axios

* Sử dụng GET/POST
  // services/api.js
  import axios from 'axios';
  const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  });

export default api;

- POST request

* Dùng để gửi dữ liệu lên API

# 2. Async/Await để lấy dữ liệu bất đồng bộ

- Async/Await cú pháp hiện đại của JavaScript để làm việc với các tác vụ bất đồng bộ, giúp viết code bất đồng bộ dễ đọc và gần giống code đồng bộ hơn.
  -async dùng để khai báo một hàm bất đồng bộ.
  -await dùng để "chờ" một Promise hoàn thành (resolve hoặc reject) trước khi tiếp tục thực thi code.

  VD:
  async function myFunction() {
  try {
  const result = await someAsyncOperation();
  console.log(result);
  } catch (error) {
  console.error(error);
  }
  }

# 3. Vue Apollo (GraphQL)

- Để cài Vue Apollo dùng cậu lệnh:
  npm install @vue/apollo-composable @apollo/client graphql
- Cấu hình:
  // apollo.js
  import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
  import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
uri: 'https://countries.trevorblades.com/', // ví dụ public API
});

const apolloClient = new ApolloClient({
link: httpLink,
cache: new InMemoryCache(),
});

export default apolloClient;
export { DefaultApolloClient };

// main.js
import { createApp, provide, h } from 'vue';
import App from './App.vue';
import apolloClient, { DefaultApolloClient } from './apollo';

createApp({
setup() {
provide(DefaultApolloClient, apolloClient);
},
render: () => h(App),
}).mount('#app');

# 4. GraphQL Queries (truy vấn dữ liệu)

- GraphQL là một ngôn ngữ truy vấn API cho phép client yêu cầu chính xác dữ liệu cần, không thừa không thiếu.

# 5. GraphQL Mutations (cập nhật dữ liệu)

- Dùng để thêm, cập nhật, xóa dữ liệu có cấu trúc bắt đầu bằng "mutation"
  VD:
  mutation {
  createUser(name: "John", email: "john@example.com") {
  id
  name
  email
  }
  }

# 6. Subscriptions (Cập nhật thời gian thực)

- Subscription sử dụng WebSocket để duy trì kết nối liên tục với server
- Khi dữ liệu được thay đổi (thêm, sửa, xoá), server sẽ gửi thông báo ngay lập tức tới các client đang lắng nghe.
- Muốn cập nhật thời gian thực cần cài thư viện này:npm install @apollo/client graphql @vue/apollo-composable graphql-ws

  VD:
  subscription OnNewUser {
  newUser {
  id
  name
  email
  }
  }

# 7. Xử lý lỗi (Error handling)

- GraphQL có thể trả về lỗi ở 2 cấp:

+Network error: Lỗi kết nối (mất mạng, lỗi server 500…).

+GraphQL error: Lỗi logic từ phía server (truy vấn sai, không có quyền...).

- Trong Vue với @vue/apollo-composable, bạn có thể xử lý lỗi với các hàm:

+useQuery

+useMutation

+useSubscription

=>Cả ba đều trả về biến error
