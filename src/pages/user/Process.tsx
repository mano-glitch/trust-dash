import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProcessedFile {
  id: string;
  name: string;
  size: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: string;
}

const mockHistory: ProcessedFile[] = [
  { id: '1', name: 'report_annual.pdf', size: '2.4 MB', status: 'completed', timestamp: '2026-01-20 14:30' },
  { id: '2', name: 'contract_v2.pdf', size: '1.1 MB', status: 'completed', timestamp: '2026-01-20 13:15' },
  { id: '3', name: 'invoice_batch.pdf', size: '5.2 MB', status: 'processing', timestamp: '2026-01-20 12:00' },
  { id: '4', name: 'data_export.pdf', size: '890 KB', status: 'failed', timestamp: '2026-01-20 11:30' },
];

const statusConfig = {
  pending: { icon: Clock, className: 'text-muted-foreground', label: 'Pending' },
  processing: { icon: Clock, className: 'text-warning animate-pulse', label: 'Processing' },
  completed: { icon: CheckCircle, className: 'text-success', label: 'Completed' },
  failed: { icon: XCircle, className: 'text-destructive', label: 'Failed' },
};

export default function Process() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [history] = useState<ProcessedFile[]>(mockHistory);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type === 'application/pdf'
      );
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Process</h1>
        <p className="text-muted-foreground mt-1">Upload and process PDF files</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'stat-card border-2 border-dashed transition-all duration-200 cursor-pointer',
          isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground/50'
        )}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="flex flex-col items-center justify-center py-8">
            <div className={cn(
              'p-4 rounded-full mb-4 transition-colors',
              isDragging ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
            )}>
              <Upload className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium text-foreground mb-1">
              {isDragging ? 'Drop files here' : 'Drag & drop PDF files'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse from your computer
            </p>
          </div>
        </label>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Uploaded Files</h3>
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Process All
            </Button>
          </div>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processing History */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Processing History</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((file) => {
              const status = statusConfig[file.status];
              const StatusIcon = status.icon;
              return (
                <tr key={file.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{file.size}</td>
                  <td>
                    <div className={cn('flex items-center gap-1.5', status.className)}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm">{status.label}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{file.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
