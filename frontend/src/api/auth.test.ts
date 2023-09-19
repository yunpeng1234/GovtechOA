import { rest } from "msw";

import { server } from "../mocks/server";

import { describe, expect, it } from "vitest";

import { signIn, register } from "./auth";

describe("Test auth apis", () => {
  it("Test login", async () => {
    server.use(
      rest.post("http://localhost:8000/auth/login", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ jwt: "sometoken" }));
      })
    );

    const res = await signIn("dummy", "dummy");
    expect(res?.status).toEqual(200);
    expect(res?.message).toEqual("Success");
  });

  it("Test register", async () => {
    server.use(
      rest.post("http://localhost:8000/auth/register", (_, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: "success" }));
      })
    );

    const res = await register("dummy", "dummy");
    expect(res?.status).toEqual(200);
  });
});
