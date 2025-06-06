
import  { useState, useRef } from 'react';
import defaultImage from '../../assets/img/publicar/imagem1.png';
import Button from '../common/button/Button'; 

const ImageUploader = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [imageName, setImageName] = useState('image_projeto.png');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageName(file.name);
        onImageSelect(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-upload-imagem">
      <div className="container-imagem">
        <img src={imagePreview} alt="Preview do projeto" className="main-imagem" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <Button onClick={() => fileInputRef.current.click()}>Carregar imagem</Button>
      <div className="container-imagem-nome">
        <p>{imageName}</p>
      </div>
    </div>
  );
};

export default ImageUploader;