import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function RotaCarDriver() {
  const [estaOnline, setEstaOnline] = useState(true);
  const [telaAtual, setTelaAtual] = useState('radar'); // 'radar' ou 'historico'
  const [corridasAtuais] = useState(2); // Quantidade atual de corridas (limite máx: 4)
  const taxaPlataformaPercentual = 15; // Taxa de comissão do criador do app

  const [motoristasNoMapa] = useState([
    { id: '1', x: '25%', y: '35%', nome: 'Você', corridas: 2 },
    { id: '2', x: '65%', y: '25%', nome: 'Carlos', corridas: 1 },
  ]);

  const [ganhosHistorico] = useState([
    { id: '1', data: '27/09/2026', bruto: 31.50, taxaApp: '4.73', liquido: '26.77', corridas: 1 },
    { id: '2', data: '26/09/2026', bruto: 48.00, taxaApp: '7.20', liquido: '40.80', corridas: 2 },
  ]);

  if (telaAtual === 'historico') {
    return (
      <View style={estilos.container}>
        <View style={estilos.headerHistorico}>
          <Text style={estilos.logoTitulo}>📅 EXTRATO E DESCONTOS DA FROTA</Text>
        </View>
        <ScrollView style={{ padding: 20 }}>
          {ganhosHistorico.map(item => (
            <View key={item.id} style={estilos.cardHistoricoDriver}>
              <Text style={estilos.dataItem}>📅 {item.data}</Text>
              <Text style={estilos.totalItem}>Valor Bruto: R$ {item.bruto.toFixed(2)}</Text>
              <Text style={{color: '#E53935'}}>Taxa do App ({taxaPlataformaPercentual}%): - R$ {item.taxaApp}</Text>
              <Text style={{color: '#4CAF50', fontWeight: 'bold', marginTop: 4}}>Seu Líquido: R$ {item.liquido}</Text>
            </View>
          ))}
          <TouchableOpacity style={estilos.botaoVoltar} onPress={() => setTelaAtual('radar')}>
            <Text style={estilos.textoBotaoVoltar}>Voltar ao Radar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.fundoMapaSimulado}>
        <Text style={estilos.textoMapaSimulado}>🗺️ [ Radar - Rota Car Driver ]</Text>
        
        {motoristasNoMapa.map(moto => (
          <View key={moto.id} style={[estilos.pinMotorista, { top: moto.y, left: moto.x }]}>
            <View style={estilos.bolinhaContador}>
              <Text style={estilos.textoContador}>{moto.corridas}</Text>
            </View>
            <Text style={estilos.iconeCarro}>🚗</Text>
            <Text style={estilos.nomeMotorista}>{moto.nome}</Text>
          </View>
        ))}
      </View>

      <View style={estilos.painelRodape}>
        <View style={estilos.statusContainer}>
          <Text style={estilos.textoBranco}>Status na Frota: </Text>
          <TouchableOpacity onPress={() => setEstaOnline(!estaOnline)}>
            <Text style={[estilos.statusBadge, { color: estaOnline ? '#4CAF50' : '#E53935' }]}>
              {estaOnline ? '● ONLINE' : '○ OFFLINE'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilos.botaoHistoricoRodape} onPress={() => setTelaAtual('historico')}>
          <Text style={estilos.textoBotaoHistorico}>📅 Ver Extratos e Descontos (15%)</Text>
        </TouchableOpacity>

        <Text style={estilos.infoCorridasAtivas}>
          Corridas Simultâneas: <Text style={estilos.textoDourado}>{corridasAtuais} / 4</Text>
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fundoMapaSimulado: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#181A20', justifyContent: 'center', alignItems: 'center' },
  textoMapaSimulado: { color: '#666', fontSize: 14, fontWeight: 'bold', position: 'absolute', top: 130 },
  pinMotorista: { position: 'absolute', alignItems: 'center' },
  bolinhaContador: { position: 'absolute', top: -10, right: -10, backgroundColor: '#E53935', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFF', zIndex: 5 },
  textoContador: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  iconeCarro: { fontSize: 26 },
  nomeMotorista: { color: '#FFF', fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 4, borderRadius: 3, marginTop: 2 },
  painelRodape: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statusBadge: { fontWeight: 'bold', fontSize: 14 },
  infoCorridasAtivas: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  headerHistorico: { marginTop: 50, paddingHorizontal: 20, marginBottom: 10, alignItems: 'center' },
  logoTitulo: { color: '#D4AF37', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
  cardHistoricoDriver: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  dataItem: { color: '#D4AF37', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  totalItem: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  botaoVoltar: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  textoBotaoVoltar: { color: '#121212', fontWeight: 'bold', fontSize: 15 },
  botaoHistoricoRodape: { backgroundColor: '#252525', padding: 12, borderRadius: 8, alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#D4AF37', marginBottom: 5 },
  textoBotaoHistorico: { color: '#D4AF37', fontWeight: 'bold', fontSize: 13 },
  textoDourado: { color: '#D4AF37' },
  textoBranco: { color: '#FFF', fontSize: 14 },
});
