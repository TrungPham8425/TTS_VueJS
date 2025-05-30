// Tu dong luu state khi co thay doi
export function autoSavePlugin({ store }) {
  store.$subscribe((_mutation, state) => {
    localStorage.setItem("products", JSON.stringify(state.products));
  });
}
