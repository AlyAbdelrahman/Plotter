import React, {useRef} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DataColumn from '../dataColumn/DataColumn'


const ChartMaker = () => {
    const chartsAxesContainerRef = useRef(null);
    return (
        <div className="chartMakerContainer">
                <DataColumn axesContainerRef={chartsAxesContainerRef}/>
                <div className="chartAxes" ref={chartsAxesContainerRef}/>
        </div>
    )
}

export default ChartMaker;