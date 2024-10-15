'use client';

import React from 'react';
import FileSelector from '@/Components/FileSelectTextField';
import DropFileInput from '@/Components/DropFileInput';

export default function Home() {
  return (
    <>
      <FileSelector/>
      <DropFileInput/>
    </>
  );
}
