import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';
import DataAxes from '../dataAxes/DataAxes';
import { groupBy } from 'lodash'


const DataColumn = ({ axesContainerRef, AxesData, columnData, setAxesData, setcolumnData, orginalColumnDataList }) => {

    const getsourceListName = (source) => {
        if (source === 'dimensionContainer') return 'dimension'
        if (source === 'measureContainer') return 'measure'
        return '';
    }
    const getDroppedFieldData = (destinationField) => {
        return AxesData.find(item => item.function === destinationField)
    }
    const handleOnDragEnd = useCallback((result) => {
        const { source, destination } = result;
        if (!result.destination || (destination.droppableId === source.droppableId)) return;
        const DroppedFieldData = getDroppedFieldData(destination.droppableId)
        const sourceListName = getsourceListName(source.droppableId);
        const copyiedData = { ...columnData }
        const copiedAxesData = [...AxesData];
        const copiedColumnDataObjectItems = copyiedData[sourceListName];
        const selectedItem = columnData[sourceListName][source.index];

        if (DroppedFieldData) {
            copiedColumnDataObjectItems.splice(source.index, 1, DroppedFieldData);
            const filteredAxesData = AxesData.filter((AixsData) => AixsData.name !== DroppedFieldData.name)
            const newAxesData = [...filteredAxesData, selectedItem];
            const filterAxesData = [...new Set(newAxesData)];
            setcolumnData(copyiedData);
            setAxesData(filterAxesData);
        } else {
            copiedColumnDataObjectItems.splice(source.index, 1);
            const newAxesData = [...copiedAxesData, selectedItem];
            const filterAxesData = [...new Set(newAxesData)];
            setcolumnData(copyiedData);
            setAxesData(filterAxesData);
        }
    }, [columnData, AxesData]);
    const getMatchedAxesData = (listName) => {
        return AxesData.find((axesData) => axesData.function === listName) // can be map in the future incase of muilt axes
    }
    const handleDeleteMeasure = (DeletedItem) => {
        const groupedOrginalDataColumn = groupBy(orginalColumnDataList, 'function');
        const getDeletedItemOrginalList = groupedOrginalDataColumn[DeletedItem.function];
        const measureName = DeletedItem.function;
        const orginalColumnDataLists = { ...columnData, [measureName]: getDeletedItemOrginalList };
        const newAxesData = [...AxesData]
        const filteredAxesData = newAxesData.filter((AixsData) => AixsData.name !== DeletedItem.name)
        setcolumnData(orginalColumnDataLists); // reset and sort with the orginal order
        setAxesData(filteredAxesData);
    }
    return (
        <div className="DataColumnContainer">
            {Object.entries(columnData).map((dataList) => {
                const listName = dataList[0];
                return (
                    <div key={listName} className="DataColumnContainer-box">
                        <DragDropContext onDragEnd={data => handleOnDragEnd(data)} >
                            <div className="DragHeaderContainer">
                                <h6 className="DragHeaderContainer__Text">
                                    {listName}
                                </h6>
                            </div>
                            <DragDrop actionType='Droppable' droppableId={`${listName}Container`}>
                                <DragDrop actionType='Dragable' itemsList={dataList[1]} />
                            </DragDrop>
                            {ReactDOM.createPortal(<DataAxes header={listName} AxesData={getMatchedAxesData(listName)} handleDeleteMeasure={handleDeleteMeasure} />, axesContainerRef.current)}
                        </DragDropContext>
                    </div>
                )
            })}
        </div>
    )
}
export default DataColumn;