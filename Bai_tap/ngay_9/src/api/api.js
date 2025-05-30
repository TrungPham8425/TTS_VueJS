import axios from "axios";

// Khởi tạo axios với cấu hình cụ thể
const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Xử lý lỗi chung
const handleError = (error, message) => {
  console.error(message, error);
  if (error.response) {
    // Lỗi từ server với status code
    throw new Error(
      `${message} - ${error.response.status}: ${error.response.data}`
    );
  } else if (error.request) {
    // Lỗi không nhận được response
    throw new Error(
      `${message} - Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối.`
    );
  } else {
    // Lỗi khác
    throw new Error(`${message} - ${error.message}`);
  }
};

// Lấy danh sách công việc
export async function getTasks() {
  try {
    const res = await api.get("/todos");
    return res.data;
  } catch (error) {
    handleError(error, "Lỗi khi lấy danh sách công việc");
  }
}

// Lấy chi tiết một công việc
export async function getTask(id) {
  try {
    const res = await api.get(`/todos/${id}`);
    return res.data;
  } catch (error) {
    handleError(error, `Lỗi khi lấy công việc id=${id}`);
  }
}

// Tạo công việc mới
export async function createTask(task) {
  try {
    const res = await api.post("/todos", {
      ...task,
      completed: task.completed || false,
    });
    return res.data;
  } catch (error) {
    handleError(error, "Lỗi khi tạo công việc mới");
  }
}

// Cập nhật công việc
export async function updateTask(id, task) {
  try {
    const res = await api.put(`/todos/${id}`, task);
    return res.data;
  } catch (error) {
    handleError(error, `Lỗi khi cập nhật công việc id=${id}`);
  }
}

// Xóa công việc
export async function deleteTask(id) {
  try {
    await api.delete(`/todos/${id}`);
    return true;
  } catch (error) {
    handleError(error, `Lỗi khi xóa công việc id=${id}`);
  }
}
