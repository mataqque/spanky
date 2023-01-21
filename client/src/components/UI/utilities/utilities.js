export const animation = (values,classes,reg, space)=>{
    let reduce = "";
    let arrayWords = values.split(reg)
    let spaceLetter = ' '
    if(space){
        spaceLetter = ''
    }
    let createSpan = arrayWords.map((e,index)=>{
        reduce += `<span class='${classes} y-hidden'><p class='animate animate-${index}'>${e}</p></span>${spaceLetter}`
    })
    return reduce
}