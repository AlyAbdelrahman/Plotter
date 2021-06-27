import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DataAxes from '../dataAxes/DataAxes';
import DataColumn from '../dataColumn/DataColumn'


const ChartMaker = () => {
    return (
        <div className="chartMakerContainer">
                <DataColumn />
        </div>
    )
}

export default ChartMaker;