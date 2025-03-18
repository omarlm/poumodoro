interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header className="flex items-end justify-end p-4">{children}</header>;
};

export default Header;
