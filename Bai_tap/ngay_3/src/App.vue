<template>
  <div class="container">
    <h1>Quản lý Chi tiêu Cá nhân</h1>

    <!-- Component lọc theo danh mục -->
    <CategoryFilter
      :categories="categories"
      v-model:selectedCategory="selectedCategory"
    />

    <!-- Form thêm khoản chi -->
    <ExpenseForm :categories="categories" @submit="addExpense" />

    <!-- Danh sách khoản chi đã lọc -->
    <ExpenseList :expenses="filteredExpenses" @delete="deleteExpense" />

    <!-- Hiển thị tổng chi tiêu -->
    <div class="total">
      <strong>Tổng chi tiêu:</strong> {{ totalAmount.toLocaleString() }} đ
    </div>

    <!-- Biểu đồ chi tiêu -->
    <ExpenseChart :expenses="expenses" />
  </div>
</template>

<script>
// Import các component con
import ExpenseForm from "./components/ExpenseForm.vue";
import ExpenseList from "./components/ExpenseList.vue";
import CategoryFilter from "./components/CategoryFilter.vue";
import ExpenseChart from "./components/ExpenseChart.vue";

export default {
  components: {
    ExpenseForm,
    ExpenseList,
    CategoryFilter,
    ExpenseChart,
  },
  data() {
    return {
      // Danh sách các khoản chi
      expenses: [],
      // Danh sách danh mục mặc định
      categories: ["Ăn uống", "Di chuyển", "Giải trí"],
      // Danh mục đang được chọn để lọc
      selectedCategory: "",
    };
  },
  computed: {
    // Lọc danh sách khoản chi theo danh mục đang chọn
    filteredExpenses() {
      if (!this.selectedCategory) return this.expenses;
      return this.expenses.filter((e) => e.category === this.selectedCategory);
    },
    // Tính tổng số tiền chi tiêu từ danh sách đã lọc
    totalAmount() {
      return this.filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    },
  },
  methods: {
    // Thêm khoản chi mới, tạo id trước khi thêm
    addExpense(expense) {
      const newExpense = {
        ...expense,
        id: Date.now(), // tạo id đơn giản theo thời gian hiện tại
      };
      this.expenses.push(newExpense);
    },
    // Xoá khoản chi theo ID
    deleteExpense(id) {
      this.expenses = this.expenses.filter((e) => e.id !== id);
    },
  },
  watch: {
    // Theo dõi danh sách chi tiêu để lưu vào localStorage
    expenses: {
      handler(newVal) {
        localStorage.setItem("expenses", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  created() {
    // Tải dữ liệu từ localStorage khi khởi động
    const data = localStorage.getItem("expenses");
    if (data) {
      this.expenses = JSON.parse(data);
    }
  },
};
</script>

<style scoped>
/* Phần tử bao ngoài căn giữa và giới hạn chiều rộng */
.container {
  max-width: 640px;
  margin: 30px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Tiêu đề */
h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

/* Tổng chi tiêu */
.total {
  text-align: right;
  font-size: 18px;
  margin-top: 24px;
  color: #222;
}
</style>
