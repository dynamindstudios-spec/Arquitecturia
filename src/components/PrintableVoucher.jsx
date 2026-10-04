import React from 'react';
import { Compass, Calendar, Clock, MapPin, ShieldCheck, Printer, CheckCircle } from 'lucide-react';
import { BRANDING_DATA } from '../data/brandingData';
import { useTranslation } from '../hooks/useTranslation';

export const PrintableVoucher = ({ booking, onPrint, onClose }) => {
  const { t, language } = useTranslation();
  if (!booking) return null;

  const labels = {
    ES: {
      subtitle: 'GRUPO CONSTRUCTOR · ARQUITECTURA & DISEÑO',
      voucherTitle: 'COMPROBANTE DE CITA',
      client: 'TITULAR / CLIENTE:',
      contact: 'CONTACTO / WHATSAPP:',
      project: 'PROYECTO A INICIAR:',
      lot: 'UBICACIÓN DEL LOTE:',
      modality: 'MODALIDAD DE ATENCIÓN:',
      meet: 'SALA GOOGLE MEET:',
      date: 'FECHA AGENDADA:',
      time: 'HORA CONVOCATORIA:',
      director: 'DIRECTOR ARQUITECTÓNICO:',
      defaultDirector: 'Director de Proyecto ArquitecturIA',
      status: 'ESTADO DE CITA:',
      confirmed: 'CONFIRMADA EN SISTEMA',
      protocolTitle: 'PROTOCOLO DE REUNIÓN & ANÁLISIS:',
      protocolText: 'Se dispondrá de 1 director de obra y mesa técnica para evaluar programa de áreas, normativa y viabilidad preliminar de su nuevo proyecto.',
      auth: 'AUTORIZACIÓN ARQUITECTURIA · VERIFICADO POR SISTEMA',
      printBtn: 'IMPRIMIR / GUARDAR PDF',
      closeBtn: 'CERRAR'
    },
    EN: {
      subtitle: 'CONSTRUCTION GROUP · ARCHITECTURE & DESIGN',
      voucherTitle: 'APPOINTMENT VOUCHER',
      client: 'CLIENT / PRINCIPAL:',
      contact: 'CONTACT / WHATSAPP:',
      project: 'COMMISSION TO INITIATE:',
      lot: 'LOT LOCATION & LAND:',
      modality: 'MEETING MODALITY:',
      meet: 'GOOGLE MEET ROOM:',
      date: 'SCHEDULED DATE:',
      time: 'MEETING TIME:',
      director: 'ARCHITECTURAL DIRECTOR:',
      defaultDirector: 'ArquitecturIA Project Director',
      status: 'APPOINTMENT STATUS:',
      confirmed: 'CONFIRMED IN SYSTEM',
      protocolTitle: 'SESSION PROTOCOL & ANALYSIS:',
      protocolText: 'An architectural director and technical desk will be assigned to evaluate your area program, zoning codes, and preliminary project viability.',
      auth: 'ARQUITECTURIA AUTHORIZATION · VERIFIED BY SYSTEM',
      printBtn: 'PRINT / SAVE PDF',
      closeBtn: 'CLOSE'
    },
    FR: {
      subtitle: 'GROUPE CONSTRUCTEUR · ARCHITECTURE & DESIGN',
      voucherTitle: 'CONFIRMATION DE RENDEZ-VOUS',
      client: 'TITULAIRE / CLIENT :',
      contact: 'CONTACT / WHATSAPP :',
      project: 'PROJET À ENGAGER :',
      lot: 'LOCALISATION DU TERRAIN :',
      modality: 'MODALITÉ DU RENDEZ-VOUS :',
      meet: 'SALLE GOOGLE MEET :',
      date: 'DATE PROGRAMMÉE :',
      time: 'HEURE DU RENDEZ-VOUS :',
      director: 'DIRECTEUR ARCHITECTURAL :',
      defaultDirector: 'Directeur de Projet ArquitecturIA',
      status: 'STATUT DU RENDEZ-VOUS :',
      confirmed: 'CONFIRMÉ DANS LE SYSTÈME',
      protocolTitle: 'PROTOCOLE DE RÉUNION & ANALYSE :',
      protocolText: 'Un architecte directeur et un pôle technique seront mobilisés pour évaluer le programme des surfaces, la faisabilité et le budget préliminaire.',
      auth: 'AUTORISATION ARQUITECTURIA · VÉRIFIÉ PAR LE SYSTÈME',
      printBtn: 'IMPRIMER / ENREGISTRER PDF',
      closeBtn: 'FERMER'
    }
  }[language] || {
    subtitle: 'GRUPO CONSTRUCTOR · ARQUITECTURA & DISEÑO',
    voucherTitle: 'COMPROBANTE DE CITA',
    client: 'TITULAR / CLIENTE:',
    contact: 'CONTACTO / WHATSAPP:',
    project: 'PROYECTO A INICIAR:',
    lot: 'UBICACIÓN DEL LOTE:',
    modality: 'MODALIDAD DE ATENCIÓN:',
    meet: 'SALA GOOGLE MEET:',
    date: 'FECHA AGENDADA:',
    time: 'HORA CONVOCATORIA:',
    director: 'DIRECTOR ARQUITECTÓNICO:',
    defaultDirector: 'Director de Proyecto ArquitecturIA',
    status: 'ESTADO DE CITA:',
    confirmed: 'CONFIRMADA EN SISTEMA',
    protocolTitle: 'PROTOCOLO DE REUNIÓN & ANÁLISIS:',
    protocolText: 'Se dispondrá de 1 director de obra y mesa técnica para evaluar programa de áreas, normativa y viabilidad preliminar de su nuevo proyecto.',
    auth: 'AUTORIZACIÓN ARQUITECTURIA · VERIFICADO POR SISTEMA',
    printBtn: 'IMPRIMIR / GUARDAR PDF',
    closeBtn: 'CERRAR'
  };

  return (
    <div className="printable-voucher-container bg-white text-black p-6 sm:p-8 border-2 border-black max-w-xl mx-auto shadow-2xl relative font-mono select-none">
      {/* Top Header */}
      <div className="flex items-start justify-between border-b-2 border-black pb-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">
            ARQUITECTURIA
          </h2>
          <p className="text-[10px] tracking-widest text-black/70 uppercase">
            {labels.subtitle}
          </p>
          <p className="text-[9px] text-black/60">
            ARMENIA, QUINDÍO · PBX +57 300 890 2400
          </p>
        </div>

        <div className="text-right">
          <div className="inline-block bg-black text-white px-2.5 py-1 text-xs font-bold tracking-widest">
            {labels.voucherTitle}
          </div>
          <p className="text-xs font-bold mt-1 text-black">
            REF: {booking.id}
          </p>
        </div>
      </div>

      {/* Appointment Information Grid */}
      <div className="space-y-3 text-xs mb-6">
        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.client}</span>
          <span className="font-bold text-black uppercase">{booking.clientName}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.contact}</span>
          <span className="font-bold text-black">{booking.clientPhone}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.project}</span>
          <span className="font-bold text-black uppercase">{booking.projectType || booking.projectInterest}</span>
        </div>

        {booking.lotLocation && (
          <div className="flex justify-between border-b border-gray-200 pb-1.5">
            <span className="text-gray-600 uppercase">{labels.lot}</span>
            <span className="font-bold text-black uppercase">{booking.lotLocation} ({booking.estimatedArea || '350 m²'})</span>
          </div>
        )}

        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.modality}</span>
          <span className="font-bold text-black uppercase">{booking.modality}</span>
        </div>

        {booking.meetUrl && (
          <div className="flex justify-between border-b border-gray-200 pb-1.5">
            <span className="text-gray-600 uppercase">{labels.meet}</span>
            <span className="font-bold text-blue-700 underline">{booking.meetUrl}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-2.5 border border-gray-300">
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">{labels.date}</span>
            <span className="font-bold text-sm text-black">{booking.date}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase block">{labels.time}</span>
            <span className="font-bold text-sm text-black">{booking.time}</span>
          </div>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.director}</span>
          <span className="font-bold text-black">{booking.assignedArchitect || labels.defaultDirector}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-1.5">
          <span className="text-gray-600 uppercase">{labels.status}</span>
          <span className="font-bold text-emerald-700 uppercase flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{labels.confirmed}</span>
          </span>
        </div>
      </div>

      {/* QR Code and Protocol Note */}
      <div className="flex items-center gap-4 bg-gray-100 p-3 border border-gray-300 mb-6">
        {/* Synthetic QR Code in SVG */}
        <div className="w-16 h-16 bg-white p-1 border border-black flex-shrink-0 flex items-center justify-center">
          <div className="w-full h-full bg-black/90 flex flex-col justify-between p-1">
            <div className="flex justify-between"><div className="w-3 h-3 bg-white" /><div className="w-3 h-3 bg-white" /></div>
            <div className="text-[6px] text-center text-white tracking-widest">CITA-QR</div>
            <div className="flex justify-between"><div className="w-3 h-3 bg-white" /><div className="w-3 h-3 bg-white" /></div>
          </div>
        </div>

        <div className="text-[10px] leading-tight text-gray-700">
          <p className="font-bold mb-1">{labels.protocolTitle}</p>
          <p>{labels.protocolText}</p>
        </div>
      </div>

      {/* Barcode styling */}
      <div className="border-t-2 border-black pt-3 flex flex-col items-center">
        <div className="tracking-[0.3em] text-xs font-bold">
          ||| | |||| | ||| |||| | || ||| |||| | |||
        </div>
        <span className="text-[9px] text-gray-500 mt-1">
          {labels.auth}
        </span>
      </div>

      {/* No-print Action Buttons */}
      <div className="no-print mt-6 pt-4 border-t border-gray-300 flex items-center justify-end gap-3">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>{labels.printBtn}</span>
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-400 hover:border-black text-xs font-bold uppercase transition-colors"
        >
          {labels.closeBtn}
        </button>
      </div>
    </div>
  );
};
