import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const DATA = [
  { id: '1', title: 'Học về React Native', sub: 'Một framework rất hay để làm app di động.' },
  { id: '2', title: 'Tại sao nên dùng Expo?', sub: 'Giúp mọi thứ trở nên nhanh chóng và tiện lợi.' },
  { id: '3', title: 'Chia sẻ kiến thức', sub: 'Hãy cùng nhau học tập mỗi ngày nhé.' },
  { id: '4', title: 'Kinh nghiệm code', sub: 'Luôn giữ mọi thứ đơn giản nhất có thể.' },
  { id: '5', title: 'Dự án đầu tay', sub: 'Đây là app đầu tiên tôi đang hoàn thiện.' },
];

export default function Home({ user, onNavigateToProfile }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Header */}
      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>Hello,</Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{user?.name || 'Bạn'} 👋</Text>
        </View>
        <TouchableOpacity
          onPress={onNavigateToProfile}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', borderWidth: 1 }}
        />
      </View>

      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Bài đăng của bạn (10)</Text>
        <TouchableOpacity style={{ borderWidth: 1, padding: 5, paddingHorizontal: 15 }}>
          <Text>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList sẽ tự động scroll nếu nội dung dài hơn màn hình */}
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        style={{ flex: 1 }} // Đảm bảo FlatList chiếm hết phần không gian còn lại
        contentContainerStyle={{ paddingBottom: 30 }} // Thêm khoảng trống ở cuối để scroll thoải mái
        renderItem={({ item }) => (
          <View style={{ margin: 20, marginTop: 0, padding: 15, borderWidth: 1, borderColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>{item.title}</Text>
              <Text style={{ color: '#ccc', fontSize: 20 }}>×</Text>
            </View>
            <Text style={{ color: '#555', marginTop: 5 }}>{item.sub}</Text>
            <Text style={{ color: '#999', fontSize: 12, marginTop: 10 }}>🕒 22/03/2026 10:00</Text>
          </View>
        )}
      />
    </View>
  );
}
