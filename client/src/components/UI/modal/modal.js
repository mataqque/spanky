import { useDispatch, useSelector } from 'react-redux';
import './modal.scss';
import { activeModal } from './modalSlice';

export default function Modal(props){
    const dispatch = useDispatch();
    const typeModal = useSelector(state => state.modal.active);
    return(
        <div className={`modal-global ${props?.name} ${typeModal == true ? 'active':''}`}>
            <div className='contain-modal'>
                <div className='icon-close mask' onClick={()=>{dispatch(activeModal(false))}}>
                </div>
                {props.children}
            </div>
        </div>
    )
}