import React, { useContext } from 'react';
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { ListGroup} from 'react-bootstrap';

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (
        <ListGroup className='d-flex' horizontal>
            {device.brands.map(brand =>
            <ListGroup.Item
                style={{cursor:'pointer', textAlign:'center', width:'20%', margin:"3px"}}
                key={brand.id}
                className="p-2"
                onClick={() => {device.setSelectedBrand(brand)}}
                
                active={brand.id === device.selectedBrand.id ? 1 : 0}
            >
                {brand.name}
            </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default BrandBar;