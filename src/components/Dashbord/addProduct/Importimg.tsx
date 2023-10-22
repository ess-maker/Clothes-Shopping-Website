import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import "../../../scss/components/_importimg.scss"


interface ImportimgProps {
    onImageSelect: (image: string | undefined) => void;
    condition: string | undefined;
    imgstate:boolean
}

const Importimg: React.FC<ImportimgProps> = ({ onImageSelect, condition , imgstate }) => {
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString();
        const jsonData = {
          image: base64Data
        };
        onImageSelect(jsonData.image);
      };
      reader.readAsDataURL(file);
    }
  };
return (
    <>
    <div className="importimg">
    <label htmlFor="file-upload" style={{ cursor: condition !== ("" || undefined) ? 'not-allowed' : '' }} className="file-input-label">
    <FontAwesomeIcon icon={faFileCirclePlus} className="icon_Wrapper" />
    <input
    type="file"
    id="file-upload"
    className="file-input"
    onChange={handleImageSelect}
    style={{ display: condition !== ("" || undefined) ? 'none' : '', cursor: condition !== ("" || undefined) ? 'not-allowed' : '' }}
    />
        </label>
    </div>
    <p style={{ color: condition !== ("" || undefined) ? 'green' : imgstate ? "#FF3333" : ''}} className="discript_img">
        {condition !== ("" || undefined) ? 'تم تحميل الصورة بنجاح' : imgstate ?'خانة الصورة إجبارية ' : 'حمل صورة الشخصية'}
    </p>
    </>
  );
};

export default Importimg;