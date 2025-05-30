export function myLogger({ store }) {
  store.$subscribe((mutation, state) => {
    console.log(`[${mutation.storeId}]`, mutation, state);
  });
}
