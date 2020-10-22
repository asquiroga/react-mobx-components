import { useLocalObservable, Observer } from "mobx-react-lite";
import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Container } from "semantic-ui-react";
import "./App.css";
import Card from "../components/Card";
import GlobalModal from "../components/GlobalModal";
import Header from "../components/Header";
import { ApiTable, ColumnDescriptor } from "../components/table/ApiTable";
import PostaStore from "../state/ValueStore";

export const Home = () => {
  const [nombre, setNombre] = useState("");

  const miStore = useLocalObservable(() => {
    return {
      counter: 0,
      loading: false,
      inc: () => {
        miStore.counter++;
        miStore.loading = true;
        setTimeout(() => {
          miStore.counter += 1;
          miStore.loading = false;
        }, 3000);
      },
      formData: {
        nombre: "",
      },
    };
  });

  const apiTableColumns: ColumnDescriptor[] = [
    { header: "Id", key: "id", isSortable: true },
    { header: "Nombre", key: "name", isSortable: false },
    {
      header: "Imagen",
      key: "image",
      render: (image) => {
        return <img src={image} width="50" />;
      },
    },
  ];

  const { counter } = PostaStore;
  return (
    <Observer>
      {() => (
        <>
          <Card surname="xxx">sdfsdf</Card>
          <input
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <Header title="TITULO"></Header>

          <ApiTable
            columns={apiTableColumns}
            doFetch={async (page = 1, sort) => {
              const response = await fetch(
                "https://demo6211393.mockable.io/stores"
              );
              const items = await response.json();
              return {
                items: items.elements,
                currentPage: page,
                totalPages: Math.ceil(items.total / items.pageSize),
              };
            }}
            tableProps={["fixed", "selectable", "sortable"]}
          ></ApiTable>

          <Button
            onClick={() => {
              PostaStore.increment();
              PostaStore.increment();
            }}
          >
            Hello World: {counter}
          </Button>

          <Button
            onClick={() => {
              miStore.inc();
              miStore.inc();
            }}
          >
            LocalObservable: {miStore.counter}
          </Button>

          <GlobalModal text="some modal"></GlobalModal>
        </>
      )}
    </Observer>
  );
};

export default Home;
