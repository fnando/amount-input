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
    const {input, options} = this;
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

  update = (amount, runAcceptAmountCallback = true, runRejectAmountCallback = true) => {
    const {input, options} = this;
    const {willAcceptAmount, onAcceptAmount, onRejectAmount} = options;

    if (willAcceptAmount(amount)) {
      this.amount = amount;
      input.value = format(amount, options);

      if (runAcceptAmountCallback) {
        onAcceptAmount(input, amount);
      }
    } else if (runRejectAmountCallback) {
      onRejectAmount(input, amount);
    }
  };

  handleDelete = ({target, inputType}) => {
    const {amount, options} = this;

    if (inputType !== "deleteContentBackward") {
      return;
    }

    let sequence = numberToSequence(amount, options);

    // Account for precision=0, by always removing
    // last three digits (decimals + integer) and
    // then appending zero decimals.
    if (options.precision === 0) {
      sequence = sequence.substr(0, sequence.length - 3);
      sequence += "00";
    } else {
      sequence = sequence.substr(0, sequence.length - 1);
      sequence = sequence.padStart(3, "0");
    }

    const newAmount = sequenceToNumber(sequence, options);

    this.update(newAmount);
    moveCursor(target);
  };

  handlePaste = event => {
    const {options} = this;

    event.preventDefault();

    const {clipboardData, target} = event;
    let value = clipboardData.getData("Text");
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

    let newSequence;

    // When precision is 0, we need to move the number straight
    // to the straight to the left side of the separator.
    if (options.precision === 0) {
      newSequence = sequence.substr(0, sequence.length - 2) + inputValue + "00";
    } else {
      newSequence = sequence + inputValue;
    }

    const newAmount = sequenceToNumber(newSequence, options);

    this.update(newAmount);
    moveCursor(target);
  };

  handleEventWithCursorMove = ({target}) => {
    moveCursor(target);
  }

  handleKeyDown = ({key, ctrlKey, metaKey}) => {
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

function numberFromString(string) {
  string = string.replace(/[^\d.,]+/g, "");
  let [, number, decimals] = string.match(/^([\d,]+)(?:\.(\d+))?$/) || string.match(/^([\d.]+)(?:,(\d+))?$/);

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
  let formattedAmount = formatThousands(number, options);

  if (options.precision > 0) {
    formattedAmount += `${options.separator}${decimals}`;
  }

  return formattedAmount;
}

function sequenceToComponents(sequence, options) {
  const precision = options.precision || 2;

  let number = sequence.substr(0, sequence.length - precision);
  let decimals = sequence.substr(-precision);

  number = number.replace(/^0+/g, "").padStart(1, "0");
  decimals = decimals.padEnd(precision, "0");

  return [number, decimals];
}

function sequenceToNumber(sequence, options) {
  const [number, decimals] = sequenceToComponents(sequence, options);
  return parseFloat(`${number}.${decimals}`);
}

function numberToSequence(input, {precision}) {
  // This will ensure that the sequence will be
  // correct when using precision=0 (only integers).
  precision = precision || 2;

  let [number, decimals] = input.toFixed(precision).split(".");
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
