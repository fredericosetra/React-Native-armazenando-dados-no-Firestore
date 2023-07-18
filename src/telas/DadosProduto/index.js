import { Alert, TouchableOpacity, View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from "../../componentes/Botao";
import estilos from "./estilos";
import { useState } from "react";
import {
  DeleteProduto,
  SalvarProduto,
  atualizarProduto,
} from "../../servicos/firestore";
import { Alerta } from "../../componentes/Alerta";
import Icon from "react-native-vector-icons/Feather";

function DadosProduto({ navigation, route }) {
  const [nome, setNome] = useState(route?.params?.nome || "");
  const [preco, setPreco] = useState(route?.params?.preco || "");
  const [mensagem, setMensagem] = useState("");
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  async function salvar() {
    if (nome == "" || preco == "") {
      setMensagem("Por favor preencher todos os campos.");
      setMostrarMensagem(true);
      return;
    }

    let resultado = "";

    if (route?.params) {
      resultado = await atualizarProduto(route?.params?.id, {
        nome,
        preco,
      });
    } else {
      resultado = await SalvarProduto({
        nome,
        preco,
      });
    }

    if (resultado == "erro") {
      setMensagem("erro ao salvar Produto");
      setMostrarMensagem(true);
    } else {
      navigation.goBack();
    }
  }

  async function deletar() {
    Alert.alert("Deletar produto", "Tem certeza que quer deletar?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          DeleteProduto(route?.params?.id);
          navigation.goBack();
        },
        style: "default",
      },
    ]);
  }

  return (
    <View style={estilos.container}>
      {route?.params && (
        <TouchableOpacity onPress={() => deletar()}>
          <Icon name="trash-2" size={20} color="#000" />
        </TouchableOpacity>
      )}
      <EntradaTexto
        label="Nome do Produto"
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />
      <EntradaTexto
        label="Preço do Produto"
        value={preco}
        onChangeText={(texto) => setPreco(texto)}
      />
      <Botao onPress={() => salvar()}>Salvar</Botao>

      <Alerta
        mensagem={mensagem}
        error={mostrarMensagem}
        setError={setMostrarMensagem}
      />
    </View>
  );
}

export default DadosProduto;
