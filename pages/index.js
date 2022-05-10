import styles from '../styles/Home.module.css'
import Three from '../components/Three';
import PhysicsScene from '../components/PhysicsScene';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function Home() {

  return (
    <div className={styles.container}>
      {/* <Three/> */}
      <PhysicsScene />
    </div>
  )
}
