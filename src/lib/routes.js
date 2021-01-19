import Splash from "../pages/Splash.js";
import Main from "../pages/Main.js";
import PageDetails from "../pages/PageDetails.js";
import Player from "../pages/Player.js";
import {
  _fetchDetails,
  _fetchMoviesData,
  _fetchTVData,
  _searchMovies
} from "./Api.js";
import Search from "../pages/Search.js";

export default {
  root: "splash",
  routes: [
    {
      path: "splash",
      component: Splash,
      widgets: []
    },
    {
      path: "main",
      before: async page => {
        const main = await _fetchMoviesData();
        page.main = main;
      },
      component: Main,
      widgets: ["Menu"]
    },

    {
      path: "tv",
      before: async page => {
        const main = await _fetchTVData();
        page.main = main;
      },
      component: Main,
      widgets: ["Menu"]
    },
    {
      path: "detail/:ItemType/:ItemId",
      before: async (page, { ItemType, ItemId }) => {
        const detail = await _fetchDetails(ItemType, ItemId);
        page.detail = detail;
      },
      component: PageDetails,
      widgets: ["Menu"]
    },
    {
      path: "search/:searchTerm",
      before: async (page, { searchTerm }) => {
        if (searchTerm === undefined) {
          searchTerm = "default";
        }
        console.log('search term', );
        const result = await _searchMovies(searchTerm.toLowerCase());
        page.result = result;
      },
      component: Search,
      widgets: ["Menu"]
    },
    {
      path: "Player",
      component: Player,
      widgets: []
    }
  ]
};
