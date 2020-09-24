import Head from "next/head";
import styles from "../styles/Home.module.css";
import { streamFile } from "../utils/stream";
import MD5 from "crypto-js/md5";
import SalesTable from "../components/view";

export default function Home({ sales }) {
  let fileReader, fileBlob;

  const handleUpload = (e) => {
    fileBlob = e.target.files[0];
    handleUploadedFile(e.target.files[0]);
  };

  const handleUploadedFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    const lines = (content.match(/\n/g) || "").length;

    streamFile(fileBlob, postRecords);
  };

  const postRecords = async (chunk) => {
    console.log("chunk", (chunk.match(/\n/g) || "").length);
    fetch("http://localhost:3400/api/sales", {
      method: "POST",
      body: JSON.stringify({
        fileHash: MD5("hashed").toString(),
        chunkString: chunk,
      }),
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sales Reporter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://web-based-sytem.com">Web-Based System!</a>
        </h1>

        <p className={styles.description}>
          Hi Store Manager, Get started by uploading a
          <code className={styles.code}>.csv</code> file
        </p>
        <div className={styles.grid}>
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            className={styles.card}
          />
        </div>
        <br />

        {/* <h1>{sales.total.toLocaleString()} sales</h1> */}
        <SalesTable />
      </main>

      <footer className={styles.footer}>
        <a href="https://luganga.com" target="_blank" rel="noopener noreferrer">
          {" "}
          hpal
        </a>
      </footer>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3400/api/sales");
//   const data = await res.json();
//   return { props: { sales: data } };
// };
