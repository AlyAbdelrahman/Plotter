import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';

const DataAxes = ({ header, AxesData }) => {
    console.log('>>AxesData',AxesData)
    return (
        <div className="dataAxesContainer">
            <div className="dataAxesContainer-textBox">
                <h6 className="dataAxesContainer__text">{header}</h6>
            </div>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId={header}>
                {AxesData ? AxesData.name : ''}
            </DragDrop>
        </div>
    )
}
export default DataAxes;