import Container from '../Container';
import AppBar from '../AppBar';
import styles from './Layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.Layout}>
    <AppBar />
    <Container> {children} </Container>
  </div>
);

export default Layout;
