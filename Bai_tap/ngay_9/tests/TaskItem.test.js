import { render, fireEvent } from "@testing-library/vue";
import TaskItem from "@/components/TaskItem.vue";

test("renders title and checkbox", () => {
  const task = { id: 1, title: "Test", completed: false };
  const { getByText } = render(TaskItem, { props: { task } });
  getByText("Test");
});
