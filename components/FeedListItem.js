import React from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { format, formatDistanceToNow } from "date-fns";
import {ko} from "date-fns/locale";
import { useNavigation } from "@react-navigation/native";

function foramtDate(date) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) { // 1분 미만일땐 방금 전 표기
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) { // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
  return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }
  return format(d, 'PPP EEE p', {locale: ko}); // 날짜 포맷
}

function truncate(text) {
	const replaced = text.replace(/\n/g, ' ');
	if (replaced.length <= 100) {
		return replaced;
	}
	return replaced.slice(0, 100).concat('...');
}

function FeedListItem({log}) {
	const {title, body, date} = log;
	const navigation = useNavigation();
	const onPress = () => {
		navigation.navigate("Write", {
			log,
		})
	}
	return (
		<Pressable 
			style={({pressed}) => [
				styles.block, Platform.select({ios: pressed && { backgroundColor: '#efefef' }})
			]}
			android_ripple={{color: '#ededed'}}
			onPress={onPress}>
			<Text style={styles.date}>{foramtDate(date)}</Text>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.body}>{truncate(body)}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	block: {
		backgroundColor: 'white',
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	date: {
		fontSize: 12,
		color: '#546e7a',
		marginBottom: 8,
	},
	title: {
		color: '#263238',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	body: {
		color: '#37474f',
		fontSize: 16,
		lineHeight: 21,
	},
});

export default FeedListItem;