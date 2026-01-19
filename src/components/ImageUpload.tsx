'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Upload, Loader2 } from 'lucide-react';
import SafeImage from './ui/SafeImage';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
      
      onUpload(data.publicUrl);
    } catch (error) {
      alert('Error uploading image');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {value && (
        <div className="relative w-20 h-20 rounded-md overflow-hidden border">
           <SafeImage src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
        {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
        <span className="text-sm font-medium">{uploading ? '上传中...' : '上传图片'}</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
