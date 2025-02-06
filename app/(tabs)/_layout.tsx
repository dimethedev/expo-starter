import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#0D1B24',
					borderTopWidth: 0,
				},
				tabBarActiveTintColor: '#FFFFFF',
				tabBarInactiveTintColor: '#FFFFFF80',
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="settings"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="settings-outline" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="time-outline" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="wallet-outline" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="sync"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="sync-outline" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="navigation"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="compass-outline" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
