<template>
  <div>
    <ExpenseItem
      v-for="exp in sortedExpenses"
      :key="exp.id"
      :expense="exp"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script>
import ExpenseItem from "./ExpenseItem.vue";

export default {
  components: { ExpenseItem },
  props: {
    expenses: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    sortedExpenses() {
      return [...this.expenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
  },
};
</script>
