import { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

import { FiLogOut } from "react-icons/fi";

import { AuthContext, signOut } from "@/contexts/AuthContext";

export function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/images/logoHeader.svg" width={180} height={70} />
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/category">Categoria</Link>
          <Link href="/product">Cardápio</Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" size={28} />
          </button>
        </nav>
      </div>
    </header>
  );
}
