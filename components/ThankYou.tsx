import React from "react";
import Image from "next/image";
import styles from "@/styles/ThankYou.module.css";

export default function ThankYou() {
  return (
    <div className={styles.thankYou}>
      <div>
        <Image
          src={"/icon-complete.svg"}
          alt="complete icon"
          width={80}
          height={80}
        />
        <h2>THANK YOU!</h2>
        <p>We`ve added your card details</p>
        <button>continue</button>
      </div>
    </div>
  );
}
