import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import estilos from "./estilos";
import { auth } from "../../config/firebase";
import BotaoProduto from "../../componentes/botaoProduto";
import { PegarProduto, pegarProdutosTempoReal } from "../../servicos/firestore";

export default function Principal({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const usuario = auth.currentUser;

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  async function carregarDadosProdutos() {
    setRefreshing(true);
    const produtosFirestore = await PegarProduto();
    setProdutos(produtosFirestore);
    setRefreshing(false);
  }

  useEffect(() => {
    carregarDadosProdutos();
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarDadosProdutos}
          />
        }
      >
        {produtos?.map((produto) => {
          return (
            <TouchableOpacity
              key={produto.id}
              onPress={() => navigation.navigate("DadosProduto", produto)}
            >
              <Produto nome={produto.nome} preco={produto.preco} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
