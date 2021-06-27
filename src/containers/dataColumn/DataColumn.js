import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import plotDataService from '../../services/mainDataColumn-service'

const DataColumn = () => {
    const [columnData, setcolumnData] = useState([])
    useEffect(() => {
        let  columnData;
        plotDataService.getCoulmnData().then(data => setcolumnData(data));
        console.log('>>columnData',columnData)
    }, [])
    useEffect(() => {
        console.log('>>columnData',columnData)
    }, [columnData])
    return (
        <div className="DataColumn">

        </div>
    )
}
export default DataColumn;