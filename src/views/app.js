import api from '../api'
import React from 'react'
import Sidebar from './sidebar'
import Navigation from './navigation'
import Grid from './grid'

export default function App() {

  const [posts,update_posts] = React.useState([]);

  React.useEffect(() => {

    async function fetch_api_data(){
      const { data } = await api.dummy_array(10);
      return update_posts(data);
    }

    fetch_api_data();

  },[]);

  return (
    <div className="App">

      <Sidebar />

      <div className="app-body">

        <Navigation />

        <Grid data={posts}/>

      </div>

    </div>
  );
}
