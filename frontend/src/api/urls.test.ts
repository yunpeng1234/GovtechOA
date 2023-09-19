import { rest } from "msw";

import { server } from "../mocks/server";

import { describe, expect, it } from "vitest";

import { URLProp, getAllUrls, saveUrl } from "./urls";

describe("Test url apis", () => {
  it("Test get all", async () => {
    server.use(
      rest.get("http://localhost:8000/api/url", (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ data: [{ originalURL: "LONG", shortenURL: "SHORT" }] })
        );
      })
    );

    const res = await getAllUrls();
    expect(res.length).toEqual(1);
    expect(res[0].originalURL).toEqual("LONG");
    expect(res[0].shortenURL).toEqual("SHORT");
  });

  it("Test save url", async () => {
    const payload: URLProp = {
      user: "someUser",
      longurl: "LONG",
      shorturl: "SHORT",
    };
    server.use(
      rest.post("http://localhost:8000/api/url", async (req, res, ctx) => {
        const body = await req.json();
        if (body.originalURL == "LONG" && body.shortenURLq == "SHORT") {
          return res(ctx.status(200), ctx.json({ message: "success" }));
        }
        return res(ctx.status(400), ctx.json({ message: "failure" }));
      })
    );

    const res = await saveUrl(payload);
    expect(res).toEqual(200);
  });
});
