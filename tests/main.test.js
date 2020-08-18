const request = require("supertest");
const { User } = require("../models/user");

describe("/api/data", () => {
  let server;
  beforeEach(() => {
    server = require("../app");
  });
  afterEach(async () => {
    await server.close();
  });
  describe("get/", () => {
    it("should return data from endpoint", async () => {
      const res = await request(server).get("/api/data");
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
    });
  });
  describe("post/", () => {
    it("should create a new user", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "rickyP", password: "12345" });
      expect(res.body).toBeTruthy();
      expect(res.status).toBe(200);
    });
  });
});
//tests
//
