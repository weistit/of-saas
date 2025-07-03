import React from 'react';
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
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex">
        <Sidebar currentPage="content-business" onNavigate={onNavigate} />

        <div className="flex-1 p-8">
          <div className="max-w-2xl">
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
                  Sube un .pdf con tu catálogo o productos principales
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <button className="flex items-center justify-center w-full">
                    <div className="bg-gray-200 rounded-full p-3 mb-2">
                      <Upload className="w-5 h-5 text-gray-500" />
                    </div>
                  </button>
                  <div className="text-sm text-gray-600">Subir archivo</div>
                </div>
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