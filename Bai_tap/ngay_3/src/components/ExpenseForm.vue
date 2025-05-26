<template>
  <!-- Form nhập liệu khoản chi -->
  <form @submit.prevent="submitForm" class="expense-form">
    <!-- Tên khoản chi -->
    <input
      v-model="form.name"
      type="text"
      placeholder="Tên khoản chi"
      @keyup.enter="submitForm"
      class="input"
    />
    <span v-if="errors.name" class="error">{{ errors.name }}</span>

    <!-- Số tiền -->
    <input
      v-model.number="form.amount"
      type="number"
      placeholder="Số tiền"
      class="input"
    />
    <span v-if="errors.amount" class="error">{{ errors.amount }}</span>

    <!-- Danh mục -->
    <select v-model="form.category" class="input">
      <option value="">Chọn danh mục</option>
      <option>Ăn uống</option>
      <option>Đi lại</option>
      <option>Giải trí</option>
    </select>
    <span v-if="errors.category" class="error">{{ errors.category }}</span>

    <!-- Ngày -->
    <input v-model="form.date" type="date" class="input" />
    <span v-if="errors.date" class="error">{{ errors.date }}</span>

    <!-- Nút submit -->
    <button type="submit" @click.stop :disabled="hasError" class="btn-submit">
      Thêm
    </button>
  </form>
</template>

<script>
export default {
  name: "ExpenseForm",
  emits: ["submit"],
  data() {
    return {
      // Dữ liệu form
      form: {
        name: "",
        amount: null,
        category: "",
        date: "",
      },
      // Object chứa lỗi
      errors: {},
    };
  },
  computed: {
    // Kiểm tra xem form có lỗi không
    hasError() {
      return Object.keys(this.errors).length > 0;
    },
  },
  methods: {
    // Hàm kiểm tra dữ liệu đầu vào
    validate() {
      this.errors = {};

      // Kiểm tra tên
      if (!this.form.name || this.form.name.length < 3) {
        this.errors.name = "Tên phải có ít nhất 3 ký tự.";
      }

      // Kiểm tra số tiền
      if (!this.form.amount || this.form.amount <= 0) {
        this.errors.amount = "Số tiền phải lớn hơn 0.";
      }

      // Kiểm tra danh mục
      if (!this.form.category) {
        this.errors.category = "Vui lòng chọn danh mục.";
      }

      // Kiểm tra ngày (không được là tương lai)
      const today = new Date().toISOString().split("T")[0];
      if (!this.form.date || this.form.date > today) {
        this.errors.date = "Ngày không hợp lệ.";
      }
    },

    // Hàm xử lý submit form
    submitForm() {
      this.validate();
      if (!this.hasError) {
        // Phát sự kiện và truyền dữ liệu cho component cha
        this.$emit("submit", { ...this.form });

        // Reset form
        this.form = {
          name: "",
          amount: null,
          category: "",
          date: "",
        };
      }
    },
  },
  watch: {
    // Cảnh báo nếu số tiền vượt quá 1 triệu
    "form.amount"(val) {
      if (val > 1000000) {
        alert("Số tiền vượt quá giới hạn cho phép!");
      }
    },
  },
};
</script>

<style scoped>
/* Giao diện form */
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

/* Input và select đẹp hơn */
.input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: #42b983;
  outline: none;
}

/* Lỗi hiển thị dưới mỗi input */
.error {
  color: red;
  font-size: 0.8em;
  margin-left: 4px;
}

/* Nút Thêm */
.btn-submit {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.btn-submit:hover:not(:disabled) {
  background-color: #369f70;
}
</style>
