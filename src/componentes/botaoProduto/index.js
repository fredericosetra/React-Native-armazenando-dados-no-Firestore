import { TouchableOpacity, Text } from "react-native";
import estilos from "./estilos";

function BotaoProduto({ onPress }) {
  return (
    <TouchableOpacity style={estilos.botao} onPress={onPress}>
      <Text style={estilos.textBotao}>+</Text>
    </TouchableOpacity>
  );
}

export default BotaoProduto;
