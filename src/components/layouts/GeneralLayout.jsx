import Aside from '../common/aside/Aside';


const GeneralLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Aside />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default GeneralLayout;