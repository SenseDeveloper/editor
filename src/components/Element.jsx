import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useEditor } from './EditorContext';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const renderElement = (type, props) => {
  switch (type) {
    case 'text':
      return (
        <div style={{ fontSize: props.fontSize, color: props.color }}>
          {props.content}
        </div>
      );
    case 'button':
      return (
        <button
          style={{
            backgroundColor: props.bgColor,
            color: props.color,
            width: props.width,
          }}
        >
          {props.label}
        </button>
      );
    case 'image':
      return (
        <img src={props.src} alt="Element" style={{ width: props.width }} />
      );
    default:
      return null;
  }
};

const ElementContainer = styled.div`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  border: ${(props) =>
    props.$isSelected ? '2px solid #1976d2' : '1px solid transparent'};
  padding: 8px;
  margin: 4px 0;
  cursor: move;
  transition: border-color 0.2s;
  background: ${(props) => props.$background};

  &:hover {
    border-color: #90caf9;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #1976d2;
  bottom: -6px;
  right: -6px;
  cursor: nwse-resize;
  border-radius: 2px;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.2s;
`;

export const Element = React.memo(({ id, type, props, position, onMove }) => {
  const {
    state: { selectedElementId },
    actions,
  } = useEditor();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'existing-element',
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'existing-element',
    hover: (item) => {
      if (item.id !== id) {
        onMove(item.id, position);
      }
    },
  });

  const handleSelect = (e) => {
    e.stopPropagation();
    actions.selectElement(id);
  };

  return (
    <ElementContainer
      ref={(node) => drag(drop(node))}
      $isSelected={selectedElementId === id}
      $x={position.x}
      $y={position.y}
      $background={type === 'image' ? 'transparent' : 'white'}
      onClick={handleSelect}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {renderElement(type, props)}
      <ResizeHandle
        $visible={selectedElementId === id}
        onMouseDown={(e) => {
          e.stopPropagation();
          // Реализация изменения размера может быть добавлена здесь
        }}
      />
    </ElementContainer>
  );
});

Element.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'button', 'image']).isRequired,
  props: PropTypes.object.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  onMove: PropTypes.func.isRequired,
};
