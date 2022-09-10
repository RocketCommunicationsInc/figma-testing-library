import { Prop, Event, EventEmitter, Component, Host, h } from '@stencil/core';


export type viewOptions = 'toggle' | 'side-by-side' | 'overlay'

export type configSettings = {
  attribute: 'view' | 'show-grid' | 'active-toggle' | 'opacity'
  value: string
}

@Component({
  tag: 'ftl-buckle',
  styleUrl: 'ftl-buckle.css',
  shadow: true,
})




export class FtlBuckle {
  @Prop({mutable: true, reflect: true}) opacity = '1'
  @Prop({mutable: true}) showGrid = true
  @Prop({mutable: true}) activeToggle = 'figma'
  @Prop({mutable: true}) view: viewOptions = 'toggle'
  @Prop() mode = 'side'


  @Event({ eventName: 'ftl-on-change' }) ftlOnChange: EventEmitter<configSettings>

  private _emitOnChange(attribute, value) {
    this.ftlOnChange.emit({
      attribute,
      value
    })
  }
  private _updateShowGrid(val) {
    this.showGrid = val
    this._emitOnChange('show-grid', val)
  }

  private _updateView(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value as viewOptions
    this.view = value;
    this._emitOnChange('view', value)
  }

  private _updateOpacity(opacity) {
    this.opacity = opacity
    this._emitOnChange('opacity', opacity)
  }

  private _updateActiveToggle(e) {
    let val = 'figma'
    if (e.target.checked) {
      val = 'code'
    }
    this.activeToggle = val
    this._emitOnChange('active-toggle', val)
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
            onChange={(e) => this._updateActiveToggle(e)}
          />
          <label class="segmented-control__label" htmlFor="option-figma">Figma</label>
        </li>
        <li class="segmented-control__item">
          <input class="segmented-control__input"
            type="radio" value="code" name="option"
            id="option-code" checked={this.activeToggle === 'code'}
            onChange={(e) => this._updateActiveToggle(e)}
          />
          <label
            class="segmented-control__label"
            htmlFor="option-code"
          >Code</label>
        </li>
      </ul>
    )
  }

  get viewControl() {
    return (
      <ul class="segmented-control">
        <li class="segmented-control__item">
          <input
            class="segmented-control__input"
            type="radio"
            value="toggle"
            name="option"
            id="option-toggle"
            checked={this.view === 'toggle'}
            onChange={(e) => this._updateView(e)}
          />
          <label class="segmented-control__label" htmlFor="option-toggle">Toggle</label>
        </li>
        <li class="segmented-control__item">
          <input class="segmented-control__input"
            type="radio" value="overlay" name="option"
            id="option-overlay" checked={this.view === 'overlay'}
            onChange={(e) => this._updateView(e)}
          />
          <label
            class="segmented-control__label"
            htmlFor="option-overlay"
          >Overlay</label>
        </li>
        <li class="segmented-control__item">
          <input class="segmented-control__input"
            type="radio" value="sidebyside" name="option"
            id="option-sidebyside" checked={this.view === 'side-by-side'}
            onChange={(e) => this._updateView(e)}
          />
          <label
            class="segmented-control__label"
            htmlFor="option-sidebyside"
          >Side By Side</label>
        </li>
      </ul>
    )
  }
  get selects() {
    return (
      //@ts-ignore
      <select name="mode" id="mode" class="select-mode" onChange={(e) => this._updateView((e.target as HTMLInputElement).value)}>
        <option value="toggle" selected={this.view === 'toggle'}>Toggle</option>
        <option value="overlay" selected={this.view === 'overlay'}>Overlay</option>
        <option value="side-by-side" selected={this.view === 'side-by-side'}>SIde By Side</option>
      </select>
    )
  }

  render() {
    return (
      <Host>

        <div class="controls-bar" part="base">
          <div part="holster-option">
            {this.viewControl}
          </div>
          {this.view === 'overlay' ? (
            <div part="holster-option" class="control opacity-control">
              <label htmlFor="slider">Opacity:</label>
              <input
                type="range"
                id="slider"
                min="0.0"
                max="1.0"
                step="0.1"
                class="opacity-slider"
                name="slider"
                onInput={(e) => this._updateOpacity((e.target as HTMLInputElement).value)}
                value={this.opacity}
              />
            </div>
          ) : null}

            {this.view === 'toggle' ? (
              <div part="holster-option">
                <div class="switch">
                  <span>Figma</span>
                  <input
                    onInput={(e) => this._updateActiveToggle(e)}
                    checked={this.activeToggle === 'code'}
                    type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
                  <span>Code</span>
                </div>
              </div>
            ) : null}


          <div part="holster-option">
            <label htmlFor="showGrid" class="checkbox checkbox--showGrid">
            <input
              class="checkbox__input"
              id="showGrid"
              type="checkbox"
              checked={this.showGrid} onChange={(e) => this._updateShowGrid((e.target as HTMLInputElement).checked)}
            />
            Show Grid

          </label>
        </div>
        </div>
      </Host>
    );
  }

}
