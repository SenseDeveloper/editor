import React from 'react';
import { useDrop } from 'react-dnd';
import { Element } from './Element';
import { useEditor } from './EditorContext';
import styled from 'styled-components';
import { useCallback, useRef } from 'react';

const WorkspaceContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: ${(props) =>
    props.$isOver ? '2px dashed #1976d2' : '1px solid #ddd'};
  min-height: 500px;
  overflow: hidden;
`;

export const Workspace = () => {
  const {
    state: { elements },
    actions,
  } = useEditor();
  const containerRef = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const rect = containerRef.current.getBoundingClientRect();

      actions.addElement(item.type, {
        x: offset.x - rect.left - 50, // Центрируем элемент
        y: offset.y - rect.top - 20,
      });
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  drop(containerRef);

  const handleMove = useCallback(
    (id, position) => {
      actions.moveElement(id, position);
    },
    [actions]
  );

  return (
    <WorkspaceContainer ref={containerRef} $isOver={isOver}>
      {elements.map((element) => (
        <Element key={element.id} {...element} onMove={handleMove} />
      ))}
    </WorkspaceContainer>
  );
};
