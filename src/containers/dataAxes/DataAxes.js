import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop';

const DataAxes = ({ header }) => {
    return (
        <>
            <h6>{header}</h6>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId="measureDropPoint"></DragDrop>
        </>
    )
}
export default DataAxes;