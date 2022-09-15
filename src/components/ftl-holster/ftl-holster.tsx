import { Watch, State, Prop, Component, Host, h } from '@stencil/core';
import { Client } from '../../utils/client';
import { viewOptions } from '../ftl-buckle/ftl-buckle';

/**
 * @slot (default) - The markup for anything you want to test. Maybe a component or a pattern.
 * @part image - The image returned from Figma, if available.
 * @part container - The outermost container for ftl-holster.
 * @part code-container - The container for the rendered code.
 * @part figma-container - The container for the figma image.
 */

@Component({
  tag: 'ftl-holster',
  styleUrl: 'ftl-holster.css',
  shadow: true,
})
export class FtlHolster {
  private imgElement?: HTMLImageElement;
  private gridElement?: HTMLDivElement;
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
  @Prop() name?: string = 'Test Case';

  @State() imageUrl: string;
  @Prop({ mutable: true, reflect: true }) opacity = '1';
  @Prop({ mutable: true, reflect: true }) view: viewOptions = 'toggle';
  @State() mode = 'side';
  @Prop({ mutable: true, reflect: true }) activeToggle = 'figma';
  @Prop({ mutable: true, reflect: true }) showGrid = true;
  @State() loading = true;
  @State() error = 'hi';
  @State() status: 'idle' | 'loading' | 'success' | 'fail' = 'idle';

  @Watch('accessToken')
  @Watch('fileId')
  handleParamChanges() {
    this._fetchImage();
  }

  componentWillLoad() {
    this._fetchImage();
  }

  private _fetchImage() {
    if (this.accessToken && this.fileId) {
      this.status = 'loading';
      const client = new Client(this.accessToken, this.fileId);
      client
        .getNode(this.node)
        .then((node: string) => {
          this.imageUrl = node;
          this.status = 'success';
        })
        .catch(e => {
          console.log(e.message);
          this.status = 'fail';
        });
    }
  }

  updateActiveToggle(e: Event) {
    this.activeToggle = (e.target as HTMLInputElement).value;
  }

  get figmaLoadingBlock() {
    return <div>Your content is loading</div>;
  }

  get loadingSvg() {
    return (
      <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#FFF">
        <g transform="matrix(1 0 0 -1 0 80)">
          <rect width="10" height="20" rx="3">
            <animate
              attributeName="height"
              begin="0s"
              dur="4.3s"
              values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="15" width="10" height="80" rx="3">
            <animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" />
          </rect>
          <rect x="30" width="10" height="50" rx="3">
            <animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" />
          </rect>
          <rect x="45" width="10" height="30" rx="3">
            <animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    );
  }

  /**
   * Prevents issue where Figma returns an image that is longer than the coded component in Overlay mode.
   * Because the figma image is positioned absolute and I have no idea how to do it with CSS.
   */
  setWidth() {
    const width = this.imgElement.width;
    const height = this.imgElement.height;
    if (width && height) {
      this.gridElement.setAttribute('style', `min-width: ${width}px; min-height: ${height + 50}px;`);
    }
  }

  camelize = s => s.replace(/-./g, x => x[1].toUpperCase());

  updateView(attribute, e) {
    const formatAttr = this.camelize(attribute);
    this[formatAttr] = e;
  }

  render() {
    return (
      <Host>
        <div class="ftl-holster">
          <header>
            <h2>{this.name}</h2>
          </header>

          <div
            class={{
              'container': true,
              'container__overlay': this.view === 'overlay',
              'container__toggle': this.view === 'toggle',
              'activeToggle--figma': this.activeToggle === 'figma',
              'activeToggle--code': this.activeToggle === 'code',
            }}
            part="container"
          >
            <div ref={el => (this.gridElement = el as HTMLDivElement)} class={{ 'grid': true, 'grid--overlay': this.showGrid }}>
              <div class="figma__container" part="figma-container">
                <div class="image__label">Figma</div>

                {this.status === 'loading' ? this.loadingSvg : null}
                {this.status === 'fail' ? <div> it failed</div> : null}
                {this.status === 'success' ? (
                  <img
                    part="image"
                    onLoad={() => this.setWidth()}
                    ref={el => (this.imgElement = el as HTMLImageElement)}
                    src={this.imageUrl}
                    style={{
                      opacity: this.view === 'overlay' ? `${this.opacity}` : '1',
                    }}
                    alt=""
                  />
                ) : null}
              </div>

              <div class="code__container" part="code-container">
                <div class="image__label">{this.view === 'overlay' ? 'Figma and Code' : 'Code'}</div>
                <slot></slot>
              </div>
            </div>
            <ftl-buckle
              active-toggle={this.activeToggle}
              show-grid={this.showGrid}
              opacity={this.opacity}
              view={this.view}
              onFtl-on-change={e => this.updateView(e.detail.attribute, e.detail.value)}
            ></ftl-buckle>
          </div>
        </div>
      </Host>
    );
  }
}
