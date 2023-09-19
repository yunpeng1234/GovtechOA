import { rest } from "msw";

import { describe, expect, it, vi } from "vitest";
import { generateShortenedUrl } from "./generateShort";

describe("Test generate", () => {
  it("Test generate function", () => {
    vi.mock("crypto-js/sha256", async () => {
      return {
        default: vi.fn().mockImplementation((x: string) => {
          console.log("LOLOL");
          return "123245";
        }),
      };
    });

    const res = generateShortenedUrl("long", "user");
    expect(res).toEqual("short.en/1232");
  });
});
