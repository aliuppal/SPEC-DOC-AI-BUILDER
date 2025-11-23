import { useEffect, useRef } from 'react';
import type { SpecDocument } from '../types/document';
import { renderAsync } from 'docx-preview';
import { createPreviewDocx } from '../lib/docxExporter';

interface DocumentPreviewProps {
  document: SpecDocument;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderPreview = async () => {
      if (!previewRef.current) return;

      try {
        const blob = await createPreviewDocx(document);
        await renderAsync(blob, previewRef.current, undefined, {
          className: 'docx-preview-container',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          renderChanges: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
        });
      } catch (error) {
        console.error('Error rendering preview:', error);
      }
    };

    renderPreview();
  }, [document]);

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div
        ref={previewRef}
        className="docx-wrapper"
        style={{
          padding: '20px',
          minHeight: '100%',
        }}
      />
    </div>
  );
}
