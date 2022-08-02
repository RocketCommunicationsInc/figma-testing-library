import { Watch, State, Prop, Component, Host, h } from '@stencil/core';
import { Client } from '../../utils/client';

/**
 * @slot (default) - The markup for anything you want to test. Maybe a component or a pattern.
 * @part image - The image returned from Figma, if available.
 */

@Component({
  tag: 'ftl-holster',
  styleUrl: 'ftl-holster.css',
  shadow: true,
})
export class FtlHolster {

  private imgElement?: HTMLImageElement
  private gridElement?: HTMLDivElement
  /** 
   * Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma.
  */
  @Prop() accessToken: string;

  /**
   * Your Figma file ID. https://www.figma.com/file/MYFILEID/my-file
   */
  @Prop() fileId: string;

  /**
   * The node ID of the component you want to preview.
   */
  @Prop() node: string;

  /**
   * A unique name for your test to display in the UI.
   */
  @Prop() name?: string = 'Test Case'


  @State() imageUrl: string
  @State() opacity = '1'
  @State() view = 'toggle'
  @State() mode = 'side'
  @State() activeToggle = 'figma'
  @State() showGrid = true
  @State() loading = true

  @Watch('accessToken')
  @Watch('fileId')
  handleParamChanges() {
    this._fetchImage()
  }

  componentWillLoad() {
    this._fetchImage()
  }

  private _fetchImage() {
    const client = new Client(this.accessToken, this.fileId)
    client.getNode(this.node).then((node: string) => {

      this.imageUrl = node
      this.loading = false
    })
  }

  updateActiveToggle(e: Event) {
    this.activeToggle = (e.target as HTMLInputElement).value
  }

  get figmaLoadingBlock() {
    return (
      <div>
        Your content is loading
      </div>
    )
  }

  get selects() {
    return (
      <select name="mode" id="mode" class="select-mode" onChange={(e) => this.view = (e.target as HTMLInputElement).value}>
        <option value="toggle" selected={this.view === 'toggle'}>Toggle</option>
        <option value="overlay" selected={this.view === 'overlay'}>Overlay</option>
        <option value="side-by-side" selected={this.view === 'side-by-side'}>SIde By Side</option>
      </select>
    )
  }

  get control() {
    return (
      <ul class="segmented-control">
        <li class="segmented-control__item">
          <input
            class="segmented-control__input"
            type="radio"
            value="figma"
            name="option"
            id="option-figma"
            checked={this.activeToggle === 'figma'}
            onChange={(e) => this.updateActiveToggle(e)}
          />
          <label class="segmented-control__label" htmlFor="option-figma">Figma</label>
        </li>
        <li class="segmented-control__item">
          <input class="segmented-control__input"
            type="radio" value="code" name="option"
            id="option-code" checked={this.activeToggle === 'code'}
            onChange={(e) => this.updateActiveToggle(e)}
          />
          <label
            class="segmented-control__label"
            htmlFor="option-code"
          >Code</label>
        </li>
      </ul>
    )
  }
  get loadingSvg() {
    return (
      <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#FFF">
        <g transform="matrix(1 0 0 -1 0 80)">
          <rect width="10" height="20" rx="3">
            <animate attributeName="height"
              begin="0s" dur="4.3s"
              values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
              repeatCount="indefinite" />
          </rect>
          <rect x="15" width="10" height="80" rx="3">
            <animate attributeName="height"
              begin="0s" dur="2s"
              values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"
              repeatCount="indefinite" />
          </rect>
          <rect x="30" width="10" height="50" rx="3">
            <animate attributeName="height"
              begin="0s" dur="1.4s"
              values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"
              repeatCount="indefinite" />
          </rect>
          <rect x="45" width="10" height="30" rx="3">
            <animate attributeName="height"
              begin="0s" dur="2s"
              values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
              repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    )
  }

 

  /**
   * Prevents issue where Figma returns an image that is longer than the coded component in Overlay mode.
   * Because the figma image is positioned absolute and I have no idea how to do it with CSS.
   */
  setWidth() {
    const width = this.imgElement.width
    const height = this.imgElement.height
    if (width && height) {
      this.gridElement.setAttribute('style', `min-width: ${width}px; min-height: ${height + 50}px;`)
    }
  }

  render() {
    return (
      <Host>
        <div class="ftl-holster">
          <header>
            {this.loading ? (
              <div>loading...</div>
            ) : null}
            <h2>{this.name}</h2>
          </header>

          <div class={{
            "container": true,
            "container__overlay": this.view === 'overlay',
            "container__toggle": this.view === 'toggle',
            "activeToggle--figma": this.activeToggle === 'figma',
            "activeToggle--code": this.activeToggle === 'code'
          }}>
            <div
              ref={el => this.gridElement = el as HTMLDivElement}
              class={{ "grid": true, "grid--overlay": this.showGrid }}
            >
              <div class="figma__container">
                <div class="image__label">Figma</div>
                <img
                  part="image"
                  onLoad={() => this.setWidth()}
                  ref={el => this.imgElement = el as HTMLImageElement}
                  src={this.imageUrl} style={{
                    opacity: this.view === 'overlay' ? `${this.opacity}` : '1'
                  }} alt="" />
              </div>

              <div class="code__container">
                <div class="image__label">
                  {this.view === 'overlay' ? "Figma and Code" : "Code"}
                </div>
                  <slot></slot>
              </div>


            </div>
            <div class="controls-bar">
              {this.selects}
              {this.view === 'overlay' ? (
                <div class="control opacity-control">
                  <label htmlFor="slider">Opacity:</label>
                  <input
                    id="slider"
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.1"
                    class="opacity-slider"
                    name="slider"
                    onChange={(e) => this.opacity = (e.target as HTMLInputElement).value}
                    value={this.opacity}
                  />
                </div>
              ) : null}

              {this.view === 'toggle' ? this.control : null}

              <label htmlFor="showGrid" class="checkbox checkbox--showGrid">
                <input
                  class="checkbox__input"
                  id="showGrid"
                  type="checkbox"
                  checked={this.showGrid} onChange={(e) =>  this.showGrid = (e.target as HTMLInputElement).checked}
                />
                Show Grid

              </label>

            </div>

          </div>
        </div>
      </Host>
    );
  }

}
