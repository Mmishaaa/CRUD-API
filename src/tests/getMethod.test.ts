import supertest from "supertest";
import server from "../server";
import { describe } from "node:test";
import {
  correctUser,
  updatedUser,
  wrongUser,
  randomUserId,
} from "./testComponents";

describe("tests for sth", () => {
  afterAll(() => {
    server.close();
  });

  describe("HTTP tests", () => {
    test("GET METHOD: server should response an empry array for a GET api/users request", async () => {
      const res = await supertest(server)
        .get("/api/users")
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(new Array());
    });

    test("GET METHOD: server should answer with status code 400 if userId is invalid (not uuid)", async () => {
      const res = await supertest(server)
        .get(`/api/users/${wrongUser.id}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(400);
    });

    test("GET METHOD: server should answer with status code 404 if record with id === userId doesn't exist", async () => {
      const res = await supertest(server)
        .get(`/api/users/${randomUserId}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(404);
    });

    test("POST METHOD: server should answer with status code 201 and record with id === userId if it exists and response a newly created user", async () => {
      const res = await supertest(server)
        .post("/api/users")
        .send(JSON.stringify(correctUser));

      correctUser.id = res.body.id;

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(correctUser);
    });

    test("POST METHOD: server should response the 400 code status if request body does not contain required fields", async () => {
      const res = await supertest(server)
        .post(`/api/users/`)
        .send(JSON.stringify(wrongUser));

      expect(res.statusCode).toBe(400);
    });

    test("GET METHOD: server should response the created record by its id", async () => {
      const res = await supertest(server)
        .get(`/api/users/${correctUser.id}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(correctUser);
    });

    test("PUT METHOD: server should answer with status code 200 and updated record", async () => {
      const res = await supertest(server)
        .put(`/api/users/${correctUser.id}`)
        .send(JSON.stringify(updatedUser));

      updatedUser.id = correctUser.id;

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedUser);
    });

    test("PUT METHOD: server should answer with status code 400 if userId is invalid", async () => {
      const res = await supertest(server)
        .put(`/api/users/${wrongUser.id}`)
        .send(JSON.stringify(updatedUser));

      updatedUser.id = correctUser.id;

      expect(res.statusCode).toBe(400);
    });

    test("PUT METHOD: server should answer with status code 404 if record with id === userId doesn't exist", async () => {
      const res = await supertest(server)
        .put(`/api/users/${randomUserId}`)
        .send(JSON.stringify(updatedUser));

      updatedUser.id = correctUser.id;

      expect(res.statusCode).toBe(404);
    });

    test("DELETE METHOD: server should response a confirmation of successful deletion by id with status code 204", async () => {
      const res = await supertest(server)
        .delete(`/api/users/${correctUser.id}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual("");
    });

    test("DELETE METHOD: server should answer with status code 400 if userId is invalid (not uuid)", async () => {
      const res = await supertest(server)
        .delete(`/api/users/${wrongUser.id}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(400);
    });

    test("DELETE METHOD: server should answer with status code 404 if record with id === userId doesn't exist", async () => {
      const res = await supertest(server)
        .delete(`/api/users/${randomUserId}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(404);
    });

    test("GET METHOD: server should response the answer that there is no such object when we are trying to get a deleted one", async () => {
      const res = await supertest(server)
        .get(`/api/users/${correctUser.id}`)
        .send(JSON.stringify(""));

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({});
    });
  });
});

// Get all records with a GET api/users request (an empty array is expected)

// A new object is created by a POST api/users request (a response containing newly created record is expected)

// With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)

// We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)

// With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)

// With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
