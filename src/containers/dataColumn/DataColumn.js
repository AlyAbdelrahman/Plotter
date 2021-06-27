import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import plotDataService from '../../services/mainDataColumn-service';
import DragDrop from '../../components/dragDrop/DragDrop';
import DataAxes from '../dataAxes/DataAxes';
import { groupBy } from 'lodash'

const DataColumn = () => {
    const [columnData, setcolumnData] = useState([])
    useEffect(() => {
        plotDataService.getCoulmnData().then(data => setcolumnData(groupBy(data, 'function')))
    }, [])
    return (
        <div className="DataColumnContainer">
            {Object.entries(columnData).map((dataList) => {
                console.log('>>DragDrop', dataList[1])
                return (
                    <>
                        <DragDropContext onDragEnd={data => console.log(data)}>
                            <div className="DragHeaderContainer">
                                <h6 className="DragHeaderContainer__Text">
                                    {dataList[0]}
                                </h6>
                            </div>
                            <DragDrop actionType='Droppable' droppableId={dataList[0]}>
                                <DragDrop actionType='Dragable' itemsList={dataList[1]} customClass="" />
                            </DragDrop>

                        <DataAxes header={dataList[0]} />
                        </DragDropContext>
                    </>
                )
            })}
        </div>
    )
}
export default DataColumn;