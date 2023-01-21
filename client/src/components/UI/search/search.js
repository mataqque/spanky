import React, { Component } from 'react'
import './search.scss'
export default class Search extends Component {
    constructor(props){
        super(props)
        this.changeInput = this.changeInput.bind(this)
        this.focusSearch = this.focusSearch.bind(this)
    }
    componentDidMount(){
        
    }
    changeInput(e){
        let value = e.target.value
        this.props.handleSearchChange({value:value})
    }
    leaveSearch(){
        this.props.leaveSearch()
    }
    focusSearch(){
        this.props.focusSearch()
    }
    
    render() {
        return (
            <div className={`content-search-all`}>
                <div className={`content-search ${this.props.class}`}>
                    <input className={`input_search input_${this.props.class}`} 
                        onChange={(e)=>{this.changeInput(e)}}
                        value={this.props.value}
                        onFocus={()=>{this.focusSearch()}}
                        placeholder={"Busca tu componente"}
                    >
                    </input>
                    <div className={`icon-search icon_${this.props.class}`}></div>
                </div>
                {this.props.children}
                <div className={`background-search ${this.props.active ? "active" : ""}`} onClick={(e)=>{this.leaveSearch(e)}}>

                </div>
            </div>
        )
    }
}
