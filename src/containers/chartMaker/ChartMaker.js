import React, {useRef} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DataAxes from '../dataAxes/DataAxes';
import DataColumn from '../dataColumn/DataColumn'


const ChartMaker = () => {
    const chartsAxesContainerRef = useRef(null);
    return (
        <div className="chartMakerContainer">
                <DataColumn axesContainerRef={chartsAxesContainerRef}/>
                <div id="chartAxes" ref={chartsAxesContainerRef}>

                </div>
        </div>
    )
}

export default ChartMaker;