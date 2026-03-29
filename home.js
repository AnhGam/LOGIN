import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { getPosts, addPost, deletePost } from './database';

export default function Home({ user, onNavigateToProfile }) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const handleAddPost = async () => {
    if (!newTitle || !newSub) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      await addPost(newTitle, newSub);
      setNewTitle('');
      setNewSub('');
      setModalVisible(false);
      loadPosts();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm bài đăng');
    }
  };

  const handleDeletePost = async (id) => {
    Alert.alert('Xóa bài đăng', 'Bạn có chắc chắn muốn xóa bài đăng này?', [
      { text: 'Hủy', style: 'cancel' },
      { 
        text: 'Xóa', 
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(id);
            loadPosts();
          } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa bài đăng');
          }
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 50 }}>
      {/* Header */}
      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>Hello,</Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{user?.name || 'Bạn'} 👋</Text>
        </View>
        {/* Profile Avatar (Static) */}
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>
      </View>

      <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Bài đăng của bạn ({posts.length})</Text>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={{ borderWidth: 1, padding: 5, paddingHorizontal: 15 }}
        >
          <Text>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={{ margin: 20, marginTop: 0, padding: 15, borderWidth: 1, borderColor: '#ddd' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
                <Text style={{ color: '#ccc', fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#555', marginTop: 5 }}>{item.sub}</Text>
            <Text style={{ color: '#999', fontSize: 12, marginTop: 10 }}>🕒 {item.created_at}</Text>
          </View>
        )}
      />

      {/* Add Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Thêm bài đăng mới</Text>
            <TextInput
              placeholder="Tiêu đề"
              style={{ borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10 }}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              placeholder="Nội dung"
              style={{ borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 20 }}
              value={newSub}
              onChangeText={setNewSub}
              multiline
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Hủy" color="red" onPress={() => setModalVisible(false)} />
              <Button title="Thêm" onPress={handleAddPost} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
