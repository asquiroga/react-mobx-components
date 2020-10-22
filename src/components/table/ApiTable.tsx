import { Observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Pagination, Placeholder, Table } from "semantic-ui-react";

const arrayToObject = (anArray: string[]) => {
  // eslint-disable-next-line no-sequences
  return anArray.reduce((a: any, b: string) => ((a[b] = true), a), {});
};

export interface ColumnDescriptor {
  key: string;
  header: string;
  isSortable?: boolean;
  render?: (value: string) => void;
}

export interface ApiProps {
  columns: ColumnDescriptor[];
  doFetch: (
    page?: number,
    sort?: { key: string; direction: string }
  ) => Promise<TableFetchedData>;
  tableProps?: string[];
}

export interface TableFetchedData {
  items: any[];
  currentPage: number;
  totalPages: number;
}

interface StateProps {
  loading: boolean;
  currentSort: { key: string; direction: string };
  tableData: TableFetchedData;
}

export const ApiTable = ({ columns, doFetch, tableProps = [] }: ApiProps) => {
  const lState = useLocalObservable(
    (): StateProps => {
      return {
        loading: true,
        currentSort: { key: null, direction: null },
        tableData: { items: [], currentPage: null, totalPages: null },
      };
    }
  );

  const doFetchWrapper = async (page?: number, sort?: any) => {
    lState.loading = true;
    const fetchedData = await doFetch(page, sort);
    lState.tableData = fetchedData;
    lState.loading = false;
  };

  useEffect(() => {
    doFetchWrapper();
    // eslint-disable-next-line
  }, []);

  const thClicked = (key: string) => (e: any) => {
    if (lState.currentSort?.key === key) {
      const { direction } = lState.currentSort;
      lState.currentSort = {
        ...lState.currentSort,
        direction: direction === "ascending" ? "descending" : "ascending",
      };
    } else lState.currentSort = { key, direction: "ascending" };

    lState.loading = true;

    doFetchWrapper(lState.tableData.currentPage, lState.currentSort);
  };

  const handlePageChange = (e: any, { activePage }: any) => {
    lState.loading = true;
    doFetchWrapper(activePage, lState.currentSort);
  };

  return (
    <Observer>
      {() => {
        return (
          <Table {...arrayToObject(tableProps)}>
            <Table.Header>
              <Table.Row>
                {columns.map(({ header, key, isSortable = false }) => {
                  const thProps: any = {};
                  if (isSortable) {
                    thProps.onClick = thClicked(key);
                  }
                  if (lState.currentSort?.key === key) {
                    thProps.sorted = lState.currentSort.direction;
                  }
                  return (
                    <Table.HeaderCell
                      disabled={!isSortable}
                      className={`${isSortable ? "sorted" : ""}`}
                      key={key}
                      {...thProps}
                    >
                      {header}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {lState.loading ? (
                <Table.Row>
                  {columns.map((aColumn) => {
                    return (
                      <Table.Cell key={aColumn.key}>
                        <Placeholder>
                          <Placeholder.Paragraph>
                            <Placeholder.Line />
                          </Placeholder.Paragraph>
                        </Placeholder>
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ) : (
                lState.tableData.items.map((item: any, index: number) => {
                  return (
                    <Table.Row key={index}>
                      {columns.map((aColumn) => {
                        return (
                          <Table.Cell key={aColumn.key}>
                            {aColumn.render
                              ? aColumn.render(item[aColumn.key])
                              : item[aColumn.key]}
                          </Table.Cell>
                        );
                      })}
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={columns.length} textAlign="center">
                  {lState.loading && lState.tableData.currentPage === null ? (
                    <Placeholder style={{ margin: "auto" }}>
                      <Placeholder.Paragraph>
                        <Placeholder.Line />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  ) : (
                    <Pagination
                      defaultActivePage={lState.tableData.currentPage}
                      totalPages={lState.tableData.totalPages}
                      onPageChange={handlePageChange}
                      disabled={lState.loading}
                    />
                  )}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        );
      }}
    </Observer>
  );
};
