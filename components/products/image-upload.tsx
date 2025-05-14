"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Upload, X } from "lucide-react"

interface ImageUploadProps {
  onImageSelected: (imageData: string) => void
  initialImage?: string
}

export function ImageUpload({ onImageSelected, initialImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onImageSelected(result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onImageSelected(result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const clearImage = () => {
    setPreview(null)
    onImageSelected('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
          isDragging 
            ? 'border-emerald-500 bg-emerald-50' 
            : preview 
              ? 'border-emerald-200' 
              : 'border-gray-300 hover:border-emerald-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative aspect-video bg-slate-100">
            <img 
              src={preview} 
              alt="Product preview" 
              className="w-full h-full object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center p-6 text-center h-48 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-10 w-10 text-emerald-500 mb-4" />
            <p className="text-sm font-medium mb-1">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG and GIF up to 5MB
            </p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <Input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-emerald-200 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
        >
          <Upload className="h-4 w-4 mr-2" />
          {preview ? 'Change Image' : 'Upload Image'}
        </Button>
      </div>
    </div>
  )
}
