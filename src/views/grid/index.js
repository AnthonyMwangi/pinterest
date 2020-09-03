import './_styles.scss'
import React from 'react'
import { Post } from '../../components'

export default class PostsWrapper extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      posts: []
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

  debounce = (callback,duration) => {

    callback()

  }

  componentDidUpdate() {

    if (this.state.refresh) this.refresh_grid();

  }

  static getDerivedStateFromProps(props,state) {

    const data = props.data.map(a => a.id).toString();

    const posts = state.posts.map(a => a.id).toString();

    if (posts!==data) return { posts: props.data, refresh: true };

    return null;

  }

  refresh_grid = () => {

    if (!this.grid) this.load_grid();

    if (!!this.state.refresh) this.setState({ refresh: false });

    const row_size = this.get_grid_value('grid-auto-rows');

    const row_gap = this.get_grid_value('grid-row-gap');

    this.grid.querySelectorAll('.post').forEach((post) => {

      post.classList.remove("cover");

      const post_wrapper = post.querySelector('.post_wrapper');

      const post_height = this.get_grid_value('height',post_wrapper);

      const row_span = Math.ceil((post_height + row_gap) / (row_size + row_gap));

      post.style.setProperty("height", post_height);

      post.style.setProperty("--row-span", row_span);

      post.classList.add("cover");

    });

  };

  random_height = (min, max) => Math.round(Math.random() * (max - min) + min);

  get_grid_value = (property,element=this.grid) => {
    let value = getComputedStyle(element).getPropertyValue(property);
    if (property==='columns') value = value.replace('auto ','');
    return parseInt(value, 10);
  }

  render() {

    const { posts=[] } = this.state;

    const styles = {
      //gridTemplateRows: `repeat(${2}, auto)`,
      //gridTemplateColumns: `repeat(auto-fit, minmax(${310}px, 1fr))`
    }

    return (
      <div className="posts-wrapper masonry-grid" style={styles}>
        {
          posts.map((a, i) => <Post key={i} data={a} />)
        }
      </div>
    )

  }
}
