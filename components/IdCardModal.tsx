import { Modal } from "flowbite-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const IdCardModal = ({ isOpen, onClose, imageUrl }: ImageModalProps) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Image</Modal.Header>
      <Modal.Body>
        {imageUrl && isValidUrl(imageUrl) && !isImageError ? (
          <div className="rounded flex justify-center">
            <Image
              src={imageUrl}
              alt="ID Card"
              width={300}
              height={300}
              onError={() => setIsImageError(true)}
            />
          </div>
        ) : (
          <p>No valid image available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="btn btn-primary">
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdCardModal;
