import {SortableContainer, SortableElement, arrayMove,sortableHandle} from 'react-sortable-hoc';

export const GlobalSortable = SortableContainer(({items,deleteItem,editItem,html}) => {
    return (
        <ul className='content-sortable mb-05 scroll'>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} 
                    index={index} 
                    data={value} 
                    editItem={editItem}
                    deleteItem={deleteItem}
                    html={html}
                />
                ))
            }
        </ul>
    );
});

export const DragHandle = sortableHandle(({data,html,...props}) =>{
    return(
        <div className='draggable'>
            {
                html.map((item,index)=>{
                    const Component = item;
                    return(
                        <Component item={data} key={'drag-'+index}></Component>
                    )
                })
            }
            {/* <span className='name'>
                <i className="fas fa-sort mr-1"></i><span className='text'>{data.title}</span>
            </span>
            <span className='type'>
                <span className='text'>{data.typeInput}</span>
            </span>
            <span className='type'>
                <span className='text'>{data.enable === true ? "activo" : "inactive"}</span>
            </span> */}
        </div>
        )
    })

const SortableItem = SortableElement(({data,deleteItem,editItem,html,...props}) => {
    return(
        <li className='dragged-sortableElement'>
            <DragHandle data={data} html={html}></DragHandle>
            <div className='d-flex accions'>
                <div className='icon-sortable edit mr-1 c-pointer' onClick={()=>{editItem(data)}}>
                    <i className="fas fa-eye"></i>
                </div>
                <div className='icon-sortable delete c-pointer' onClick={()=>{deleteItem(data)}}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </li>
    );
})
    
