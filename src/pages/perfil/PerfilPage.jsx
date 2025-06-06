import React from 'react';
import styles from './Perfil.module.css';

class PerfilPage extends React.Component {
  // Exemplo de estado para dados do usuário e seus posts
  state = {
    user: {
      name: 'Nome do Usuário',
      bio: 'Uma breve descrição sobre o usuário.',
      avatar: 'url_da_imagem_de_perfil.png'
    },
    posts: [], // Array de posts do usuário
    isEditing: false,
  };

  render() {
    const { user, posts, isEditing } = this.state;

    return (
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.detalhesUsuario}>
            <img src={user.avatar} alt="Foto de perfil" className={styles.fotoPerfil} />
            <div className={styles.infoUsuarioTexto}>
              <h1>{user.name}</h1>
              <p>{user.bio}</p>
            </div>
            <button onClick={() => this.setState({ isEditing: !isEditing })}>
              {isEditing ? 'Salvar' : 'Editar Perfil'}
            </button>
          </div>
        </section>

        <section id="lista-de-posts" className={styles.listaDePosts}>
          <h2 className={styles.sectionTitle}>Meus Projetos</h2>
          <div id="posts-list" className={styles.postsList}>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className={styles.postCard}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
              ))
            ) : (
              <p>Nenhum projeto publicado ainda.</p>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default PerfilPage;