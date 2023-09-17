import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {OutlineIconComp} from '../../component';
import iconsPath from '../../constants/iconsPath';
import Voice from '@react-native-voice/voice';
import Clipboard from '@react-native-clipboard/clipboard';

const Home = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onSpeechStart = e => setIsRecording(true);

    const onSpeechEnd = () => setIsRecording(false);
    const onSpeechResults = e => setText(e.value);

    const onSpeechError = err => setError(err.message);

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.removeAllListeners();
    };
  }, []);

  const startRecordingButton = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const stopRecordingButton = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      setError(error.message);
    }
  };
  const onClickCopy = () => {
    Clipboard.setString(text);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onClickCopy}>
          <Image
            source={iconsPath.copy}
            style={{
              width: 25,
              height: 25,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{text ? text : 'Listening..'}</Text>
      </ScrollView>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <View style={styles.iconsGroup}>
        <OutlineIconComp
          onPress={() => setText('')}
          backgroundColor="red"
          image={iconsPath.delete}
        />
        {isRecording ? (
          <OutlineIconComp
            backgroundColor="green"
            image={iconsPath.stop}
            onPress={stopRecordingButton}
          />
        ) : (
          <OutlineIconComp
            image={iconsPath.mic}
            onPress={startRecordingButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 45,
    justifyContent: 'space-between',
    gap: 52,
    paddingBottom: 32,
  },
  text: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 2,
    lineHeight: 25,
  },
  iconsGroup: {
    gap: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingHorizontal: 22,
    paddingVertical: 23,
    borderRadius: 10,
    elevation: 7,
    shadowColor: 'white',
    backgroundColor: 'rgba(1, 9, 33, 1)',
    overflow: 'scroll',
  },
});

export default Home;
