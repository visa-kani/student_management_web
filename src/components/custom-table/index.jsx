import React from "react";
import "./index.css";
import noRecords from "../../assets/images/noRecordsFound.png";
import SkeletonLoader from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableData = ({
  columns,
  data,
  Clickable,
  rowClick,
  columnClassNames,
  columnColSpans,
  ref,
  loader,
  scopedSlots
}) => {

  return (
    <div
      className={`table-responsive component p-0`}
    >
      <table
        ref={ref}
        className={`table table-bordered w-full`}
      >
        <thead>
          <tr className="header-fix">
            {columns.map((column, index) => {

              return (
                <th
                  style={{ fontWeight: "bold" }}
                  key={column}
                  className={` relative px-3
                                            ${columnClassNames?.length > 0
                      ? columnClassNames?.[index]
                      : ""
                    }`}
                  colSpan={
                    columnColSpans?.length > 0 ? columnColSpans[index] : 1
                  }
                >
                  <div className="flex ">
                    <div className="inline">
                      {column}
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          style={{ cursor: Clickable ? "pointer" : "default" }}
          className="scrollable-tbody"
        >
          {loader ? (
            Array(10)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td
                      key={j}
                      colSpan={
                        columnColSpans?.length > 0 ? columnColSpans[j] : 1
                      }
                    >
                      <SkeletonLoader width="80%" height={25} />
                    </td>
                  ))}
                </tr>
              ))
          ) : data?.length > 0 ? (
            data?.map((row, index) => (
              <tr
                className="tr-hover"
                key={index}
                style={{ cursor: Clickable ? "pointer" : "default" }}
                onClick={
                  Clickable
                    ? (e) => {
                      e?.stopPropagation();
                      rowClick(row);
                    }
                    : null
                }
              >
                {columns.map((column) => (
                  <td key={column}>
                    {scopedSlots[column]
                      ? scopedSlots[column]({ row, key: column, index })
                      : row[column.toLowerCase()] || "NA"}
                  </td>
                ))}
              </tr>
            ))
          ) : data?.length === 0 ? (
            <td colSpan="9">
              <div className="">
                <div className="No_Records_Ctrl text-center"></div>
                <div className="flex items-center justify-center mt-14">
                  <img
                    src={noRecords}
                    alt="No Records"
                    width={200}
                    height={200}
                  />
                </div>
                <h4 className="text-center">
                  <b>No records Found</b>
                </h4>
              </div>
            </td>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
