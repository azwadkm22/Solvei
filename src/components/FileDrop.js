import React, { useState } from 'react';

const FileDrop = () => {
    const [droppedFile, setDroppedFile] = useState(null);

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf') {
            setDroppedFile(file);
        } else {
            alert('Please drop a PDF file!');
        }
    };

    return (
        <div
            style={{
                margin: 'auto 20px',
                padding: '10px 30px',
                height: '100px',
                border: '1px dashed #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            {droppedFile ? (
                <div>
                    <p>File dropped: {droppedFile.name}</p>
                    {/* You can use the dropped file for further processing */}
                </div>
            ) : (
                <p>Drag and drop a PDF file here</p>
            )}
        </div>
    );
};

export default FileDrop;