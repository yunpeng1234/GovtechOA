import { rest } from "msw";

const loginHandler = rest.post("localhost:8000/auth/login", (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ jwt: "sometoken" }));
});

const registerHandler = rest.post(
  "localhost:8000/auth/register",
  (_, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: "success" }));
  }
);

const getUrlHandler = rest.get("localhost:8000/api/url", (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ message: "success" }));
});

const addUrlHandler = rest.post("localhost:8000/api/url", (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ message: "success" }));
});

const handlers = [loginHandler, registerHandler, getUrlHandler, addUrlHandler];

export default handlers;
