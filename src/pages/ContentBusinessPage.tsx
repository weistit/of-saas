import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { InfoBox } from '../components/InfoBox';
import { FormInput } from '../components/FormInput';
import { PageType } from '../types';

interface ContentBusinessPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export const ContentBusinessPage: React.FC<ContentBusinessPageProps> = ({
  onLogout,
  onNavigate
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus('Uploading files...');

    try {
      const formData = new FormData();
      
      // Add all selected files to FormData
      Array.from(files).forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      // Add metadata
      formData.append('total_files', files.length.toString());
      formData.append('upload_timestamp', new Date().toISOString());

      const response = await fetch('https://n8n.weistit.com/webhook-test/populate-pgvector', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadedFiles(prev => [...prev, ...Array.from(files)]);
        setUploadStatus(`Successfully uploaded ${files.length} file(s)`);
        
        // Clear the input
        event.target.value = '';
        
        // Clear status after 3 seconds
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
      setTimeout(() => setUploadStatus(''), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    
    if (files.length > 0) {
      // Create a synthetic event to reuse the upload logic
      const syntheticEvent = {
        target: { files, value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      
      await handleFileUpload(syntheticEvent);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex">
        <Sidebar currentPage="content-business" onNavigate={onNavigate} />

        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <InfoBox className="mb-8">
              Introduce los <strong>datos clave</strong> de tu negocio que el <strong>agente</strong> usará siempre al redactar correos: nombre, descripción breve, ubicación, horario, plazos, métodos de pago, políticas y contactos de soporte. Además, aquí podrás subir tu <strong>catálogo de productos</strong> y servicios para que el sistema aprenda tu estilo.
            </InfoBox>

            <div className="space-y-6">
              <FormInput
                label="Nombre de la empresa:"
                placeholder="Imprenta Textil S.L."
              />

              <FormInput
                label="Descripción (breve):"
                placeholder="Proveedores de serigrafía y textil personalizado en Madrid."
                as="textarea"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Ubicación:"
                  placeholder="Madrid (España), 07071"
                />
                <FormInput
                  label="Horario:"
                  placeholder="Lun-Vie 08:00-17:00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Plazo de envío:"
                  placeholder="3-5 días laborables"
                />
                <FormInput
                  label="Métodos de pago:"
                  placeholder="Transferencia, tarjeta y PayPal"
                />
              </div>

              <FormInput
                label="Política de devoluciones:"
                placeholder="Hasta 14 días, gastos de envío por cuenta del cliente"
              />

              <FormInput
                label="Contacto soporte:"
                placeholder="soporte@imprentatextil.com / +34 912 345 678"
              />

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Catálogo principal:
                </label>
                <div className="text-xs text-gray-500 mb-3">
                  Sube archivos con tu catálogo o productos principales (PDF, CSV, etc.)
                </div>
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isUploading 
                      ? 'border-[#57A777] bg-green-50' 
                      : 'border-gray-300 hover:border-[#57A777] hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.csv,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload" 
                    className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                      isUploading ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <div className={`rounded-full p-3 mb-2 ${
                      isUploading ? 'bg-green-200' : 'bg-gray-200'
                    }`}>
                      <Upload className={`w-5 h-5 ${
                        isUploading ? 'text-[#57A777]' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className={`text-sm ${
                      isUploading ? 'text-[#57A777]' : 'text-gray-600'
                    }`}>
                      {isUploading ? 'Uploading...' : 'Subir archivos'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </div>
                  </label>
                </div>

                {/* Upload Status */}
                {uploadStatus && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    uploadStatus.includes('Successfully') 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : uploadStatus.includes('failed')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {uploadStatus}
                  </div>
                )}

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Archivos subidos ({uploadedFiles.length}):
                    </div>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#57A777] rounded flex items-center justify-center">
                              <Upload className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>

              <InfoBox>
                Carga un fichero (CSV o PDF) con tu <strong>catálogo de productos</strong> o servicios (incluyendo nombres y precios) o bien añade directamente ejemplos de correos (preguntas y respuestas) que quieras que el sistema aprenda tu estilo.
              </InfoBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};