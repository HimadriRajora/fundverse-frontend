// src/components/TranslateButton.tsx
import { useState } from 'react';
import { translate } from '../api';

interface Props {
  original: string;
}

export default function TranslateButton({ original }: Props) {
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const text = await translate(original, 'fr'); // hard-code French for demo
      setTranslated(text);
    } catch (e) {
      console.error(e);
      alert('Translate failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleClick}
        className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '...' : 'Translate'}
      </button>

      {translated && (
        <p className="mt-2 italic text-sm text-gray-700 border-l-4 pl-2 border-emerald-500">
          {translated}
        </p>
      )}
    </div>
  );
}
