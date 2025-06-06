


// Exemplo de uso: <Button type="submit" disabled={isLoading}>Login</Button>
const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;