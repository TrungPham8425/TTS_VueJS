// import defineSotre
import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    // Danh sach san pham trong kho
    products: [],
    // Trang thai tai du lieu
    loading: false,
    // Luu thong bao loi neu co
    error: null,
  }),
  getters: {
    //  Tong gia tri san pham trong kho
    totalValue: (state) =>
      state.products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    //  So luong san pham trong kho
    productCount: (state) => state.products.length,
  },
  actions: {
    // Load danh sach san pham
    fetchProducts() {
      this.loading = true;
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem("products")) || [];
        this.products = data;
        this.loading = false;
      }, 500);
    },
    // Them san pham moi
    addProduct(product) {
      product.id = Date.now();
      this.products.push(product);
      this.saveProducts();
    },
    // Cap nhat thong tin san pham
    updateProduct(id, updatedProduct) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id };
        this.saveProducts();
      }
    },
    // Xoa san pham
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      this.saveProducts();
    },
    // Luu danh sach san pham vao localStorage
    saveProducts() {
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
});
