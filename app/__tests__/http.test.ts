import axios, { AxiosError } from "axios";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import ApiClient from "~/api/apiClient";
import type { Experience, Resume } from "~/entities/resume";
import resumeService from "~/service/resume/resume-service";
import { getHttp, getAllExperience, getHttpFailure } from "~/utils/http";
import apiClient from "~/api/apiClient";

const mocks = vi.hoisted(() => ({
  get: vi.fn().mockResolvedValue(() => {
    return { data: { message: "success" } };
  }),
  put: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("axios", async (importOriginal) => {
  const actual = await importOriginal<typeof import("axios")>();
  return {
    AxiosError: actual.AxiosError,
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create({ baseURL: "someurl" }),
        get: mocks.get,
        put: mocks.put,
        post: mocks.post,
        delete: mocks.delete,
      })),
    },
  };
});

describe("http", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return resolved object", async () => {
    const successMessage = {
      message: "success",
    };
    mocks.get.mockResolvedValueOnce(successMessage);

    axios.create({ baseURL: "someUrl" });
    const response = await getHttp();

    expect(mocks.get).toBeCalled();
    expect(response).toEqual(successMessage);
  });
});

describe("failure", () => {
  //   beforeEach(() => {
  //     vi.resetAllMocks();
  //   });

  it("should return rejected object", async () => {
    const failureMessage = {
      data: { message: "error" },
    };
    mocks.get.mockRejectedValueOnce(failureMessage);

    expect(mocks.get).toBeCalled();
    await expect(getHttpFailure()).rejects.toEqual(failureMessage);
  });
});

// describe("client", () => {
//   it("should work", async () => {
//     mocks.get.mockResolvedValueOnce({
//       data: {
//         message: "success",
//       },
//     });

//     const service = resumeService;
//     const response = await service.getAllExperience({ params: {} });
//     console.log("RESPONSE: ", response);

//     expect(mocks.get).toBeCalled();
//     //expect(apiMocks.getAllExperience).toBeCalled();
//   });
// });
