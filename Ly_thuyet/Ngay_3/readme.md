<!-- Form và Tính toán động trong Vue.js -->

# 1. Form Binding: v-model với Inputs và Modifiers

- v-model là cách liên kết dữ liệu hai chiều giữa input và data trong compoent
- Áp dụng được cho các thẻ: input, textarea, select...
- VD: Modifiers

.lazy: cập nhật data sau khi blur (mất focus), thay vì mỗi lần gõ phím
<input v-model.lazy="message" />

.number: ép kiểu dữ liệu thành số.
<input v-model.number="age" />

.trim: loại bỏ khoảng trắng đầu/cuối.
<input v-model.trim="name" />

# 2. Computed Properties (Thuộc tính tính toán)

- Dùng để xử lý dữ liệu động từ các biến trong data
- Có bộ nhớ đệm(caching), chỉ tính lại khi dữ liệu quan thay đổi
- VD:
  computed: {
  fullName() {
  return this.firstName + ' ' + this.lastName;
  }
  }

# 3. Watchers (Theo dõi dữ liệu)

- Dùng để theo dõi sự thay đổi của biên và thực hiện hành động thích hợp để xử lý bất đồng bộ hoặc logic
- VD:
  watch: {
  formData: {
  handler(newVal) {
  console.log('Dữ liệu thay đổi:', newVal);
  },
  deep: true,
  immediate: true
  }
  }

# 4. Form Validation (Xác thực biểu mẫu)

- Validation trong vue được tích hợp sẵn, nhưng thường dùng thư viện như Vuelidate, vee-validate
- VD:
  computed: {
  isValid() {
  return this.name !== '' && this.email.includes('@');
  }
  }

# 5. Event Modifiers (Bộ biến đổi sự kiện)

- Dùng để ngăn chặn hoặc thay đổi hành vi sự kiện
- VD:
<form @submit.prevent="submitForm">
  <button @click.stop="doSomething">Click</button>
</form>

# 6. Keyboard Events (Sự kiện bàn phím)

- Vue hỗ trợ rút gọn khi bắt sự kiện bàn phím, có thể dùng các modife như .enter, .esc, .tab
  -VD:
  <input @keyup.enter="submitForm" />
