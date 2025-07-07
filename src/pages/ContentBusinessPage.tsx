import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { InfoBox } from '../components/InfoBox';
import { FormInput } from '../components/FormInput';
import { PageType } from '../types';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
import Papa from 'papaparse';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface ContentBusinessPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

interface ProcessedFile {
  name: string;
  type: string;
  size: number;
  content: string;
  originalFile: File;
}

export const ContentBusinessPage: React.FC<ContentBusinessPageProps> = ({
  onLogout,
  onNavigate
}) => {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string>('');

  const extractPDFContent = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      return fullText.trim();
    } catch (error) {
      console.error('Error extracting PDF content:', error);
      throw new Error('Failed to extract PDF content');
    }
  };

  const extractCSVContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          try {
            // Convert CSV data to a readable format
            const headers = results.data[0] as string[];
            const rows = results.data.slice(1) as string[][];
            
            let content = `CSV Headers: ${headers.join(', ')}\n\n`;
            content += 'Data:\n';
            
            rows.forEach((row, index) => {
              if (row.some(cell => cell && cell.trim())) { // Skip empty rows
                content += `Row ${index + 1}: `;
                headers.forEach((header, colIndex) => {
                  if (row[colIndex]) {
                    content += `${header}: ${row[colIndex]}, `;
                  }
                });
                content = content.slice(0, -2) + '\n'; // Remove last comma and add newline
              }
            });
            
            resolve(content.trim());
          } catch (error) {
            reject(new Error('Failed to process CSV content'));
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        },
        header: false,
        skipEmptyLines: true
      });
    });
  };

  const extractTextContent = async (file: File): Promise<string> => {
    try {
      return await file.text();
    } catch (error) {
      console.error('Error reading text file:', error);
      throw new Error('Failed to read text file');
    }
  };

  const processFile = async (file: File): Promise<ProcessedFile> => {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    
    let content: string;

    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      content = await extractPDFContent(file);
    } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      content = await extractCSVContent(file);
    } else if (fileType.startsWith('text/') || fileName.endsWith('.txt')) {
      content = await extractTextContent(file);
    } else {
      // For other file types, try to read as text
      try {
        content = await extractTextContent(file);
      } catch {
        throw new Error(`Unsupported file type: ${file.type || 'unknown'}`);
      }
    }

    return {
      name: file.name,
      type: file.type || 'unknown',
      size: file.size,
      content,
      originalFile: file
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatus('Processing files...');

    try {
      const newProcessedFiles: ProcessedFile[] = [];
      
      for (const file of Array.from(files)) {
        try {
          const processedFile = await processFile(file);
          newProcessedFiles.push(processedFile);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          setStatus(`Error processing ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setTimeout(() => setStatus(''), 5000);
          continue;
        }
      }

      if (newProcessedFiles.length > 0) {
        setProcessedFiles(prev => [...prev, ...newProcessedFiles]);
        setStatus(`Successfully processed ${newProcessedFiles.length} file(s)`);
        setTimeout(() => setStatus(''), 3000);
      }

      // Clear the input
      event.target.value = '';
    } catch (error) {
      console.error('File processing error:', error);
      setStatus('File processing failed. Please try again.');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendInformation = async () => {
    if (processedFiles.length === 0) {
      setStatus('No files to send. Please upload and process files first.');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setIsSending(true);
    setStatus('Sending information...');

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        total_files: processedFiles.length,
        files: processedFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          content: file.content
        }))
      };

      const response = await fetch('https://n8n.weistit.com/webhook-test/populate-pgvector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('Information sent successfully!');
        // Optionally clear processed files after successful send
        // setProcessedFiles([]);
      } else {
        throw new Error(`Send failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Send error:', error);
      setStatus('Failed to send information. Please try again.');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    
    if (files.length > 0) {
      const syntheticEvent = {
        target: { files, value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      
      await handleFileUpload(syntheticEvent);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setProcessedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
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
                  Sube archivos con tu catálogo o productos principales (PDF, CSV, TXT)
                </div>
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isProcessing 
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
                    disabled={isProcessing}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload" 
                    className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                      isProcessing ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <div className={`rounded-full p-3 mb-2 ${
                      isProcessing ? 'bg-green-200' : 'bg-gray-200'
                    }`}>
                      <Upload className={`w-5 h-5 ${
                        isProcessing ? 'text-[#57A777]' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className={`text-sm ${
                      isProcessing ? 'text-[#57A777]' : 'text-gray-600'
                    }`}>
                      {isProcessing ? 'Processing...' : 'Subir archivos'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </div>
                  </label>
                </div>

                {/* Status Messages */}
                {status && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    status.includes('Successfully') || status.includes('sent successfully')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : status.includes('failed') || status.includes('Error')
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {status}
                  </div>
                )}

                {/* Processed Files List */}
                {processedFiles.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-700">
                        Archivos procesados ({processedFiles.length}):
                      </div>
                      <button
                        onClick={handleSendInformation}
                        disabled={isSending || processedFiles.length === 0}
                        className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#57A777' }}
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSending ? 'Enviando...' : 'Send Information'}</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {processedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#57A777] rounded flex items-center justify-center">
                              <Upload className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.content.length} characters extracted
                              </div>
                              {file.content.length > 100 && (
                                <div className="text-xs text-gray-400 mt-1 max-w-md truncate">
                                  Preview: {file.content.substring(0, 100)}...
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
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