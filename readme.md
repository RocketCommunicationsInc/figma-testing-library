# Figma Testing Library

Figma Testing Library is a lightweight web component to help developers overlay Figma designs right on top of their code.
## Installation

Because it's a web component, you can use this in any framework, no framework, storybook, anything. Just plop this in your index.html

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

This component calls the Figma API to grab an image of a particular node in your Figma file. You can pull in a whole page, a single component, and even a single layer.

The easiest way to find a particular node id in your Figma file is by using Figma in the browser and opening up dev tools where you have full access to the Figma plugin api with `figma`.

1. Open up dev tools in fav browser.
2. Select the node you want to grab.
3. In the console enter: `figma.currentPage.selection[0].id`
4. This will return the node id that you will pass to the component.

### Finding the file ID

Your file ID can be found by inspecting the URL:

`https://www.figma.com/file/<MY FILE ID>/my-file`

### Markup

Once you have your Figma layer details, open up your code and wrap your component or thing you want to test inside a `<ftl-holster>` element. Inside this component's slot, you can arrange your code to match what's in your Figma file.

```
<ftl-holster
	access-token="my figma token"
	file-id="my figma file id"
	node="my component node id"
/>
	<div style="display: flex;">
		<my-component with-some-props>
			<my-button style="margin-left: 1rem;"></my-button>
		</my-component>
	</div>
</ftl-holster>
```

## Multi Holster Setup (ftl-belt)

If you want to setup multiple holsters, you can use the `<ftl-belt>` component
to avoid having to duplicate your fileId and token for every test.

* applies your access token and file id to any child holsters.
* displays a master control to manipulate all holsters at once.
* provides optional input fields for access token and file id in the browser so you don't accidentally commit your token.


```html
<ftl-belt
	access-token="yourtoken"
	file-id="yourfileid"
>
	<ftl-holster name="Button Variant 1" node="123:456">
		<div>
			<!--setup code-->
			<my-component foo="bar"></my-component>
		</div>
    </ftl-holster>

	<ftl-holster name="Button Variant 2" node="923:123">
		<div>
			<!--setup code-->
			<my-component foo="bar"></my-component>
		</div>
    </ftl-holster>	
</ftl-belt>
```

<!-- Auto Generated Below -->


## FTL Holster

| Property      | Attribute      | Description                                                                                           | Type     | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `accessToken` | `access-token` | Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma. | `string` | `undefined` |
| `fileId`      | `file-id`      | Your Figma file ID. https://www.figma.com/file/<MY FILE ID>/my-file                                   | `string` | `undefined` |
| `node`        | `node`         | The node ID of the component you want to preview.                                                     | `string` | `undefined` |



## FTL Belt

| Property      | Attribute      | Description                                                                                           | Type     | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `accessToken` | `access-token` | Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma. | `string` | `undefined` |
| `fileId`      | `file-id`      | Your Figma file ID. https://www.figma.com/file/MYFILEID/my-file                                       | `string` | `undefined` |


----------------------------------------------
