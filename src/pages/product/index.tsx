import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";

import { FiUpload } from "react-icons/fi";

import { setUpAPIClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface categoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: categoryProps) {
  // console.log(categoryList);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (
      image.type === "image/png" ||
      image.type === "image/jpeg" ||
      image.type === "image/jpg"
    ) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  // Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event) {
    // console.log("Posição da categoria selecionada ", event.target.value);
    // console.log("Categoria selecionada ", categories[event.target.value]);

    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.warning("Preencha todos os campos");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setUpAPIClient();

      await apiClient.post("/product", data);

      toast.success("Produto cadastrado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
  }

  return (
    <>
      <Head>
        <title>Novo produto - Pizza Club</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form onSubmit={handleRegister}>
            <label>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <textarea
              placeholder="Descreva o produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setUpAPIClient(ctx);

  const response = await apiClient.get("/category");
  // console.log(response.data);

  return {
    props: {
      categoryList: response.data,
    },
  };
});
