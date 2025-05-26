<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần Chart.js
Chart.register(ArcElement, Tooltip, Legend);

export default {
  name: "ExpenseChart",
  components: { Doughnut },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      // Gom nhóm chi tiêu theo danh mục và tính tổng
      const categoryTotals = this.expenses.reduce((acc, cur) => {
        acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
        return acc;
      }, {});

      return {
        labels: Object.keys(categoryTotals),
        datasets: [
          {
            label: "Chi tiêu theo danh mục",
            backgroundColor: [
              "#42b983",
              "#ff6384",
              "#36a2eb",
              "#f39c12",
              "#9b59b6",
            ],
            data: Object.values(categoryTotals),
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      };
    },
  },
};
</script>

<style scoped></style>
