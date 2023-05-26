import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { ReactNode, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Home() {
  const [cardHolderName, setCardHolderName] = useState("Jane Appleseed");
  const [cardNumber, setCardNumber] = useState<string>("0000 0000 0000 0000");
  const [MM, setMM] = useState("00");
  const [YY, setYY] = useState("00");
  const [cvc, setCvc] = useState("000");
  const [pagination, setPagination] = useState(1);

  const handleCardHolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    e.target.value = value.slice(0, 255);
    if (value == "") {
      setCardHolderName("Jane Appleseed");
    } else {
      setCardHolderName(value.length > 24 ? value.slice(0, 25) + "..." : value);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: undefined | string = e.target.value;
    let defaultPattern = "0000 0000 0000 0000";
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value;
    value = value.match(/.{1,4}/g)?.join(" ");
    if (typeof value === "undefined") {
      setCardNumber(defaultPattern);
    } else {
      let emptySpace = value.slice(0, 19).length;
      setCardNumber(value.slice(0, 19) + defaultPattern.slice(emptySpace));
      e.target.value = value.slice(0, 19);
    }
  };

  const handleMMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: undefined | string = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value.slice(0, 2);
    if (value == "") {
      setMM("00");
    } else {
      value.length === 1 ? setMM("0" + value) : setMM(value.slice(0, 2));
    }
  };

  const handleYYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: undefined | string = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value.slice(0, 2);
    if (value == "") {
      setYY("00");
    } else {
      value.length === 1 ? setYY("0" + value) : setYY(value.slice(0, 2));
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: undefined | string = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value.slice(0, 3);
    if (value == "") {
      setCvc("000");
    } else {
      value.length === 1
        ? setCvc(value + "00")
        : value.length === 2
        ? setCvc(value + "0")
        : setCvc(value.slice(0, 3));
    }
  };

  const schema = yup.object().shape({
    cardHolderName: yup.string().required("Can`t be blank"),
    cardNumber: yup
      .string()
      .required("Can`t be blank")
      .matches(/^\d{4}(?:\s?\d{4}){3}$/, "card number must have 16 digits")
      .transform((value, originalValue) =>
        value ? value.replace(/\s/g, "") : originalValue
      ),
    MM: yup
      .number()
      .typeError("Can`t be blank")
      .required("Can`t be blank")
      .min(1, "Enter a vaild month")
      .max(12, "Enter a vaild month"),
    YY: yup
      .number()
      .typeError("Can`t be blank")
      .required("Can`t be blank")
      .min(new Date().getFullYear() % 100, "Enter a vaild year"),
    cvc: yup
      .string()
      .typeError("Can`t be blank")
      .required("Can`t be blank")
      .matches(/^\d{3}$/, "cvc must have 3 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    alert(JSON.stringify(data));
    setPagination(2);
  };

  return (
    <>
      <Head>
        <title>Frontend Mentor | Interactive card details form</title>
        <meta name="description" content="Made by Loai Esam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.cardPreview}>
            <div className={styles.cardFront}>
              <div className={styles.wrapper}>
                <Image
                  src={"/card-logo.svg"}
                  alt={"card logo"}
                  width={65}
                  height={35}
                />
                <span>{cardNumber}</span>
                <div>
                  <p>{cardHolderName}</p>
                  <p>
                    {MM}/{YY}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.cardBack}>
              <div className="wrapper">
                <span>{cvc}</span>
              </div>
            </div>
          </div>
          {pagination === 1 ? (
            <div className={styles.debitCardForm}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>CARDHOLDER NAME</label>
                <input
                  {...register("cardHolderName")}
                  type="text"
                  placeholder="e.g. Jane Appleseed"
                  onChange={handleCardHolderNameChange}
                />
                {errors.cardHolderName && (
                  <p role="alert">
                    {errors.cardHolderName?.message as ReactNode}
                  </p>
                )}
                <label>CARD NUMBER</label>
                <input
                  {...register("cardNumber")}
                  type="text"
                  placeholder="e.g. 1234 5678 9123 0000"
                  onChange={handleCardNumberChange}
                />
                {errors.cardNumber && (
                  <p role="alert">{errors.cardNumber?.message as ReactNode}</p>
                )}
                <div>
                  <label>EXP. DATE (MM/YY)</label>
                  <label>cvc</label>
                </div>
                <div>
                  <div>
                    <input
                      {...register("MM")}
                      type="text"
                      placeholder="MM"
                      onChange={handleMMChange}
                    />
                    {errors.MM && (
                      <p role="alert">{errors.MM?.message as ReactNode}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("YY")}
                      type="text"
                      placeholder="YY"
                      onChange={handleYYChange}
                    />
                    {errors.YY && (
                      <p role="alert">{errors.YY?.message as ReactNode}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("cvc")}
                      type="text"
                      placeholder="e.g. 123"
                      onChange={handleCvcChange}
                    />
                    {errors.cvc && (
                      <p role="alert">{errors.cvc?.message as ReactNode}</p>
                    )}
                  </div>
                </div>
                <input type="submit" value="Confirm" />
              </form>
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </>
  );
}
