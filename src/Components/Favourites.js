import React,{Component} from 'react'
import {movies} from './getMovies'

export default class Favourites extends Component{
    constructor(){
        super();
        this.genreids={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',
        10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9468:'Mystery',10749:'Romance',
        878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        this.state={
            genre:[],
            currGen:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let data=JSON.parse(localStorage.getItem('movies-app')||'[]');
        let temp=[];
        data.forEach((movieObj)=>{
            if(!temp.includes(this.genreids[movieObj.genre_ids[0]])){
                temp.push(this.genreids[movieObj.genre_ids[0]]);
            }
        });
        temp.unshift('All Genres');
        console.log(temp);
        this.setState({
            movies:[...data],
            genre:[...temp]
        })
    }

    handleGenre=(genre)=>{
        this.setState({
            currGen:genre   
        })
    }
    handlePopuDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePopuAsc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatDesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatAsc=()=>{
        let temp=this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePrev=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            })
        }
        
    }
    handleNext=()=>{
        this.setState({
            currPage:this.state.currPage+1
        })
    }
    handleClick=(value)=>{
        this.setState({
            currPage:value
        })
    }
    handleDel=(id)=>{
        let newarr=[];
        newarr=this.state.movies.filter((movieObj)=> movieObj.id!=id);
        this.setState({
            movies:[...newarr]
        })
    }
    render(){
       let filterArr=[]
       if(this.state.currText==''){
           filterArr=this.state.movies;
       }
       else{
           filterArr=this.state.movies.filter((movieObj)=>{
               let title=movieObj.original_title.toLowerCase();
               return title.includes(this.state.currText.toLocaleLowerCase());
           });
       }
       if(this.state.currGen!='All Genres'){
           filterArr=this.state.movies.filter((movieObj)=> this.genreids[movieObj.genre_ids[0]]==this.state.currGen);
       }

       let page=Math.ceil(filterArr.length/this.state.limit);
       let pageArr=[];
       for(let i=1;i<=page;i++){
           pageArr.push(i);
       }
       let si=(this.state.currPage-1)*this.state.limit;
       let ei=si+Number(this.state.limit);

       filterArr=filterArr.slice(si,ei);
        return (
            <div className="main">
                <div className="row">
                    <div className="col-lg-3 col-sm-12">
                        <ul class="list-group fav-genre">
                            {

                                this.state.genre.map((genreObj)=>(
                                    this.state.currGen == genreObj?
                                    <li className="list-group-item" style={{background:'blue',color:'white',fontWeight:'bold'}}>{genreObj}</li>:
                                    <li className="list-group-item" style={{color:'blue'}} onClick={()=>{this.handleGenre(genreObj)}}>{genreObj}</li>
                                ))
                            }
                           
                        </ul>
                    </div>
                    <div className="col-lg-9 col-sm-12 my-table">
                        <div className="row">
                            <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e)=> this.setState({currText:e.target.value})}/>
                            <input type="number" className="input-group-text col" placeholder="Rows Count" onChange={(e)=> this.setState({limit:e.target.value})}/>
                        </div> 
                        <div className="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.handlePopuDesc}></i>Popularity<i class="fas fa-sort-down" onClick={this.handlePopuAsc}></i></th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.handleRatDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.handleRatAsc}></i></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterArr.map((movieObj)=>(
                                            <tr>
                                                <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/>{movieObj.original_title}</td>
                                                <td>{this.genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button type="button" class="btn btn-danger" onClick={()=> this.handleDel(movieObj.id)}>Delete</button></td>    
                                            </tr>

                                        ))
                                    }
                                 
                                </tbody>
                            </table>

                        </div>
                        <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Prev</a></li>
                            {
                                
                                pageArr.map((page)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(page)}>{page}</a></li>
                                ))
                            }
                        <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>

                        </ul>
                    </nav>

                    </div>
                    
                </div>

            </div>
        )
    }
}