import './_styles.scss'
import React, { Component } from 'react'

export default class ProgressiveImage extends Component {

  constructor(props) {
    super(props);
    this.id = `${this.props.id}-${Math.floor(Math.random() * 0xFFFF) }`;
    this.component = document.getElementById(this.id);
  }

  componentDidMount = () => {

    this.component = document.getElementById(this.id);

    const { getElementsByClassName } = document;

    const { addEventListener, requestAnimationFrame } = window;

    if (!addEventListener || !requestAnimationFrame || !getElementsByClassName) return;

    return add_progressive_listener(this.id,this.props.full);

  }

  render() {

    const { data = { thumb:'', regular:'', full:'' }, title='', styles={} } = this.props;

    return (
      <a href={!!this.props.full ? data.full : data.regular } className="progressive replace" id={this.id}>
        <img
          alt={title}
          style={styles}
          loading={"lazy"}
          src={data.thumb}
          className="image noselect preview"
        />
      </a>
    )
  }
}

const add_progressive_listener = (id,full) => {

  if (!!full) return progressive_image_listener(id,full);

  return window.addEventListener('load', () => progressive_image_listener(id), false);

}

const progressive_image_listener = (id,full) => {

  let scroll_timer;

  window.addEventListener('scroll', animate_on_window_scroll, false);

  window.addEventListener('resize', animate_on_window_scroll, false);

  let progressive_image = document.getElementById(id);

  var currently_in_view = image_in_view();

  // throttled scroll/resize
  function animate_on_window_scroll() {

    scroll_timer = scroll_timer || setTimeout(function () {

      scroll_timer = null;

      requestAnimationFrame(image_in_view);

    }, 300);

  }


  // image in view?
  function image_in_view() {

    let window_offset = window.pageYOffset;

    let window_position = window_offset + window.innerHeight;

    const { height, top } = progressive_image.getBoundingClientRect();

    const progressive_image_top = window_offset + top;

    const progressive_image_base = progressive_image_top + height;

    if (window_offset < progressive_image_base && window_position > progressive_image_top) {

      if (!!currently_in_view) return;

      load_full_image(progressive_image);

      progressive_image.classList.remove('replace');

      currently_in_view = true;

      return true;

    }

    currently_in_view = false;

    return false;

  }


  // replace with full image
  function load_full_image(item) {

    if (!item || !item.href) return;

    let full_image = new Image();

    full_image.src = item.href;

    full_image.className = 'reveal final';

    if (full_image.complete) add_loaded_image();

    else full_image.onload = add_loaded_image;

    // replace image
    function add_loaded_image() {

      // disable click
      item.addEventListener('click', function (e) { e.preventDefault(); }, false);

      // add full image
      item.appendChild(full_image).addEventListener('animationend', function (e) {

        // remove preview image
        const preview = item.querySelector && item.querySelector('img.preview');

        if (preview) {

          e.target.alt = preview.alt || '';

          item.removeChild(preview);

          e.target.classList.remove('reveal');

        }

      });

    }

  }

};
