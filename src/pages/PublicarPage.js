import React, { useState } from 'react';
import GeneralLayout from '../components/layouts/GeneralLayout';
import ImageUploader from '../components/publish/ImageUploader';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { publicarProjeto } from '../services/api'; // Importar a função da API
import { useNavigate } from 'react-router-dom';

const PublicarPage = () => {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!nomeProjeto || !descricao || !selectedImage) {
      setError('Todos os campos são obrigatórios, incluindo a imagem.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('nome', nomeProjeto);
    formData.append('descricao', descricao);
    formData.append('imagem', selectedImage);
    // Se tiver tags: formData.append('tags', JSON.stringify(tags));

    try {
      await publicarProjeto(formData);
      setSuccess('Projeto publicado com sucesso!');
      setTimeout(() => navigate('/feed'), 2000); // Redireciona após 2s
    } catch (err) {
      setError(err.message || 'Erro ao publicar o projeto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDescartar = () => {
    setNomeProjeto('');
    setDescricao('');
    setSelectedImage(null);
    // Resetar o componente ImageUploader também pode ser necessário
  };

  return (
    // Removido o GeneralLayout daqui, pois ele virá do ProtectedLayout
    <div className="publish-container">
      <ImageUploader onImageSelect={setSelectedImage} />
      <div className="container-descricao">
        <h2>Novo projeto</h2>
        <form onSubmit={handlePublicar}>
          <Input
            label="Nome do projeto"
            id="nome"
            value={nomeProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
            required
          />
          <div className="input-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea 
              id="descricao" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)}
              required 
            />
          </div>

          {error && <output className="mensagem-erro">{error}</output>}
          {success && <output className="mensagem-sucesso">{success}</output>}

          <div className="container-botoes">
            <Button type="button" className="botao-descartar" onClick={handleDescartar}>Descartar</Button>
            <Button type="submit" className="botao-publicar" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarPage;