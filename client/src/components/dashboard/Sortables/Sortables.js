import {SortableContainer, SortableElement, arrayMove,sortableHandle} from 'react-sortable-hoc';

export const SortableList = SortableContainer(({items,deleteItem,editItem}) => {
    return (
      <ul className='content-sortable mb-05 scroll'>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} 
          index={index} 
          data={value} 
          editItem={editItem}
          deleteItem={deleteItem}/>
        ))}
      </ul>
    );
});

export const DragHandle = sortableHandle(({data,...props}) =>{
    return(
        <div className='draggable'>
            <span className='name'>
                <i className="fas fa-sort mr-1"></i><span className='text'>{data.title}</span>
            </span>
            <span className='type'>
                <span className='text'>{data.typeInput}</span>
            </span>
            <span className='type'>
                <span className='text'>{data.enable === true ? "activo" : "inactive"}</span>
            </span>
        </div>
        )
    })

const SortableItem = SortableElement(({data,deleteItem,editItem,...props}) => {
    return(
        <li className='dragged-sortableElement'>
            <DragHandle data={data}></DragHandle>
            <div className='d-flex accions'>
                <div className='icon-sortable edit mr-1 c-pointer' onClick={()=>{editItem(data)}}>
                    <i className="fas fa-edit"></i>
                </div>
                <div className='icon-sortable delete c-pointer' onClick={()=>{deleteItem(data)}}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </li>
    );
})
    
