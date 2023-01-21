import React, { Component } from 'react'
import Lottie from 'react-lottie'

export default class Icon extends Component{
    constructor(props){
        super(props)
        this.state = {
            isStopped: false,
            isPaused: false,
            speed:this.props.properties.speed, 
            defaultOptions:{
                loop: this.props.properties.loop,
                autoplay: this.props.properties.autoplay,
                animationData: this.props.properties.animationData,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
        }
    }
    addItem(){
        this.setState({isPaused:false,isStopped:false})
        let time = setInterval(() => {
            this.setState({isPaused:true,isStopped:true})
            clearInterval(time)
        }, 1000);
    }
    render(){
        return(
            <div className={this.props.className} key={this.props.className}>
                <Lottie    
                    options={this.state.defaultOptions}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                    speed={this.state.speed}
                >
                </Lottie>
            </div>
        )
    }
}
