import fetch_dummy_data from './dummy'
import Unsplash, { toJson } from 'unsplash-js'

const unsplash = new Unsplash({

  //Unsplash Api ID: Get yours for free: https://api.unsplash.com/
  accessKey: "0d859b57d29409e54ab4de6bfe2ef629aaa2d377d72919b91f1589d37a542913",

});

//const random_count = Math.floor(Math.random() * 1366);

const error_handler = (err) => ({ error: err.message, data: [] });

export default {

  photos: async function (count = 30) {

    const { getRandomPhoto } = unsplash.photos;

    const data = await getRandomPhoto({count}).then(toJson).catch(error_handler);

    return (!!data.error) ? data : { error: null, data };

  },

  search: async function (keyword='random', count = 30, page=1) {

    const search_photo = unsplash.search.photos;

    const data = await search_photo(keyword,page,count).then(toJson).catch(error_handler);

    return (!!data.error) ? data : { error: null, data: data.results };

  },

  dummy: async (count) => ({ data: fetch_dummy_data(count) })

}
