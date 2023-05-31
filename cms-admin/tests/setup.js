import { afterEach, expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

// extends jest's expect with jest-dom's matchers
expect.extend(matchers);

// cleans up the DOM after each test
afterEach(() => {
    cleanup();
})