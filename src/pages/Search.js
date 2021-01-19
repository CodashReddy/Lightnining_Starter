import { Lightning, Router, Utils } from "@lightningjs/sdk";
import MovieList from "../components/MoviesList";
import MoviesListItem from "../components/MoviesListItem";
import { _searchMovies } from "../lib/Api";
import { getImageURL } from "../lib/Utils.js";

export default class Search extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        scale: 1.2,
        src: Utils.asset("images/background-new.png")
      },
      SearchPageTitle: {
        x: 600,
        y: 20,
        text: {
          text: "Search for movie or tv series..",
          fontSize: 48,
          textColor: 0xff8ecea2
        }
      },
      Message:{
        x: 600,
        y: 300,
        alpha:0,
        text:{text:'No Search results found!',fontSize:48, textColor:0xff8ecea2}
      },
      SearchBox: {
        SearchIcon: { w: 60, h: 60, src: Utils.asset("images/search.png") },
        SearchText:{ x:60,y:20,  text:{text:'', fontSize: 22, textColor:0xff000000}},
        rect: true,
        w: 600,
        h: 60,
        x: 600,
        y: 150
      },
      
      SearchResults: {
        type: MovieList,
        x: 300,
        y: 200,
        flex: { direction: "row", padding: 20, wrap: true },
        w: 1200
      }
    };
  }

 
  _init(){
    this._searchRes = [];
    this.tag('Message').patch({alpha:0})
  
  }
  _active() {
    this._searchRes = [];
    this._searchterm = "";
    this.tag('SearchText').patch({text:{text:''}});
  }

  pageTransition() {
    return "left";
  }

  _handle1() {
    const length = this._searchterm.length-1;
    this._searchterm= this._searchterm.slice(0, length);
    this.tag('SearchText').patch({text:{text:this._searchterm}});
  }


  _handleUp() {
    Router.focusWidget("Menu");
  }
  _getFocused() {
    // console.log('this.....',this);
    return this.tag("SearchResults");
  }

  set result(v) {
    console.log(".....results1", this._searchRes);
    this._searchRes.splice(0, this._searchRes.length)
    // this._searchRes=null;
    let tv = v.pop();
    console.log("tv.....", tv);
    let movie = v.pop();
    console.log("movie.....", movie);
    if (movie != undefined) {
      this._searchRes = this._searchRes.concat(movie);
    }
    if (tv !== undefined) {
      this._searchRes = this._searchRes.concat(tv);
    }
    console.log(".....results2", this._searchRes);
    if (this._searchRes.length === 0) {
      //TO DO
    }else{
      this.tag("SearchResults").items = this._searchRes.map(item => {
        if (item) {
          let label = item.type === "tv" ? item.name : item.title;
          return {
            type: MoviesListItem,
            label: label,
            genres: item.genres,
            src: getImageURL(item.poster_path),
            itemType: item.type,
            itemId: item.id,
            backdrop: item.backdrop_path,
            average: item.vote_average
          };
        }
      });
    }
 
  }

  _handleA() {
    this._searchterm = this._searchterm + "a";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("A selected", this._searchterm);
  }
  _handleB() {
    this._searchterm = this._searchterm + "b";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("B selected",this._searchterm);
  }
  _handleC() {
    this._searchterm = this._searchterm + "c";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("C selected",this._searchterm);
  }
  _handleD() {
    this._searchterm = this._searchterm + "d";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("D selected",this._searchterm);
  }
  _handleE() {
    this._searchterm = this._searchterm + "e";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("E selected",this._searchterm);
  }
  _handleF() {
    this._searchterm = this._searchterm + "f";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("F selected",this._searchterm);
  }
  _handleG() {
    this._searchterm = this._searchterm + "g";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("G selected",this._searchterm);
  }
  _handleH() {
    this._searchterm = this._searchterm + "h";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("H selected",this._searchterm);
  }
  _handleI() {
    this._searchterm = this._searchterm + "i";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("I selected",this._searchterm);
  }
  _handleJ() {
    this._searchterm = this._searchterm + "j";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("J selected",this._searchterm);
  }
  _handleK() {
    this._searchterm = this._searchterm + "k";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("K selected",this._searchterm);
  }
  _handleL() {
    this._searchterm = this._searchterm + "l";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("L selected",this._searchterm);
  }
  _handleM() {
    this._searchterm = this._searchterm + "m";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("M selected",this._searchterm);
  }
  _handleN() {
    this._searchterm = this._searchterm + "n";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("N selected",this._searchterm);
  }
  _handleO() {
    this._searchterm = this._searchterm + "o";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("O selected",this._searchterm);
  }
  _handleP() {
    this._searchterm = this._searchterm + "p";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("P selected",this._searchterm);
  }
  _handleQ() {
    this._searchterm = this._searchterm + "q";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("Q selected",this._searchterm);
  }
  _handleR() {
    this._searchterm = this._searchterm + "r";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("R selected",this._searchterm);
  }
  _handleS() {
    this._searchterm = this._searchterm + "s";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("S selected",this._searchterm);
  }
  _handleT() {
    this._searchterm = this._searchterm + "t";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("T selected",this._searchterm);
  }
  _handleV() {
    this._searchterm = this._searchterm + "v";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("V selected",this._searchterm);
  }
  _handleU() {
    this._searchterm = this._searchterm + "u";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("U selected",this._searchterm);
  }
  _handleW() {
    this._searchterm = this._searchterm + "w";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("W selected",this._searchterm);
  }
  _handleX() {
    this._searchterm = this._searchterm + "x";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("X selected",this._searchterm);
  }
  _handleY() {
    this._searchterm = this._searchterm + "y";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("Y selected",this._searchterm);
  }
  _handleZ() {
    this._searchterm = this._searchterm + "z";
    this.tag('SearchText').patch({text:{text:this._searchterm}});
    console.log("Z selected",this._searchterm);
  }



  _handle0(){
    console.log('searchterm', this._searchterm);
      if(this._searchterm.length===0){
        this.tag('SearchResults').patch({alpha:0})
        this.tag('Message').patch({alpha:1})
      }else{
        this.tag('SearchResults').patch({alpha:1})
        this.tag('Message').patch({alpha:0})
        Router.navigate(`search/${this._searchterm}`,false);
        
      }
  }
}
