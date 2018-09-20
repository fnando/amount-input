# amount-input

Add amount masking to inputs with this teeny-tiny-lib.

## Instalation

This lib is available as a NPM package. To install it, use the following command:

```
npm install @fnando/amount-input --save
```

If you're using Yarn (and you should):

```
yarn add @fnando/amount-input
```

You'll have to call `amountInput.amountInput(input, options)` directly if you're loading the script without compiling your script (e.g. [webpack](https://webpack.js.org/)). Otherwise you can simply `import amountInput from "@fnando/amount-input";`.

## API

### `amountInput(input, options = {})`

Enable the amountInput behaviour on `input`. You can customize it with the following `options`:

- `input`: The `<input>` element you want to control.
- `options`: This optional argument allows you to further customize the input behaviour. The available options are:
    - `precision`: Sets the level of precision (defaults to `2`).
    - `separator`: Sets the separator between the units (defaults to `.`).
    - `delimiter`: Sets the thousands delimiter (defaults to `,`).
    - `willAcceptAmount`: Sets the callback that will validate the acceptance of the new amount. If this callback returns `false`, then the amount won't be accepted and the `onRejectAmount` callback will be executed. Defaults to a callback that accepts any amount. The callback signature is `callback(newAmount)`.
    - `onAcceptAmount`: Sets the the callback that will be executed after an amount has been accepted. Default to a no-op callback. The callback signature is `callback(input, amount)`.
    - `onRejectAmount`: Sets the the callback that will be executed when an amount is rejected by `willAcceptAmount`. The callback signature is `callback(input, rejectedAmount, amount)`.

This function allow us to update the amount hold by amountInput. Otherwise, you won't be able to set an arbitrary value. Notice that the new amount that's being set is subjected to the `willAcceptAmount` condition.

### `amountInput.format(number, options)`

Stand-alone formatting numbers. Accept `precision`, `separator`, and `delimiter` options, like described above.

## Usage

This is the minimum working example:

```html
<input value="0.00">

<script>
  amountInput(document.querySelector("input"));
</script>
```

## Examples

Available at https://codepen.io/fnando/pen/VGExVv

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
