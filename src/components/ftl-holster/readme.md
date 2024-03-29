# ftl-holster

## Installation 


Plop this in your index.html
```
<script type="module" src="https://unpkg.com/@rocketmark/figma-testing-library/dist/figma-testing-library/figma-testing-library.esm.js"></script>
```

## Usage 

### Generate a Figma Personal Access token

1. Login to your Figma account.
2. Head to the account settings from the top-left menu inside Figma.
3. Find the personal access tokens section.
4. Click Create new token.
5. A token will be generated. This will be your only chance to copy the token, so make sure you keep a copy of this in a secure place.

### Finding the node

This component calls the Figma API to grab an image of a particular node. To find the node ID in your file:

1. Open up dev tools in fav browser.
2. Select the node you want to grab.
3. In the console enter: `figma.currentPage.selection[0].id`
4. This will return the node id that you will pass to the component.

### Finding the file ID

Your file ID can be found by inspecting the URL:

`https://www.figma.com/file/<MY FILE ID>/my-file`

### Markup

```
<ftl-holster
	access-token="my figma token"
	file-id="my figma file id"
	node="my component node id"
/>
	<my-web-component with-some-props></my-web-component>
</ftl-holster>
```
<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                           | Type                                      | Default       |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------- |
| `accessToken`  | `access-token`  | Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma. | `string`                                  | `undefined`   |
| `activeToggle` | `active-toggle` |                                                                                                       | `string`                                  | `'figma'`     |
| `fileId`       | `file-id`       | Your Figma file ID. https://www.figma.com/file/MYFILEID/my-file                                       | `string`                                  | `undefined`   |
| `name`         | `name`          | A unique name for your test to display in the UI.                                                     | `string`                                  | `'Test Case'` |
| `node`         | `node`          | The node ID of the component you want to preview.                                                     | `string`                                  | `undefined`   |
| `opacity`      | `opacity`       |                                                                                                       | `string`                                  | `'1'`         |
| `showGrid`     | `show-grid`     |                                                                                                       | `boolean`                                 | `true`        |
| `view`         | `view`          |                                                                                                       | `"overlay" \| "side-by-side" \| "toggle"` | `'toggle'`    |


## Slots

| Slot          | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| `"(default)"` | The markup for anything you want to test. Maybe a component or a pattern. |


## Shadow Parts

| Part      | Description                                  |
| --------- | -------------------------------------------- |
| `"image"` | The image returned from Figma, if available. |


## Dependencies

### Depends on

- [ftl-buckle](../ftl-buckle)

### Graph
```mermaid
graph TD;
  ftl-holster --> ftl-buckle
  style ftl-holster fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
