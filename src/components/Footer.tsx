import '../styles/footer.scss';
import { useTheme } from '../hooks/useTheme';

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="footer">
      <a
        href="https://github.com/marcelovilela/letmeask"
        target="_blank"
        rel="noreferrer"
      >Github</a>

      <button onClick={toggleTheme}>Tema {theme}</button>
    </footer>
  )
}