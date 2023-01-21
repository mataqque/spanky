class Pologine{
    constructor(props){
        this.containerAttr = document.querySelector(".containers").getBoundingClientRect();
        this.poligone = document.querySelector(".poligone");
        this.typeBtnCoord = null;
        this.typeProporcion = 'proportionate' //proportionate,disproportionate;
        this.handleBtnCoords = {
            se:null,
        };
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
    }
    init=()=>{
        
    }
    createPoligone = (data,type) => {
        this.poligone.style.display = "flex";
        const {x,y,width,height} = data;
        this.setPosition(x,y);
        this.setSize(width,height);
        this.typeBtnCoord = type;
        this.handleBtnCoords = {
            se:{
                x: x + width,
                y: y + height,
            }
        };
    }
    setSize=(width,height)=>{
        try {
            this.height = height;
            this.width = width;
            this.poligone.style.width = width + "px";
            this.poligone.style.height = height + "px";
        } catch (error) {
            
        }

    }

    setPosition =(x,y)=>{
        this.poligone.style.left = (x - this.containerAttr.x) + "px";
        this.poligone.style.top = (y - this.containerAttr.y) + "px"
    }
    destroy = () => {
        this.poligone.style.display = "none";
    }
}
class Image{
    constructor(props){
        this.props =  props;
        this.images = props.images
        this.imgSelected = null;
        this.imgSelectedAttr = null;
        this.onLoadImages();
        this.width = 0;
        this.height = 0;
    }
    initImage =()=>{
        this.onLoadImages();
    }
    onLoadImages =()=>{
        this.images.forEach((img)=>{
            img.addEventListener("click",this.onEventImage);
        })
    }
    onEventImage =(e)=>{
        if(e.target.nodeName == "IMG"){
            
            this.imgSelected = e.target;
            this.updateAttr();
            this.props.eventImage(e)
        }else{
            
        }
    }
    setSize =(width,height)=>{
        try {
            this.imgSelected.style.width = width + "px";
            this.imgSelected.style.height = height + "px";
        } catch (error) {
            
        }
    }
    updateImages =(images)=>{
        this.images = images;
        this.initImage();
    }
    updateAttr =()=>{
        try {
            this.imgSelectedAttr = this.imgSelected.getBoundingClientRect();
        } catch (error) {
            
        }
    }
}

export default class ResizerLibrary{
    constructor(props){  
        this.container = document.querySelector(props.container);
        this.image = new Image({
            images:this.container.querySelectorAll("img"),
            eventImage:this.eventImage,
        });
        this.poligone =  new Pologine();
        this.init();
    }
    click = (e) => {
        // console.log(e)
        // if(e.target.nodeName != "IMG"){
        //     this.poligone.destroy();
        // }
    }
    eventImage=(e)=>{ 
        if(this.image.imgSelected){
            this.poligone.createPoligone({
                x:this.image.imgSelectedAttr.x,
                y:this.image.imgSelectedAttr.y,
                width:this.image.imgSelectedAttr.width,
                height:this.image.imgSelectedAttr.height,
            });
        }
    }
    clickBtnCoord=(e,type)=>{
        this.poligone.typeBtnCoord = type;
        this.image.updateAttr();
        this.poligone.handleBtnCoords.se = {
            x:this.image.imgSelectedAttr.x + this.image.imgSelectedAttr.width,
            y:this.image.imgSelectedAttr.y + this.image.imgSelectedAttr.height,
        }
    }
    onMouseMove =(e)=>{
        if(this.poligone.typeBtnCoord != null){
            if(this.poligone.typeProporcion == "proportionate"){
                let x = (e.clientX - this.poligone.handleBtnCoords.se.x);
                let y = (e.clientY - this.poligone.handleBtnCoords.se.y);
                if(x < y){
                    let percentY = y / this.image.imgSelectedAttr.height;
                    let width = this.image.imgSelectedAttr.width + (this.image.imgSelectedAttr.width * percentY);
                    let height = (this.image.imgSelectedAttr.height + (e.clientY - this.poligone.handleBtnCoords.se.y));
                    this.poligone.setSize(width,height);
                }
                if(x > y){
                    let percentX = x / this.image.imgSelectedAttr.width;
                    let height = this.image.imgSelectedAttr.height + (this.image.imgSelectedAttr.height * percentX);
                    let width = (this.image.imgSelectedAttr.width + (e.clientX - this.poligone.handleBtnCoords.se.x));
                    this.poligone.setSize(width,height);   
                }
            }else{
                let width = (this.image.imgSelectedAttr.width + (e.clientX - this.poligone.handleBtnCoords.se.x));
                let height = (this.image.imgSelectedAttr.height + (e.clientY - this.poligone.handleBtnCoords.se.y));
                this.poligone.setSize(width,height);
            }
        }
    }
    onMouseUpCapture =(e)=>{
        try {
            this.image.updateAttr();
            this.image.setSize(this.poligone.width,this.poligone.height);
            this.poligone.setPosition(this.image.imgSelected.getBoundingClientRect().x,this.image.imgSelected.getBoundingClientRect().y);
            this.poligone.typeBtnCoord = null;
        } catch (error) {
            
        }
    }
    onChangeEvent =(e)=>{
        this.container.querySelectorAll("img");
        this.image.updateAttr();
        this.eventImage(e);
        // console.log(e.nativeEvent.inputType)
        if(e.nativeEvent.inputType == "insertFromDrop"){
            console.log("insertFromDrop")
            this.image.updateImages(this.container.querySelectorAll("img"));
        }
    }
    init =()=>{

    }
}