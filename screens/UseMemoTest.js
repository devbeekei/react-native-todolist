import React, { useMemo } from "react";
import { View, Text } from "react-native";

function UseMemoTest() {

	const datas = [
		{id: 1, name: "홍길동"},
		{id: 2, name: "이순신"},
	];

	const filteredDatas1 = datas.filter((data) => {
		console.log("filter");
		return data.id === 1;
	});

	const filteredDatas2 = useMemo(() => 
		datas.filter((data) => {
			console.log("useMemo filter");
			return data.id === 1;
		}), 
		[datas],
	);
	

	return (
		<View>
		</View>
	)
}

export default UseMemoTest;