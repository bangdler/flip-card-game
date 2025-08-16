import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// jest-dom matchers 추가
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
