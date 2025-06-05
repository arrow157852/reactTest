// src/pages/PublicarPage.js
import React, { useState } from 'react';
import GeneralLayout from '../components/layouts/GeneralLayout';
import ImageUploader from '../components/publish/ImageUploader';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
// Você também criaria um componente para a Textarea e o TagInput

const PublicarPage = () => {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [tags, setTags] = useState([]);

  const handlePublicar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nomeProjeto);
    formData.append('descricao', descricao);
    formData.append('imagem', selectedImage);
    // formData.append('tags', JSON.stringify(tags));

    // Lógica para enviar para a API com axios
    console.log('Publicando...', formData);
  };

  return (
    <GeneralLayout>
      <div className="publish-container"> {/* Adapte o CSS de publicar.css */}
        <ImageUploader onImageSelect={setSelectedImage} />
        <div className="container-descricao">
          <h2>Novo projeto</h2>
          <form onSubmit={handlePublicar}>
            <Input
              label="Nome do projeto"
              id="nome"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
            />
            {/* Crie um componente <Textarea> similar ao Input */}
            <div className="input-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>

            {/* Crie um componente <TagInput> aqui */}

            <div className="container-botoes">
              <Button type="button" className="botao-descartar">Descartar</Button>
              <Button type="submit" className="botao-publicar">Publicar</Button>
            </div>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default PublicarPage;