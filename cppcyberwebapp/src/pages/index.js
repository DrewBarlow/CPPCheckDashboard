import Head from "next/head";
import { Inter } from "next/font/google";
import addTabing from "../../util/formatCode";
import styles from "@/styles/Home.module.css";
import codeObject from "../../data/result.json";
import ScanDisplay from "../../components/ScanDisplay/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Cyber Pack Code Evaluation</title>
        <meta
          name="CppCheck Static Visual Code Analysis"
          content="Visual Analysis of Scanned Programs/Application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="py-4 text-8xl text-center text-slate-400 font-normal">
            Cyber Pack Code Evaluation
          </h1>
          <div className="divider"></div>
          <ScanDisplay scanResults={addTabing(codeObject)} />
        </div>
      </main>
    </>
  );
}
