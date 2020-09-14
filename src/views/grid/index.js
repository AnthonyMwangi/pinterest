import './_styles.scss'
import React from 'react'
import { ImSpinner7 } from 'react-icons/im'
import { Post, Loader } from '../../components'

export default class PostsWrapper extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      posts: [],
      category: null,
    }

    this.grid = null;

  }

  load_grid = () => this.grid = document.querySelector(".masonry-grid");

  componentDidMount() {

    window.addEventListener("resize", () => this.debounce(this.refresh_grid, 100));

    window.addEventListener("load", this.refresh_grid);

    if (!this.grid) this.load_grid();

    const { data } = this.props;

    this.setState({ posts: data });

    this.refresh_grid();

  }

  debounce = (callback, duration) => {

    callback()

  }

  componentDidUpdate() {

    if (this.state.refresh) this.refresh_grid();

  }

  static getDerivedStateFromProps(props, state) {

    const data = props.data.map(a => a.id).toString();

    const posts = state.posts.map(a => a.id).toString();

    if (posts !== data) return { posts: props.data, refresh: true };

    return null;

  }

  refresh_grid = () => {

    if (!this.grid) this.load_grid();

    if (!!this.state.refresh) this.setState({ refresh: false });

    const row_size = this.get_grid_value('grid-auto-rows');

    const row_gap = this.get_grid_value('grid-row-gap');

    this.grid.querySelectorAll('.post').forEach((post) => {

      post.classList.remove("cover");

      const { height, width } = post.dataset;

      const content = post.querySelector('.content');

      const content_height = this.get_grid_value('height', content);

      const content_width = this.get_grid_value('width', content);

      const post_wrapper = post.querySelector('.post_wrapper');

      const post_image = post_wrapper.querySelector('.image');

      let post_height = this.get_grid_value('height', post_wrapper);

      let image_height = this.get_grid_value('height', post_image);

      if (image_height === 0) {

        image_height = Math.round((content_width / parseInt(width)) * parseFloat(height));

        post_height = image_height + content_height;

      }

      const row_span = Math.ceil((post_height + row_gap) / (row_size + row_gap));

      post.style.setProperty("height", post_height);

      post.style.setProperty("--row-span", row_span);

      post.classList.add("cover");

    });

  };

  random_height = (min, max) => Math.round(Math.random() * (max - min) + min);

  get_grid_value = (property, element = this.grid) => {

    if (!element) return 0;

    let value = getComputedStyle(element).getPropertyValue(property);

    if (property === 'columns') value = value.replace('auto ', '');

    return parseInt(value, 10);

  }

  on_select_post = (a) => this.props.onClickPost(a);

  on_load_more = async () => {

    if (!!this.state.loading_more) return;

    this.setState({ loading_more: true });

    await this.props.onClickLoadMoreButton();

    return this.setState({ loading_more: false });

  }

  render() {

    const { posts = [], loading_more } = this.state;

    return (
      <div className="posts-wrapper">

        <div className="grid-title" dangerouslySetInnerHTML={{ __html: this.props.category }} />

        <div className="masonry-grid">

          {!this.props.loading && posts.map((a, i) => <Post key={i} data={a} onSelect={this.on_select_post} />)}

          {!!this.props.loading && <Loader context={this.props.category} />}

        </div>

        {
          !this.props.loading && <div className="load-more">
            <div className={`button ${!loading_more ? 'loaded' : 'loading'}`} onClick={this.on_load_more}>
              {!this.state.loading_more ? `Load More` : <Spinner />}
            </div>
          </div>
        }

      </div>
    )

  }
}

function Spinner() {
  return (
    <div className="icon-wrapper">
      <ImSpinner7 className='icon' />
    </div>
  )
}
