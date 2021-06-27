import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DragDrop = ({ actionType,
    itemsList,
    cutsomStyle,
    droppableId,
    children,
    customClass,
    listHeaderClassName,
    listHeader }) => {
    if (actionType === 'Dragable') {
        return (
            itemsList.map((item, index) => {
                return (
                    <>
                        <Draggable key={item.name} draggableId={item.name} index={index}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={customClass}
                                        style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            height: "50px",
                                            backgroundColor: snapshot.isDragging
                                                ? "#263B4A"
                                                : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                            ...cutsomStyle
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                );
                            }}
                        </Draggable>
                    </>
                )
            })
        )
    }
    if (actionType === 'Droppable') {
        return (
            <Droppable droppableId={droppableId} key={droppableId}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                // background: snapshot.isDraggingOver
                                //     ? "#2c293f"
                                //     : "#2c293f",
                                ...cutsomStyle
                            }}
                            className={customClass}
                        >
                            {children || ''}

                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        )
    }
    return;
}

export default DragDrop;