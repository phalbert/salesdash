import React from "react";
import moment from "moment";

export default function SalesTable({ results }) {
  return (
    <table className="data-table lined results">
      <thead>
        <tr>
          <th>No.</th>
          <th>Order Date</th>
          <th>Order Priority</th>
          <th>Units Sold</th>
          <th>Units Price</th>
          <th>Total Cost</th>
          <th>Total Revenue</th>
          <th>Item Type</th>
        </tr>
      </thead>
      <tbody>
        {results?.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{moment(row.orderDate).format("yyyy-MM-DD")}</td>
            <td>{row.orderPriority}</td>
            <td>{row.units.toLocaleString()}</td>
            <td>{row.unitPrice}</td>
            <td>{(row.unitCost * row.units).toLocaleString()}</td>
            <td>{row.total.toLocaleString()}</td>
            <td>{row.itemType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
