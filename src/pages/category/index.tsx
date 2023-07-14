import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { setUpAPIClient } from "@/services/api";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      toast.warning("Digite o nome da categoria");
      return;
    }

    const apiClient = setUpAPIClient();
    await apiClient.post("/category", {
      name: name,
    });

    toast.success("Categoria cadastrada com sucesso!");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Pizza Club</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
