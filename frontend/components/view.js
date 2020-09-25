import React, { useState } from "react";
import { Pagination } from "./pagination";
import SalesTable from "./table";
import { useFetchMany } from "./hooks";
import { chain } from "lodash";

import styles from "./__styles__/view.module.css";

const baseURL = process.env.API_URL || 'http://localhost:3000';

const SaleStatistics = () => {
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);
  const [topItems, setTopItems] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `api/salesByDate?fromDate=${fromDate}&toDate=${toDate}`;
    const result = await fetch(url);
    const data = await result.json();

    const topItemTypes = chain(data.results)
      .groupBy("itemType")
      .map((items, itemType) => ({
        itemType,
        count: items.length,
        totalProfit: items.reduce((a, v) => a + v.total, 0),
      }))
      .orderBy("totalProfit", "desc")
      .value()
      .slice(0, 5);

    setTopItems(topItemTypes);
    setTotal(data.total);
    setTotalProfit(data.results.reduce((acc, sale) => acc + sale.total, 0));
  };

  return (
    <section>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          From Date
          <input
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </label>
        <label>
          To Date
          <input
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Total</h3>
          <p>{total.toLocaleString()}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Profit</h3>
          <p>{totalProfit.toLocaleString()}</p>
        </div>
        <div className={styles.card}>
          <h3>Top 5 Item Types</h3>
          {topItems.map((item) => (
            <>
              <div className={styles.item} key={`${item.itemType}-${item.totalProfit}`}>
                <span>{item.itemType}</span>
                <span>{item.totalProfit.toLocaleString()}</span>
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function SalesView() {
  const [page, setPage] = useState(1);

  const { loading, error, data } = useFetchMany(page);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <details>
        <summary>Click to Open Mini Dashboard</summary>
        <br />
        <SaleStatistics />
      </details>
      <hr />
      <h1>{data.total.toLocaleString()} sales</h1>
      <SalesTable results={data.results} />
      <Pagination
        className="pb-8"
        page={page}
        total={data.total}
        limit={10}
        setPage={setPage}
      />
    </div>
  );
}
