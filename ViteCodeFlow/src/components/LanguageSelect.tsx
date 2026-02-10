import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSelect() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as any)}
      className="border p-1 rounded"
    >
      <option value="pt">Português</option>
      <option value="en">English</option>
    </select>
  );
}
