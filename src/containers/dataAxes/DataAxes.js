import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';

const DataAxes = ({ header, AxesData, handleDeleteMeasure }) => {
    return (
        <div className="dataAxesContainer">
            <div className="dataAxesContainer-textBox">
                <h6 className="dataAxesContainer__text" data-test='Axis-data-text'>{header}</h6>
            </div>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId={header} >
                {AxesData && <div className="dimensionContainer__item" data-test='Axis-data-name'>
                    {AxesData.name} 
                    <button onClick={()=>handleDeleteMeasure(AxesData)} className="clearMeasureButton" data-test='clear-Axis-data-button'>Clear</button>
                </div>}
            </DragDrop>
        </div>
    )
}
export default DataAxes;