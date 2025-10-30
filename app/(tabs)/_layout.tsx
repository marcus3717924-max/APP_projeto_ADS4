import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ganhos"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="arrow-trend-up" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gastos"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="arrow-trend-down" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="investimentos"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Octicons name="graph" size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
         tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color}/>,
        }}
      />
    </Tabs>
  );
}
