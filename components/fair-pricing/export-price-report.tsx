"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

interface ExportPriceReportProps {
  priceData: {
    currentPrice: number
    marketPrice: number
    fairTradeMinimum: number
    organicPremium: number
    qualityPremium: number
    certifications: Array<{
      name: string
      premium: number
    }>
  }
}

export function ExportPriceReport({ priceData }: ExportPriceReportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    // Éviter les déclenchements multiples
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Créer un délai pour que l'UI montre l'état de chargement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Import dynamique de jsPDF seulement quand nécessaire
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;
      
      // Créer un nouveau document PDF avec jsPDF
      const pdf = new jsPDF();
      
      // Titre
      pdf.setFontSize(20);
      pdf.setTextColor(6, 95, 70); // #065F46 (couleur emerald-800)
      pdf.text('Fair Price Report', 20, 20);
      
      // Date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Section des prix actuels
      pdf.setFontSize(16);
      pdf.setTextColor(6, 95, 70);
      pdf.text('Current Prices', 20, 45);
      
      // Contenu des prix
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Kinasa Fair Price: €${priceData.currentPrice.toFixed(2)}/kg`, 25, 55);
      pdf.text(`Market Price: €${priceData.marketPrice.toFixed(2)}/kg`, 25, 65);
      
      // Section des primes
      pdf.setFontSize(16);
      pdf.setTextColor(6, 95, 70);
      pdf.text('Price Premiums', 20, 85);
      
      // Contenu des primes
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Fair Trade Minimum: €${priceData.fairTradeMinimum.toFixed(2)}/kg`, 25, 95);
      pdf.text(`Organic Premium: €${priceData.organicPremium.toFixed(2)}/kg`, 25, 105);
      pdf.text(`Quality Premium: €${priceData.qualityPremium.toFixed(2)}/kg`, 25, 115);
      
      // Section des certifications
      if (priceData.certifications.length > 0) {
        pdf.setFontSize(16);
        pdf.setTextColor(6, 95, 70);
        pdf.text('Certification Premiums', 20, 135);
        
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        
        priceData.certifications.forEach((cert, index) => {
          pdf.text(`${cert.name}: €${cert.premium.toFixed(2)}/kg`, 25, 145 + (index * 10));
        });
      }
      
      // Pied de page
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Kinasa - Fair Trade & Organic Coffee', 20, 280);
      
      // Téléchargement du PDF
      pdf.save(`kinasa-price-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isGenerating}
      onClick={handleExport}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export Price Report
        </>
      )}
    </Button>
  )
}
