const TranslationSelector = ({ translation, onChange }) => {
  const translations = ['KJV', 'NIV', 'ESV'];

  return (
    <select
      value={translation}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border rounded"
    >
      {translations.map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
};

export default TranslationSelector;