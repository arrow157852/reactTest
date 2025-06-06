import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/publish/ImageUploader';
import Input from '../components/common/input/Input';
import Button from '../components/common/button/Button';
import { publicarProjeto } from '../services/api';


import styles from './Publicar.module.css';

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

    try {
      await publicarProjeto(formData);
      setSuccess('Projeto publicado com sucesso!');
      setTimeout(() => navigate('/feed'), 2000); 
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
  };

  return (
    
    <div className={styles.publishContainer}>
      <ImageUploader onImageSelect={setSelectedImage} />
      <div className={styles.containerDescricao}>
        <h2 className={styles.title}>Novo projeto</h2>
        <form onSubmit={handlePublicar}>
          <Input
            label="Nome do projeto"
            id="nome"
            value={nomeProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
            required
          />
          <div className={styles.inputGroup}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>

          {error && <output className={styles.mensagemErro}>{error}</output>}
          {success && <output className={styles.mensagemSucesso}>{success}</output>}

          <div className={styles.containerBotoes}>
            <Button type="button" className={styles.botaoDescartar} onClick={handleDescartar}>Descartar</Button>
            <Button type="submit" className={styles.botaoPublicar} disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarPage;