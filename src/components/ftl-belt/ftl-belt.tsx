import { Element, Prop, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ftl-belt',
  styleUrl: 'ftl-belt.css',
  shadow: true,
})
export class FtlBelt {
  @Element() el!: HTMLFtlBeltElement

  /** 
 * Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma.
 * 
*/
  @Prop() accessToken: string;

  /**
   * Your Figma file ID. https://www.figma.com/file/MYFILEID/my-file
   */
  @Prop() fileId: string;

  connectedCallback() {
    this._handleSlotChange = this._handleSlotChange.bind(this)
  }

  componentWillLoad() {
    this._initChildren()
  }

  private _initChildren() {
    const tracks = [...this.el.querySelectorAll('ftl-holster')] as HTMLFtlHolsterElement[]

    tracks.map(node => {
      node.setAttribute('access-token', this.accessToken)
      node.setAttribute('file-id', this.fileId)
    })

  }


  private _handleSlotChange = () => {
    this._initChildren()
  }

  render() {
    return (
      <Host>
          <slot onSlotchange={this._handleSlotChange}></slot>
      </Host>

    );
  }

}
