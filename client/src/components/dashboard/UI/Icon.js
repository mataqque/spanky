import Lottie from 'react-lottie'

function Icon (props) {
    const defaultOptions = {
        defaultOptions:{
            loop: true,
            autoplay: true,
            animationData: props.properties.icon,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
     }
    return(
    <div className={`${props.properties.class ? props.properties.class : ''}`}>
        <Lottie    
            options={defaultOptions.defaultOptions}
            // isStopped={this.state.isStopped}
            // isPaused={this.state.isPaused}
            // speed={this.state.speed}
        >
        </Lottie>
    </div>
    )
}
export default Icon;