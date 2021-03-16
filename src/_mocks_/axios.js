import { App } from "../App";

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
      case "https://jsonplaceholder.typicode.com/todos":
        return Promise.resolve({ data: App });
      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
};