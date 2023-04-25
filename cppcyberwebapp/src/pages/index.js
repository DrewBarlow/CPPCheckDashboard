import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import codeObject from "../../data/data.json";
import ScanDisplay from "../../components/scanDisplay";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="py-4 text-7xl text-center font-bold text-white ">
            Cyber Pack Code Evaluation
          </h1>
          <div className="divider"></div>
          <ScanDisplay scanResults={codeObject} />
        </div>
      </main>
    </>
  );
}