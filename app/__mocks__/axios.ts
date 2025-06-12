import { vi } from "vitest";
import type resumeService from "~/service/resume-service";
import type ApiClient from "~/api/apiClient";
import { getAllExperience } from "~/api/resumeApi";
import axios from "axios";

// const mocks = vi.hoisted(() => ({
//   get: vi.fn().mockResolvedValue({ data: { message: "success" } }),
//   put: vi.fn(),
//   post: vi.fn(),
//   delete: vi.fn(),
// }));

// vi.mock("axios", async (importOriginal) => {
//   const actual = await importOriginal<typeof import('axios')>();
//   return {
//     ...actual,
//     default: {
//       ...actual.default,
//       create: vi.fn(() => ({
//         ...actual.default.create({ baseURL: "someurl" }),
//         get: mocks.get,
//         // put: mocks.put,
//         // post: mocks.post,
//         // delete: mocks.delete,
//       })),
//       AxiosError: actual.AxiosError,
//     },
//   };
// });

export const apiMocks = {
  getAllExperience: vi.fn(),
};

export const serviceMocks = {
  getAll: vi.fn(),
};

vi.mock("resumeApi", async (importOriginal) => {
  const original = importOriginal<typeof import("../api/resumeApi")>();
  return {
    default: { ...original, getAllExperience: apiMocks.getAllExperience },
  };
});

vi.mock("resumeService", async (importOriginal) => {
  const original = importOriginal<typeof resumeService>();
  return {
    default: {
      ...original,
      getAll: serviceMocks.getAll,
    },
  };
});
