import { useEffect, useRef } from "react";
import { setInputProps } from "../../helpers/common/forms/Form";
import { onChangeInput } from "../../helpers/helpers";

export const InputText = (props) => {
    const { title,name, placeholder, value,form,setter,...rest } = props;

    return (
        <div className={`content-input f-column ${rest?.className ? rest.className : ''}`}>
            <label>{title}</label>
            <input
                type="text"
                name={name}
                placeholder={placeholder || ""}
                {...setInputProps(name, `input ${form.errors[name] ? "--invalid" : ""}`, form)}
                onChange={(e)=>{onChangeInput(setter,e)}}
                defaultValue={rest?.valuesDefault[name] || ""}
            />
        </div>
    );
}

export const InputSelect = (props) => {
    const { title,name, placeholder, value,form,setter,...rest } = props;
    const selected = useRef(null)
    
    let time = setTimeout(()=>{
        selected.current.value = rest?.valuesDefault[name] || "";
        clearInterval(time);
    },200)

    return (
        <div className={`content-input f-column ${rest?.className}`}>
            <label>{title}</label>
            <select name={name} 
                {...setInputProps(name, `input ${form.errors[name] ? "--invalid" : ""}`, form)}
                onChange={(e)=>{onChangeInput(setter,e)}}
                defaultValue={rest?.valuesDefault[name] || ""}
                ref={selected}
                >
                <option value="">Seleccionar</option>
                {
                    rest.item.options.map((item,index)=>{
                        return(
                            <option value={item.value} key={index+"option-builder"}>{item.label}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export const InputRadio = (props) => {
    const { name, placeholder, value, ...rest } = props;
    return (
        <label>
            
        </label>
    );
}