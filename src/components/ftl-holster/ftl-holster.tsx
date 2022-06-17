import { State, Prop, Component, Host, h } from '@stencil/core';
import { Client } from '../../utils/client';

@Component({
  tag: 'ftl-holster',
  styleUrl: 'ftl-holster.css',
  shadow: true,
})
export class FtlHolster {

  /** 
   * Your Figma Personal Access Token. Find it under account settings from the top-left menu inside Figma.
  */
  @Prop() accessToken: string;

  /**
   * Your Figma file ID. https://www.figma.com/file/<MY FILE ID>/my-file
   */
  @Prop() fileId: string;

  /**
   * The node ID of the component you want to preview.
   */
  @Prop() node: string;

  @State() imageUrl: string
  @State() opacity = 1;
  @State() view = 'figma'


  componentWillLoad() {
    const client = new Client(this.accessToken, this.fileId)
    client.getNode(this.node).then((node: string) => {
      this.imageUrl = node
    })
  }

  updateOpacity(e) {
    this.opacity = e.target.value
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

  render() {
    return (
      <Host>
        <div class="ftl-holster">
          <div class="container">

          <div class="stuff">
            <div>

        {!this.imageUrl ? this.loadingSvg
         : null}
                <img class={{
                  'preview': true,
                  'hidden': this.view === 'component'
                }} src={this.imageUrl} style={{
                  opacity: `${this.opacity}`
                }} alt="" />

                <div class={{
                  'component': true,
                  'hidden': this.view === 'figma'
                }}>
                  <slot></slot>
                </div>


            </div>



          </div>
          <div class="controls">
            <div>
              <label htmlFor="figma">Figma</label>
              <input 
              checked={this.view === 'figma'}
              onChange={() => this.view = 'figma'}
              name="view" id="figma" type="radio" value="figma"></input>
            </div>
            <div>
              <label htmlFor="component">Component</label>
              <input 
                            checked={this.view === 'component'}
                            onChange={() => this.view = 'component'}
              name="view" id="component" value="component" type="radio"></input>
            </div>
            <div>
              <label htmlFor="both">Both</label>
              <input 
                            checked={this.view === 'both'}
                            onChange={() => this.view = 'both'}
              name="view" id="both" value="both" type="radio"></input>
            </div>
            <input
              id="slider"
              type="range"
              min="0.0"
              max="1.0"
              step="0.1"
              onChange={(e) => this.updateOpacity(e)}
              value={this.opacity}
            />
          </div>
          </div>
        </div>
      </Host>
    );
  }

}
