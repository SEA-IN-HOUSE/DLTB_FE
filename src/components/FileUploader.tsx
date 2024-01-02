import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface PreviewFile extends FileWithPath {
  preview: string;
}

interface FileUploaderProps {
  onChange: (files: PreviewFile[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onChange }) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const updatedFiles: PreviewFile[] = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file as Blob),
    }));
    setFiles(updatedFiles);
    onChange(updatedFiles); // Call the onChange prop with updated files
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' as any,
    multiple: false,
  });

  useEffect(() => {
    // Clean up the previews when the component unmounts
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const renderPreview = files.map(file => (
    <div key={file.name} className="w-32 h-32 mr-4 mb-4">
      <img
        src={file.preview}
        alt={file.name}
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  ));

  return (
    <div className="flex flex-wrap">
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 rounded-lg p-4 w-full mt-2"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-center">Drag 'n' drop your receipt here</p>
        <div className="mt-4">
          {files.length > 0 && <div className="flex flex-wrap">{renderPreview}</div>}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
