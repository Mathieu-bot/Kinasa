"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, ExternalLink, FileText, Eye } from "lucide-react"

interface Certificate {
  id: string
  name: string
  authority: string
  issueDate: string
  expiryDate: string
  status: "active" | "pending" | "expiring" | "expired"
  documentUrl: string
}

interface CertificationTableProps {
  certificates: Certificate[]
  onViewDetails: (id: string) => void
}

export function CertificationTable({ certificates, onViewDetails }: CertificationTableProps) {
  const renderStatus = (status: Certificate["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>
      case "pending":
        return <Badge className="bg-amber-500 text-white">Pending</Badge>
      case "expiring":
        return <Badge className="bg-orange-500 text-white">Expiring Soon</Badge>
      case "expired":
        return <Badge className="bg-red-500 text-white">Expired</Badge>
      default:
        return <Badge className="bg-slate-500 text-white">Unknown</Badge>
    }
  }

  return (
    <div className="rounded-md border border-emerald-200 overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-emerald-50">
          <TableRow>
            <TableHead className="text-emerald-700">Certificate</TableHead>
            <TableHead className="text-emerald-700">Certifying Authority</TableHead>
            <TableHead className="text-emerald-700">Issue Date</TableHead>
            <TableHead className="text-emerald-700">Expiry Date</TableHead>
            <TableHead className="text-emerald-700">Status</TableHead>
            <TableHead className="text-emerald-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id} className="hover:bg-emerald-50/50">
              <TableCell className="font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                {cert.name}
              </TableCell>
              <TableCell>{cert.authority}</TableCell>
              <TableCell>{cert.issueDate}</TableCell>
              <TableCell>{cert.expiryDate}</TableCell>
              <TableCell>{renderStatus(cert.status)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewDetails(cert.id)}
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100"
                >
                  <a href={cert.documentUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
