# node-workflowy 📘

> **Unofficial** [workflowy.com](workflowy.com) SDK for node.js

`npm install node-workflowy`

## Features

- [x] Find list by shared secret url
- [ ] Find list by projectId
- [ ] Search results
- [ ] Custom resolver and mapper (for #tag @mention, and markdown support on note)
- [ ] Grunt cli and grunt-task
- [ ] Translate list and note

## Usage

```js
const Workflowy = require('node-workflowy')

// accept options
const workflowy = new Workflowy()

// find list by shared secret url
const list = await workflowy.findUrl('https://workflowy.com/s/Npp.UIArYtyUcn')
// or workflowy.findUrl().then()

console.log(list)
```

##### Output

```json
{
  "id": "392e7af6-be97-3980-77a3-2d563c47ca64",
  "name": "shared for test",
  "children": [
    {
      "id": "534abf7b-49c1-ba87-bd0e-8c99521271b5",
      "name": "Hello",
      "note": "World",
      "children": [
        {
          "id": "d04f7810-2700-681b-29e5-3f12e2f6ff0e",
          "children": [
            {
              "id": "888a6223-6a7a-1d22-da19-1d4cd16579b0",
              "name": "a1",
              "children": []
            }
          ]
        },
        {
          "id": "a370690e-708b-5aa4-7249-5ba414bc9fde",
          "name": "b",
          "children": [
            {
              "id": "ec25c37a-1d47-b0cb-2afb-ae8bee5dc6cc",
              "name": "b1",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": "5ccdd627-5842-6184-9e60-6269846bbe9f",
      "name": "🙈 make list, not war ",
      "note": "multiline text\nutf8\nand\nso on ...",
      "is_completed": true,
      "children": []
    }
  ]
}
```

## Development

- Make sure your editor `.editorconfig` enabled.
- `npm install debugs -g`
- `npm install mocha -g`
- Run `debugs` and choose namespace.
- `mocha test/*.js`.

## Authors

- Jin Lee

## License 

MIT