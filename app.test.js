const request = require("supertest");
const app = require("./app");
/**
 * @test if server is up and runing
 */
describe("Server Status", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
