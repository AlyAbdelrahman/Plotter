import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';

const DataAxes = ({ header, AxesData, handleDeleteMeasure }) => {
    return (
        <div className="dataAxesContainer">
            <div className="dataAxesContainer-textBox">
                <h6 className="dataAxesContainer__text">{header}</h6>
            </div>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId={header} >
                {AxesData && <div className="dimensionContainer__item">
                    {AxesData.name} 
                </div>}
                {AxesData && <button onClick={()=>handleDeleteMeasure(AxesData)} className="clearMeasureButton">Clear</button>}
            </DragDrop>
        </div>
    )
}
export default DataAxes;