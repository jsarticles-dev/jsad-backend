import { afterAll, beforeAll, afterEach, describe, test } from "@jest/globals";
import { app } from "../app";
import request from "supertest";

describe("GET /health", () => {
  test("Server should be alive", () => {
    return request(app)
      .get("/health")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
  });
});
