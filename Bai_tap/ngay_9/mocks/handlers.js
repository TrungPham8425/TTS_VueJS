import { rest } from "msw";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, title: "Test task", completed: false }]));
  }),
];
