import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DataColumn from '../dataColumn/DataColumn'


const ChartMaker = () => {
    return (
        <div className="chartMakerContainer">
            <DragDropContext onDragEnd={result => console.log('>>result',result)}>
                <DataColumn />
            </DragDropContext>
        </div>
    )
}

export default ChartMaker;