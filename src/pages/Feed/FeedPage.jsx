import React from 'react';
import styles from './FeedPage.module.css'; // Renomeado de FeedPagemodule.css

class FeedPage extends React.Component {
  // Exemplo de estado para projetos
  state = {
    projects: [], // Este array seria preenchido com dados de uma API
    searchTerm: '',
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { projects } = this.state;
    
    return (
      <main className={styles.main}>
        <div className={styles.buscaEFiltros}>
          <div className={styles.searchBar}>
            <input 
              id="search-input" 
              className={styles.searchInput} 
              placeholder="Buscar projetos..." 
              onChange={this.handleSearchChange}
            />
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Projetos da Comunidade</h2>
        
        <div className={styles.containerProjetos}>
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className={styles.cartaoProjeto}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <img src={project.imageUrl} alt={project.title} />
                <div className={styles.detalhesProjeto}>
                  <span>Autor: {project.author}</span>
                  <span>Data: {project.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noProjects}>Nenhum projeto encontrado.</p>
          )}
        </div>
      </main>
    );
  }
}

export default FeedPage;