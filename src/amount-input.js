export class AmountInput {
  static options = {
    precision: 2,
    separator: ".",
    delimiter: ",",
    willAcceptAmount: () => true,
    onAcceptAmount: () => true,
    onRejectAmount: () => true
  };

  constructor(input, options = {}) {
    const defaultOptions = AmountInput.options;
    this.amount = 0;
    this.input = input;
    this.options = {...defaultOptions, ...options};
  }

  init() {
    const {input} = this;
    const value = input.value;
    let amount = roundNumber(numberFromString(value), options);

    if (isNaN(amount)) {
      amount = 0;
    }

    // Always set value on init.
    input.value = format(amount, options);
    this.amount = amount;
    this.update(amount);

    input.addEventListener("input", this.handleDelete);
    input.addEventListener("paste", this.handlePaste);
    input.addEventListener("focus", this.handleEventWithCursorMove);
    input.addEventListener("click", this.handleEventWithCursorMove);
    input.addEventListener("dblclick", this.handleDblClick);
    input.addEventListener("keydown", this.handleKeyDown);
    input.addEventListener("keypress", this.handleKeyPress);
  }

  update = amount => {
    const {input, options} = this;
    const {willAcceptAmount, onAcceptAmount, onRejectAmount} = options;

    if (willAcceptAmount(amount)) {
      this.amount = amount;
      input.value = format(amount, options);
      onAcceptAmount(input, amount);
    } else {
      onRejectAmount(input, amount);
    }
  };

  handleDelete = ({target, inputType}) => {
    const {amount, options} = this;

    if (inputType !== "deleteContentBackward") {
      return;
    }

    let sequence = numberToSequence(amount, options);
    sequence = sequence.substr(0, sequence.length - 1);
    sequence = sequence.padStart(3, "0");

    const oldAmount = amount;
    const newAmount = sequenceToNumber(sequence, options);

    this.update(newAmount);
    moveCursor(target);
  };

  handlePaste = event => {
    const {amount, options} = this;

    event.preventDefault();

    const {clipboardData, target} = event;
    let value = clipboardData.getData("Text");
    const oldAmount = amount;
    const newAmount = roundNumber(numberFromString(value, options), options);

    if (isNaN(newAmount)) {
      return;
    }

    this.update(newAmount);
    moveCursor(target);
  };

  handleKeyPress = event => {
    const {amount, options} = this;
    const {which, keyCode, target} = event;
    let sequence = numberToSequence(amount, options);
    const inputValue = String.fromCharCode(keyCode || which);
    event.preventDefault();

    // Firefox bug: backspace keystrokes don't trigger
    // an `input` event, so let's fake one here.
    if (navigator.userAgent.match(/firefox/i) && (which === 8)) {
      this.handleDelete({target, inputType: "deleteContentBackward"});
      return;
    }

    if (!inputValue.match(/^[0-9]$/)) {
      moveCursor(target);
      return;
    }

    const newSequence = sequence + inputValue;
    const oldAmount = amount;
    const newAmount = sequenceToNumber(newSequence, options);

    this.update(newAmount);
    moveCursor(target);
  };

  handleEventWithCursorMove = ({target}) => {
    moveCursor(target);
  }

  handleKeyDown = ({target, key, ctrlKey, metaKey}) => {
    // Allow selecting/copying/cutting on Mac.
    if (metaKey) {
      return;
    }

    // Reject caret movement with arrow keys.
    if (key.startsWith("Arrow")) {
      event.preventDefault();
    }

    // Reject Mac's ctrlKey.
    if (ctrlKey && navigator.platform.startsWith("Mac")) {
      event.preventDefault();
    }
  }

  handleDblClick = ({target}) => {
    const length = target.value.length;
    target.setSelectionRange(0, length);
  }
}

function numberFromString(string, options) {
  string = string.replace(/[^\d.,]+/g, "");
  let [_, number, decimals] = string.match(/^([\d,]+)(?:\.(\d+))?$/) || string.match(/^([\d.]+)(?:,(\d+))?$/);

  number = number.replace(/[^\d]+/g, "");
  decimals = (decimals || "0").replace(/[^\d]+/g, "");

  if (!number) {
    return;
  }

  return parseFloat(`${number}.${decimals}`);
}

function roundNumber(number, options) {
  return parseFloat(number.toFixed(options.precision));
}

function formatThousands(number, options) {
  const digits = number.split("");
  const parts = [];

  while (digits.length) {
    const part = digits.splice(-3, 3);
    parts.unshift(part.join(""));
  }

  return parts.join(options.delimiter);
}

export function format(amount, options) {
  const defaultOptions = AmountInput.options;
  options = {...defaultOptions, ...options};
  const sequence = numberToSequence(amount, options);
  const [number, decimals] = sequenceToComponents(sequence, options);

  return `${formatThousands(number, options)}${options.separator}${decimals}`;
}

function sequenceToComponents(sequence, options) {
  let decimals = sequence.substr(-options.precision);
  let number = sequence.substr(0, sequence.length - options.precision);
  number = number.replace(/^0+/g, "").padStart(1, "0");
  decimals = decimals.padEnd(options.precision, "0");

  return [number, decimals];
}

function sequenceToNumber(sequence, options) {
  const [number, decimals] = sequenceToComponents(sequence, options);
  return parseFloat(`${number}.${decimals}`);
}

function numberToSequence(input, {separator, precision}) {
  let [number, decimals] = input.toString().split(separator);
  decimals = (decimals || "0").padEnd(precision, "0");
  number = (number || "0").padStart(1, "0");

  return `${number}${decimals}`;
}

function moveCursor(input) {
  const index = input.value.length;
  input.setSelectionRange(index, index);
}

export function amountInput(input, options = {}) {
  const instance = new AmountInput(input, options);
  instance.init();
  return instance.update;
}

export default amountInput;
