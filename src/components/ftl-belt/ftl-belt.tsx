import { Watch, Element, Prop, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ftl-belt',
  styleUrl: 'ftl-belt.css',
  shadow: true,
})
export class FtlBelt {
  private tokenInput: HTMLInputElement;
  private fileIdInput: HTMLInputElement;

  @Element() el!: HTMLFtlBeltElement

  /** 
 * Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma.
 * 
*/
  @Prop({ reflect: true, mutable: true }) accessToken: string;

  /**
   * Your Figma file ID. https://www.figma.com/file/MYFILEID/my-file
   */
  @Prop() fileId: string;

  @Watch('accessToken')
  updateHolsters() {
    this._initChildren()
  }

  connectedCallback() {
    this._handleSlotChange = this._handleSlotChange.bind(this)
    this.updateView = this.updateView.bind(this)
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

  private _updateToken = (e) => {
    e.preventDefault();
    this.accessToken = this.tokenInput.value
    this.fileId = this.fileIdInput.value
  }

  updateView(attribute, e) {
    const tracks = [...this.el.querySelectorAll('ftl-holster')] as HTMLFtlHolsterElement[]

    tracks.map(node => {
      node.setAttribute(attribute, e)
    })

  }
  render() {
    return (
      <Host>
        <div class="ftl-belt">
          <div>
            <ftl-buckle
              onFtl-on-change={(e) => this.updateView(e.detail.attribute, e.detail.value)}
            ></ftl-buckle>
          </div>

          <form class="figma-config-form" onSubmit={this._updateToken}>
            <div class="figma-config-field">
              <label htmlFor="accessToken">Access Token</label>
              <input
                type="password" 
                ref={el => this.tokenInput = el} 
                id="accessToken"
                value={this.accessToken} 
                ></input>
            </div>

            <div class="figma-config-field">
              <label htmlFor="fileId">File ID</label>
              <input type="password" ref={el => this.fileIdInput = el} id="fileId"
              value={this.fileId}
              ></input>
            </div>
            <button type="submit">save</button>
          </form>
        </div>


        <slot onSlotchange={this._handleSlotChange}></slot>
      </Host>

    );
  }

}
