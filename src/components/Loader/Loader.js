import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.scss';

export default function LoaderSpiner() {
  return (
    <div className={styles.spiner}>
      <Loader
        type="MutatingDots"
        color="#FFA500"
        secondaryColor="#FFA500"
        width={100}
        height={100}
        timeout={300}
      />
    </div>
  );
}
