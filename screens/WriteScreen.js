import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LogContext from "../contexts/LogContext";
import WriteHeader from "../components/WriteHeader";
import WriteEditor from "../components/WriteEditor";

function WriteScreen({route}) {
  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());
  const navigation = useNavigation();

  const {onCreate, onModify, onRemove} = useContext(LogContext);
  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        title, 
        body, 
        date: date.toISOString(),
      }); 
    } else {
      onCreate({
        title, 
        body, 
        date: date.toISOString(), // 날짜를 문자열로 변환
      });  
    }
    navigation.pop();
  };
  const onAskRemove = () => {
    Alert.alert('삭제', '정말로 삭제하시겠습니까?', [
      {text: "취소", style: 'cancel'},
      {text: "삭제", onPress: () => {
        onRemove(log?.id);
        navigation.pop();
      }, style: 'destructive'},
    ], {cancelable: true})
  }
  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView 
        style={styles.avoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <WriteHeader 
          onSave={onSave} 
          onAskRemove={onAskRemove} 
          isEditing={!!log} 
          date={date}
          onChangeDate={setDate}/>
        <WriteEditor 
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
})

export default WriteScreen;