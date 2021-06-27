import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop';

const DataAxes = ({ header }) => {
    return (
        <div className="dataAxesContainer">
            <div className="dataAxesContainer-textBox">
                <h6 className="dataAxesContainer__text">{header}</h6>
            </div>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId="measureDropPoint"></DragDrop>
        </div>
    )
}
export default DataAxes;