import { useRef, useState } from "react";

type Props = {
  onImageSelect: (file: File | null) => void;
};

export default function ImageUpload({ onImageSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  return (
    <div className="image-upload card-shadow">

      <h2>Damage Image</h2>

      <p>
        Upload a clear image of the damaged vehicle.
      </p>

      {preview ? (
        <img
          src={preview}
          className="damage-preview"
          alt="Damage Preview"
        />
      ) : (
        <div
          className="upload-box"
          onClick={() => fileInputRef.current?.click()}
        >
          <h3>📷 Upload Image</h3>

          <p>Click to choose an image</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleFile(
            e.target.files?.[0] || null
          )
        }
      />

      {preview && (
        <button
          className="secondary-btn"
          onClick={() => {
            setPreview(null);
            onImageSelect(null);
          }}
        >
          Remove Image
        </button>
      )}

    </div>
  );
}