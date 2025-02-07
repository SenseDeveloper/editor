import React from 'react';
import { useDrag } from 'react-dnd';

const Toolbar = () => {
  const [{ isDragging: isTextDragging }, textDrag] = useDrag(() => ({
    type: 'element',
    item: { type: 'text' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isDragging: isButtonDragging }, buttonDrag] = useDrag(() => ({
    type: 'element',
    item: { type: 'button' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isDragging: isImageDragging }, imageDrag] = useDrag(() => ({
    type: 'element',
    item: { type: 'image' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div style={{ 
      padding: '10px', 
      borderRight: '1px solid #ddd', 
      width: '200px' 
    }}>
      <h3>Панель инструментов</h3>
      <div
        ref={textDrag}
        style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          backgroundColor: isTextDragging ? '#e0e0e0' : '#f5f5f5',
          cursor: 'move',
        }}
      >
        Текст
      </div>
      <div
        ref={buttonDrag}
        style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          backgroundColor: isButtonDragging ? '#e0e0e0' : '#f5f5f5',
          cursor: 'move',
        }}
      >
        Кнопка
      </div>
      <div
        ref={imageDrag}
        style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          backgroundColor: isImageDragging ? '#e0e0e0' : '#f5f5f5',
          cursor: 'move',
        }}
      >
        Изображение
      </div>
    </div>
  );
};

export default Toolbar;