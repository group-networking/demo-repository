import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  showUpload?: boolean;
  size?: string;
};

export default function ProfileAvatar({
  showUpload = true,
  size = "w-16 h-16",
}: Props) {
  const { user, updateAvatar } = useAuth();

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (!showUpload) {
    return (
      <img
        src={user?.avatar || "https://via.placeholder.com/80"}
        className="rounded-md object-cover"
        alt="Avatar"
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.avatar || "https://via.placeholder.com/80"}
        className={`${size} rounded-md object-cover`}
        alt="Avatar"
      />

      {showUpload && (
        <label className="text-sm cursor-pointer text-purple-600">
          {t.settingsModal.changePhoto}
          <input type="file" hidden accept="image/*" onChange={handleImage} />
        </label>
      )}
    </div>
  );
}
