import react,{Component} from 'react';
import axios from 'axios';

export default class Movies extends Component{
    constructor(){
        super();
        this.state={
            hover:' ',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
        
    }
    async componentDidMount(){
        let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0239fccdb4115b351ac09500d971b839&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies=async()=>{
        let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0239fccdb4115b351ac09500d971b839&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    handleNext=()=>{
        let temp=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temp.push(i);
        }
        this.setState({
            parr:[...temp],
            currPage:this.state.currPage+1
        },this.changeMovies)//first we have to change the page then we have to call changeMovies

    }
    handlePrev=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage: this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick = (value)=>{
        if(this.state.currPage!=value){
            this.setState({
                currPage: value
            },this.changeMovies)
        }

    }
    handleFav =(movie) =>{
        let prevdata=JSON.parse(localStorage.getItem('movies-app')|| '[]');
        if(this.state.favourites.includes(movie.id)){
            prevdata=prevdata.filter((m)=>m.id!=movie.id)
        }
        else{
            prevdata.push(movie);
        }
        localStorage.setItem('movies-app',JSON.stringify(prevdata));
        this.handleFavState();
        console.log(prevdata);
    }
    handleFavState= ()=>{
        let prevdata=JSON.parse(localStorage.getItem('movies-app')|| '[]');
        let temp=prevdata.map((obj)=>obj.id);
        this.setState({
            favourites:[...temp]
        })
    }
    render(){

        return (
        <>
        {
            this.state.movies.length ==0 ?
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> :    
                        <div>
                            <h2 className="text-center">Trending</h2>
                            <div className="movie-list">
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})}  onMouseLeave={()=>this.setState({hover:''})}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                className="card-img-top movie-img" alt="..." />
                                            {/*<div className ="card-body">*/}
                                            <h5 className="card-title movie-title">{movieObj.title}</h5>
                                            {/*<p className ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
                                            <div className="btn-wrapper" style={{display: 'flex', width: '100%',justifyContent: 'center'}}>
                                                {
                                                    this.state.hover === movieObj.id&&<a href="#" class="btn btn-primary movie-btn" onClick={()=> this.handleFav(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove From Favourites":"Add To Favourites"}</a>
                                                }
                                                
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
                                    {
                                        this.state.parr.map((value)=>(
                                            <li class="page-item"><a class="page-link" onClick={()=> this.handleClick(value)}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
                                </ul>
                            </nav>
                            </div>
                        </div>

        }  
        </>);

    }
}