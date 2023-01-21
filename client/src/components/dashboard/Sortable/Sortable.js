import React, { Component } from 'react';
import { connect } from 'react-redux';
const { Sortable } = require('react-sortable');

class SortableContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: this.props.data,
        };
    }
    componentDidMount(){
        console.log('props',this.props);
    }
    render() {   
      return (
            <ul className='sortable scroll small-select-to' id="tab-navigation-container">
                {
                    this.props.value.data.map((item,i)=>{
                        return(
                            <SortableItem 
                            key={i+"ul"}
                            onSortItems={this.props.onSortItems}
                            editSlider={this.props.editSlider}
                            removeSlider={this.props.removeSlider}
                            addSlider={this.props.addSlider}
                            items={JSON.parse(JSON.stringify(this.props.value.data))}
                            item={JSON.parse(JSON.stringify(item))}
                            sortId={i}
                            index={i}
                            >{item}
                            </SortableItem>
                        )
                    })
                }
                <div className='add-item-sortable' onClick={()=>{this.props.addSlider({type:this.props.type})}}>
                    <i className="fas fa-plus"></i>
                </div>
            </ul>
      )
    }
};
const MapStateProps =(state)=>{
    return(
        {
            value: state.slider
        }
    )
}
export default connect(MapStateProps,null)(SortableContent)


class Item extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <li className="item-sortable" {...this.props} key={this.props.index+"-li"}>
                <i className="fas fa-grip-vertical"></i>
                <span className='span-title'>{this.props.children.title}</span>
                <div className='btn-delete b-red c-white' onClick={()=>{this.props.removeSlider(this.props.index)}}>
                    <i className="far fa-trash-alt c-white" aria-hidden="true"></i>
                    <span className='span-title'>Eliminar</span>
                </div>
                <div className='btn-delete b-green c-white' onClick={()=>{this.props.editSlider(this.props.item)}}>
                    <i className="fas fa-pencil-alt c-white"></i>
                    <span className='span-title'>Editar</span>
                </div>
            </li>
        )
    }
}
   
   
  var SortableItem = Sortable(Item);
  