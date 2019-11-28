import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import CodePush from 'react-native-code-push';

import styles from './styles';

function App() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function checkPackages() {
      const newUpdate = await CodePush.checkForUpdate();

      if (!newUpdate) return;

      if (newUpdate.isMandatory) {
        setMandatory(true);
      } else {
        CodePush.sync();
      }
    }

    checkPackages();
  }, []);

  async function handleCheckForUpdate() {
    const newUpdate = await CodePush.checkForUpdate();

    setHasUpdate(newUpdate);
  }

  async function handleUpdate() {
    await CodePush.sync(
      { updateDialog: false, installMode: CodePush.InstallMode.IMMEDIATE },
      statusSync => {
        switch (statusSync) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            setStatus('Verificando att');
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            setStatus('Baixando Pacotes');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            setStatus('Instalando');
            break;
          default:
            setStatus('atualizado');
        }
      },
      () => CodePush.allowRestart()
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workshop CodePush (obrigatorio)</Text>

      {!mandatory && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCheckForUpdate}>
            <Text>Verificar</Text>
          </TouchableOpacity>

          {!hasUpdate ? (
            <Text>Ta atualizado</Text>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text>Atualizar para {hasUpdate.label}</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <Text>{status}</Text>

      {mandatory && (
        <>
          <Text style={styles.title}>Obrigatorio</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCheckForUpdate}>
            <Text>Verificar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default CodePush({ checkFrequency: CodePush.CheckFrequency.MANUAL })(
  App
);
