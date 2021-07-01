import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes, { any } from 'prop-types';

/**
 * DragDrop component which is a shared wrapper component to the drag and drop library  
 * @param  {Array} data array of values for the chart and it's corresponding Axis name
 * @param  {String} actionType used to determine wither the retun component will be dragable one or droppable one 
 * @param  {Array} itemsList array of items used to passed to the dragable component to loop on them 
 * @param  {Object} cutsomStyle use to pass any type of inline styles to the component 
 * @param  {String} droppableId use by the library to determine which droppable area belongs to who
 * @param  {JSX} children JSX passed as child for the droppable area
 * @param  {String} customClass used as a style for any type ( dragable item container Or droppable item container)
 * 
 */
const DragDrop = ({ actionType,
    itemsList,
    cutsomStyle,
    droppableId,
    children,
    customClass,
}) => {
    if (actionType === 'Dragable') {
        return (
            itemsList.map((item, index) => {
                return (
                    <div key={item.name} data-test='dragable-item'>
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
                                            height: "2.9rem",
                                            backgroundColor: snapshot.isDragging
                                                ? "#263B4A"
                                                : "#456C86",
                                            color: "white",
                                            borderRadius: snapshot.isDragging ? '1rem' : '0rem',
                                            ...provided.draggableProps.style,
                                            ...cutsomStyle
                                        }}
                                    >
                                        {item.name}
                                        {provided.placeholder}

                                    </div>
                                );
                            }}
                        </Draggable>
                    </div>
                )
            })
        )
    }
    if (actionType === 'Droppable') {
        return (
            <Droppable droppableId={droppableId} key={droppableId} data-test='droppable-item'>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                ...cutsomStyle
                            }}
                            className={customClass}

                        >
                            {children}

                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        )
    }
    return;
}
DragDrop.defaultProps = {
    customClass: '',
    actionType: 'Dragable',
    itemsList: []
}
DragDrop.prototype = {
    actionType: PropTypes.string,
    itemsList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(String),
    })),
    droppableId: PropTypes.string.isRequired,
    customClass: PropTypes.string,
    cutsomStyle: PropTypes.objectOf(any)
}
export default DragDrop;