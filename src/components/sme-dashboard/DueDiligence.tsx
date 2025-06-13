import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  File, 
  CheckCircle, 
  Trash2, 
  Lock, 
  FileText, 
  FileArchive, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
}

const DueDiligence = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Financial_Statements_2024.pdf',
      uploadDate: new Date(2025, 5, 1),
      size: '3.2 MB',
      type: 'PDF',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Business_Plan.docx',
      uploadDate: new Date(2025, 5, 5),
      size: '1.8 MB',
      type: 'DOCX',
      status: 'verified'
    },
    {
      id: '3',
      name: 'Tax_Compliance_Certificate.pdf',
      uploadDate: new Date(2025, 5, 10),
      size: '0.5 MB',
      type: 'PDF',
      status: 'pending'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
    
    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Add new document(s) to the list
      const newDocuments: Document[] = Array.from(e.target.files).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        uploadDate: new Date(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        status: 'pending'
      }));
      
      setDocuments(prev => [...newDocuments, ...prev]);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }, 2000);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: 'verified' | 'pending' | 'rejected') => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Due Diligence Vault</h2>
            <p className="text-gray-600">Upload and manage your compliance documentation securely.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="p-2 bg-blue-50 rounded-full mr-3">
              <Lock className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-blue-700 font-medium">
              Bank-level encryption
            </span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-8 text-center">
          <input 
            type="file" 
            id="document-upload" 
            onChange={handleFileUpload} 
            className="hidden" 
            multiple 
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
            disabled={isUploading}
          />
          <label 
            htmlFor="document-upload" 
            className="cursor-pointer"
          >
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              {isUploading ? 
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" /> :
                <Upload className="h-8 w-8 text-blue-600" />
              }
            </div>
            <h3 className="text-lg font-medium mb-2">
              {isUploading ? "Uploading..." : "Upload Documents"}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              {isUploading ? 
                "Please wait while we upload your files securely" : 
                "Drag and drop files here, or click to browse"
              }
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, DOC, XLS, PPT, ZIP (max 10MB per file)
            </p>
          </label>

          {isUploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}% complete</p>
            </div>
          )}
        </div>

        {/* Documents Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableCaption>Manage your uploaded documents</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length > 0 ? documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {getDocumentIcon(doc.type)}
                      <span className="ml-2 font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(doc.uploadDate, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No documents uploaded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-amber-800">Document Requirements</h4>
              <p className="text-sm text-amber-700 mt-1">
                Investors will require specific documents to evaluate your business. 
                Make sure to upload recent financial statements, business registration, 
                and tax compliance certificates for a faster due diligence process.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Financial Documents', count: 5, icon: <FileText className="h-6 w-6 text-blue-500" /> },
          { title: 'Legal & Compliance', count: 3, icon: <FileText className="h-6 w-6 text-red-500" /> },
          { title: 'Business Plans', count: 2, icon: <FileText className="h-6 w-6 text-green-500" /> },
          { title: 'Market Research', count: 1, icon: <FileText className="h-6 w-6 text-purple-500" /> }
        ].map((category, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-100 rounded-lg mr-4">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count} documents</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DueDiligence;
