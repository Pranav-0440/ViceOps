import React, { useRef } from 'react';
import { Upload, Plus } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (files: FileList) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="sr-only"
        aria-label="Upload surveillance images"
        id="evidence-upload"
      />

      <button
        className="btn btn-accent upload-btn"
        onClick={handleClick}
        aria-label="Add surveillance photographs"
      >
        <Plus size={16} />
        ADD SURVEILLANCE
      </button>

      <div
        className="upload-dropzone"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Drag and drop images here"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <Upload size={24} />
        <span>Drop surveillance files here</span>
      </div>
    </>
  );
};

export default ImageUpload;
