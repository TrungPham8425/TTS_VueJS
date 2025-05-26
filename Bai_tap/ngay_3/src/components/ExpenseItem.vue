<template>
  <!-- Hiển thị thông tin khoản chi -->
  <div class="expense-item">
    <div class="expense-info">
      <strong class="expense-name">{{ expense.name }}</strong>
      <span class="expense-amount">{{ formatCurrency(expense.amount) }}</span>
      <div class="expense-meta">
        {{ expense.category }} | {{ expense.date }}
      </div>
    </div>

    <!-- Nút xóa -->
    <button class="btn-delete" @click.stop="emitDelete" title="Xóa">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    expense: Object,
  },
  emits: ["delete"],
  methods: {
    emitDelete() {
      this.$emit("delete", this.expense.id);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }).format(amount);
    },
  },
};
</script>

<style scoped>
/* Giao diện khoản chi */
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.expense-item:hover {
  background-color: #f1f1f1;
}

/* Thông tin bên trái */
.expense-info {
  display: flex;
  flex-direction: column;
}

/* Tên khoản chi */
.expense-name {
  font-size: 16px;
  color: #333;
}

/* Số tiền */
.expense-amount {
  font-weight: bold;
  color: #42b983;
}

/* Danh mục và ngày */
.expense-meta {
  font-size: 0.85em;
  color: #666;
}

/* Nút xóa */
.btn-delete {
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.2s ease;
}
.btn-delete:hover {
  color: #d9363e;
}
</style>
