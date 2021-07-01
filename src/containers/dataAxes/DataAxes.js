import React from 'react';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';
import PropTypes from 'prop-types';

/**
 * DataAxes component which generate the chart using (X-Y) Axes data
 * @param  {String} header the dropable area title 
 * @param  {Object} axesData Object containing the data for the droped item 
 * @param  {Function} handleDeleteMeasure function used on clicking delete / clear the Axis data 
 */
const DataAxes = ({ header, axesData, handleDeleteMeasure }) => {
    return (
        <div className="dataAxesContainer">
            <div className="dataAxesContainer-textBox">
                <h6 className="dataAxesContainer__text" data-test='Axis-data-text'>{header}</h6>
            </div>
            <DragDrop actionType="Droppable" customClass="dimensionContainer" droppableId={header} >
                {axesData && <div className="dimensionContainer__item" data-test='Axis-data-name'>
                    {axesData.name}
                    <button onClick={() => handleDeleteMeasure(axesData)} className="clearMeasureButton" data-test='clear-Axis-data-button'>Clear</button>
                </div>}
            </DragDrop>
        </div>
    )
}
DataAxes.defaultProps = {
    header: '',
    axesData: false,
    handleDeleteMeasure: f => f
}
DataAxes.prototype = {
    header: PropTypes.string,
    axesData: PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.string,
    }),
    handleDeleteMeasure: PropTypes.func

}
export default DataAxes;