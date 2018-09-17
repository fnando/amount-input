const defaultOptions = {
  precision: 2,
  separator: ".",
  delimiter: ",",
  willAcceptAmount: () => true,
  onAcceptAmount: () => true,
  onRejectAmount: () => true
};

function handleEventWithCursorMove({target}) {
  moveCursor(target);
}

function handleKeyDown(event) {
  const {target, key, ctrlKey, metaKey} = event;

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

function handleDblClick({target}) {
  const length = target.value.length;
  target.setSelectionRange(0, length);
}

function numberFromString(string, options) {
  string = string.replace(/[^\d.,]+/g, "");
  let [_, number, decimals] = string.match(/^([\d,]+)(?:\.(\d+))?$/) || string.match(/^([\d.]+)(?:,(\d+))?$/);

  number = number.replace(/[^\d]+/g, "");
  decimals = (decimals || "0").replace(/[^\d]+/g, "");

  if (!number) {
    return;
  }

  return roundNumber(`${number}.${decimals}`, options);
}

function roundNumber(number, options) {
  return parseFloat(parseFloat(number).toFixed(options.precision));
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
  options = options || {...defaultOptions};
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
  options = {...defaultOptions, ...options};
  const {willAcceptAmount, onRejectAmount, onAcceptAmount} = options;
  const value = input.value;
  let amount = roundNumber(value, options);

  if (isNaN(amount)) {
    amount = 0;
  }

  input.value = format(amount, options);

  if (willAcceptAmount(amount)) {
    onAcceptAmount(input, amount);
  } else {
    onRejectAmount(input, amount);
  }

  input.addEventListener("input", ({target, inputType}) => {
    if (inputType !== "deleteContentBackward") {
      return;
    }

    let sequence = numberToSequence(amount, options);
    sequence = sequence.substr(0, sequence.length - 1);
    sequence = sequence.padStart(3, "0");

    const oldAmount = amount;
    const newAmount = sequenceToNumber(sequence, options);

    if (willAcceptAmount(newAmount)) {
      amount = newAmount
      target.value = format(amount, options);
      onAcceptAmount(target, newAmount, oldAmount);
    }
  });

  input.addEventListener("keypress", ({keyCode, target}) => {
    let sequence = numberToSequence(amount, options);
    const inputValue = String.fromCharCode(keyCode);
    event.preventDefault();

    if (!inputValue.match(/^[0-9]$/)) {
      moveCursor(target);
      return false;
    }

    const newSequence = sequence + inputValue;
    const oldAmount = amount;
    const newAmount = sequenceToNumber(newSequence, options);

    if (willAcceptAmount(newAmount)) {
      amount = newAmount;
      target.value = format(amount, options);
      onAcceptAmount(input, amount, oldAmount);
    } else {
      onRejectAmount(target, newAmount, amount);
    }

    moveCursor(target);
  });

  input.addEventListener("paste", event => {
    event.preventDefault();

    const {clipboardData, target} = event;
    let value = clipboardData.getData("Text");
    const oldAmount = amount;
    const newAmount = numberFromString(value, options);

    if (isNaN(newAmount)) {
      return;
    }

    if (willAcceptAmount(newAmount)) {
      amount = newAmount;
      target.value = format(amount, options);
      onAcceptAmount(input, amount, oldAmount);
    } else {
      onRejectAmount(target, newAmount, oldAmount);
    }

    moveCursor(target);
  });

  input.addEventListener("focus", handleEventWithCursorMove);
  input.addEventListener("click", handleEventWithCursorMove);
  input.addEventListener("dblclick", handleDblClick);
  input.addEventListener("keydown", handleKeyDown);
}

export default amountInput;
