import assert from "assert";
import {JSDOM} from "jsdom";
import {describe, it} from "mocha";

import amountInput from "../src/amount-input";

describe("amountInput", () => {
  beforeEach(() => {
    global.window = (new JSDOM("")).window;
    global.document = global.window.document;
  });
});
